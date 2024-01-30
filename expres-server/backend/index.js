import express from 'express'
import cors from 'cors'
import pg from 'pg-promise'

const pgp = pg()
const db = pgp(`postgres://${process.env.USERNAME}:${process.env.PASSWORD}@postgres-svc:5432/postgres`)
const app = express();

app.use(express.json())
app.use(cors())
const list = [];
let gId = 0;
const port = process.env.PORT || 3001
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS todo_list ( id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL);
`;
db.none(createTableQuery)
  .then(() => {
    console.log('Table created or already exists');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  })
app.get('/api/todos',async (req,res)=>
{
    let todos =[];
  try{
    let data =  await db.any("SELECT * FROM todo_list;")
    console.log(data)
  todos = data;
  }
  catch(error)
  {
    console.log(error)
  }
    res.status(200).json({"todos":todos})
})

app.post('/api/todos',async (req,res)=>{
    // 
    console.log(req.body.task)
    await db.none(`INSERT INTO todo_list (task) VALUES('${req.body.task}');`
    )
    res.status(201).end()
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });