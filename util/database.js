import { rejects } from "assert";
import { error } from "console";
import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("../data/database.sqlite");

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
