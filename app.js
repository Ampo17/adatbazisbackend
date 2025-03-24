import express from "express";
import { dball, dbget, dbrun, initdb } from "./util/database.js";

const app = express();

app.use(express.json());


app.get("/movies", async(req,res)=>{
    const movies = await dball("select * from movies");
    res.status(200).json(movies);
})

app.get("/movies/:id", async(req,res)=>{
    const id = req.params.id;
    const movie = await dbget("select * from movies where id = ?",[id]);
    if(!movie)
    {
        return res.status(404).json({message: "Not found"});
    }
    res.status(200).json(movie);

})

app.post("/movies", async (req,res)=>{
    const {title,director,year} = req.body;
    if(!title || !director || !year){
        return res.status(400).json({message: "Missing data"});
    }
    const result = await dbrun("insert into movies (title,director,year) values (?,?,?)",[title,director, year]);
    res.status(201).json({id: result.lastID,title,director,year});
})

app.put("/movies/:id", async (req,res)=>{
    const id = req.params.id;
    const movie = await dbget("select * from movies where id = ?",[id]);
    if(!movie)
    {
        return res.status(404).json({message: "Not found"});
    }
    const {title,director,year} = req.body;
    if(!title || !director || !year){
        return res.status(400).json({message: "Missing data"});
    }
    await dbrun("update movies set title = ?, director = ?, year = ? where id = ?",[title,director,year,id]);
    res.status(200).json({id,title,director,year});
})

app.delete("/movies/:id", async(req,res)=>{
    const id = req.params.id;
    const movie = await dbget("select * from movies where id = ?",[id]);
    if(!movie)
    {
        return res.status(404).json({message: "Not found"});
    }
    await dbrun("delete from movies where id = ?",[id]);
    res.status(200).json({message:"delete sucessful"})
})

async function startserver(){
    await initdb();
    app.listen(3000, ()=>{
    console.log("Működik");
});
}

startserver();
