const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port  = 3000;


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const data = async () =>{
    const todo = await Todo.find({})
    return todo
}

app.post('/' ,async(req , res) => {
    const todo = await data()
    res.send(todo);
})

const TodoSchema = {
    first : String , 
    second : String
}

const Todo = mongoose.model('Todo' , TodoSchema )
app.post('/api/todos', async(req , res)=>{
     
    const first = req.body.first;
    const second = req.body.second;

    const result={
        first:first,
        second:second
    }
    console.log(first);
    console.log(second);

    const adding  = new Todo(result)
    adding.save()
    // const result = await standred.insertOne(todo);
    console.log(result)

    res.status(200).send("Done")

})
app.listen(port,()=>{
    console.log("Website is running on : "+ `http://localhost:${port}` )
})

app.post('/api/alldel' , async(req , res) => {
    const clean = await Todo.deleteMany({})

    res.status(200).send("All Clear")
})

app.post('/api/delete' , async(req , res) => {
    const {id} = req.body;
    const del = await Todo.deleteOne({_id : id})
    
    res.status(200).send("Deleted Successful")
    console.log(del)
})

app.post('/api/update' , async(req , res) => {
    const {id , nfirst , nsecond} = req.body;

    const doc = await Todo.findOne({_id : id})
    console.log(doc)
    doc.first = nfirst;
    doc.second = nsecond;
    const result = doc.save();
    console.log(result)

    res.status(200).send("Updated Successfully")

})

async function vp(){
    try {
        const db = mongoose.connect('mongodb://127.0.0.1:27017/test')
        console.log("Connected to Mongodb")
        
    } catch (error) {
        console.log(error);
    }
} 

vp()
