import express from 'express'
import pg from 'pg-promise'

const pgp = pg()
const db = pgp(`postgres://${process.env.USERNAME}:${process.env.PASSWORD}@postgres-svc:5432/postgres`)



const app = express()
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS website_visits ( website_name VARCHAR(255), ping_count INT DEFAULT 0);
`;


let counter = 0 ;
const port = process.env.PORT || 3000;

app.get('/', async function (req, res)
{
  db.none(createTableQuery)
  .then(() => {
    console.log('Table created or already exists');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  })
  let counter = 0
  try{

  counter = await db.one("SELECT ping_count FROM website_visits WHERE website_name = 'pingpong'")
  console.log(counter)
  counter = counter.ping_count;
  }
  catch(error)
  {
    console.log(error)
  }
  counter+=1;
//   fs.writeFile(filePath,counter, (writeErr) => {
//     if (writeErr) {
//       console.error('Error writing to the file:', writeErr);
//     }
//  } )
await db.none("UPDATE website_visits SET ping_count = ping_count+1 WHERE website_name = 'pingpong'")
  res.send(`pong ${counter}`);

})

app.get('/count',async function(req,res)
{
  let counter =0;
  try{
    counter =  await db.one("SELECT ping_count FROM website_visits WHERE website_name = 'pingpong'")
    console.log(counter)
  counter = counter.ping_count;
  }
  catch(error)
  {
    console.log(error)
  }
  res.send(`${counter}`)
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
