import express from 'express'
import path from 'path'
import fs from 'fs'
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pingpong.txt')

const fileAlreadyExists = async () => new Promise(res => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false)
      return res(true)
    })
  })
  
  const findAFile = async () => {
    if (await fileAlreadyExists()) return
    await new Promise(res => fs.mkdir(directory,{recursive:true},(err) => console.log("error",err)))
  }

findAFile()
const app = express()

let counter = 0 ;
const port = process.env.PORT || 3001;

app.get('/', function (req, res)
{
  counter+=1;
  fs.writeFile(filePath,counter, (writeErr) => {
    if (writeErr) {
      console.error('Error writing to the file:', writeErr);
    }
 } )
  res.send(`pong ${counter}`);

})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
