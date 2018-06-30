import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {dbURL} from './config.js';
import Games from './models';

const app = express();
mongoose.connect(dbURL);

app.use(bodyParser.json())

app.get("/api/games",function(req,res){
    Games.find(function(err,games){
        if(err){
            console.log(err);
        }
        else{
            res.json({games})
        }
    })
})
app.get("/api/games/:id",function(req,res){
    Games.findById(req.params.id,function(err,game){
        res.json({game});
    })
  })
app.post("/api/games",function(req,res){
  const {error,validate} = validation(req.body);
  if(validate){
    const {title,cover} = req.body;
    Games.create({title:title,cover:cover},function(err,game){
        if(err){
            res.status(500).json({
                error:{
                  global:"some thing is wrong"
                }
            })
        }else{
            res.json({game})
        }
    })
  }else{
      res.status(500).json({error})
  }
})
app.put('/api/games/:id',function(req,res){
    const {error,validate} = validation(req.body);
    if(validate){
        const {title,cover} = req.body;
        Games.findOneAndUpdate({_id:req.params.id},{$set:{title:title,cover:cover}},{new:true},function(err,game){
            if(err){
                console.log(err);
                res.status(500).json({
                    error:{
                      global:"some thing is wrong"
                    }
                })
            }else{
                res.json({game})
            }
        })
      }else{
          res.status(500).json({error})
      }
})
app.delete('/api/games/:id',function(req,res){
   Games.deleteOne({_id:req.params.id},function(err,r){
    if(err){
        console.log(err);
        res.status(500).json({
            error:{
              global:"some thing is wrong"
            }
        })
    }else{
        res.json({})
    }
   })
})
app.use(function(req,res){
   res.status(404).json({
       error:{
           global:"something is wrong"
       }
   })
})
app.listen(8080,()=>console.log('server is running on port 8080'));

function validation(data){
    let error = {};
    if(data.title==="") error.title = "title can not be empty";
    if(data.cover==="") error.cover = "cover can not be empty";

    let validate = Object.keys(error).length === 0;

    return {error,validate}
}