import express from 'express'
import cors from 'cors'
const app = express();

app.use(express.json())
app.use(cors())
const list = [];
let gId = 0;
const port = process.env.PORT || 3001
app.get('/api/todos',(req,res)=>
{
    res.status(200).json({"todos":list})
})

app.post('/api/todos',(req,res)=>{
    const id = gId;
    gId+=1;
    const todo = 
    {
        id,
        task:req.body.task
    }
    list.push(todo)
    res.status(201).end()
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });