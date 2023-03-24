const express = require('express');
const {default:mongoose}=require('mongoose');
const dotenv = require('dotenv');

const app = express();
const port = 8081;

require('./connection');
require('./model');

dotenv.config();

app.use(express.json());

const EventScheduler = mongoose.model('EventScheduler');

app.post('/v1/events',async(req,res)=>{
    const {title, description, location}=req.body;
    if(!title || !description || !location){
        return res.json({
            message:"please fill all the fields"
        })
    }

    const event = new EventScheduler({
        title,description,location
    })
    await event.save();
    res.status(200).json({
        message:"Event created successfully"
    })
});

app.get('/v1/events', async(req,res)=>{
    const event = await EventScheduler.find();
    res.json(event).status(200)
});

app.get('/v1/events/:id', async(req,res)=>{
    const {id} = req.query;
    const event = await EventScheduler.findOne(id);

    if(event){
        res.json(event).status(200)
    }
    else{
        res.status(404).json({
            message:"There is no event with that ID"
        })
    }
    res.json(event).status(200)
    res.end();
});

app.delete('/v1/events/:id', async(req,res)=>{
    const {id} = req.params;
    const event = await EventScheduler.findByIdAndDelete(id);

    if(event){
        res.json({
            message:"deleted sucessfully!"
        })
    }
    else{
        res.status(404).json({
            message: "event not found!"
        })
    }
})

app.put('/v1/events/:id', async(req,res)=>{
    const {id} = req.params;
    const event = await EventScheduler.findByIdAndUpdate(id, req.body, {new:true})

    if(event){
        res.status(200).json(event);
    }
    else{
        res.status(404).json({
            message:"there is no event with this ID"
        })
    }
})

app.listen(port, ()=>{
    console.log(`Server is up at port: ${port}`);
});