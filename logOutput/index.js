import express from 'express'
const app =express()

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


    app.get('/status', function (req, res)
    {
      res.send(`string:${randomString}, tstamp:${currentDate}`);
    })
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });