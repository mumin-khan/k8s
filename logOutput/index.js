import express from 'express'
const app =express()
import path from 'path'
import fs from 'fs'

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const port = process.env.PORT || 3000;
;

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }
  
  // Example: Generate a random string of length 10
  const randomString = generateRandomString(10);
  let currentDate = new Date(Date.now()).toISOString()
    setInterval(() => {
       currentDate = new Date(Date.now()).toISOString()
       console.log(randomString,currentDate ) 
    }, 5000);

const getFile = async (filename) => new Promise(res => {
      fs.readFile(path.join(directory, filename), (err, buffer) => {
        if (err) return console.log('FAILED TO READ FILE', '----------------', err)
        res(buffer)
      })
    })
    app.get('/status', function (req, res)
    {
      res.send(`string:${randomString}, tstamp:${currentDate}`);
    })

    app.get('/read',async function(req,res)
    {
      res.send(`${await getFile('timestamps.txt')} ###`)

    })

    app.get('/pingpong',async function(req,res)
    {
      
      try{
        const pingPongs = await fetch("http://pingpong-service/count") 
        
        const data =await  pingPongs.json()
      res.send(`tstamp:${currentDate} ###  \n ping pong ${data}`)
      }
      catch(e) 
      {
        res.send(`${e}hi`)
      }
      

    })
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });