import { rejects } from "assert";
import { error } from "console";
import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./data/database.sqlite");

export function dbget(sql,params=[]){
    return new Promise((result,rejects)=>{
        db.get(sql,params,(err,row)=>{
            if(err){
                rejects(err);
            }
            else{
                result(row);
            }
        });
    });
}

export function dball(sql,params=[]){
    return new Promise((result,rejects)=>{
        db.all(sql,params,(err,rows)=>{
            if(err){
                rejects(err);
            }
            else{
                result(rows);
            }
        });
    });
}

export function dbrun(sql,params=[]){
    return new Promise((result,rejects)=>{
        db.run(sql,params,function (err){
            if(err)
            {
                rejects(err);
            }
            else{
                result(this);
            }
        });
    })
}

export async function initdb(){
    await dbrun("drop table if exists movies");
    await dbrun("create table if not exists movies (id integer primary key autoincrement, title string, director string, year integer)");
    const movies = [{
        title:"film1",
        director:"rendezo1",
        year:2001
    },
    {
        title:"film2",
        director:"rendezo2",
        year:2002
    } ,
    {
        title:"film3",
        director:"rendezo3",
        year:2003
    } 

] 
for(const movie of movies){
    await dbrun("insert into movies (title,director,year) values (?,?,?)",[movie.title, movie.director, movie.year]);
}
}
