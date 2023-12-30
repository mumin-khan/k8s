import express from 'express'

const app = express()

let counter = 0 ;
const port = process.env.PORT || 3000;
app.get('/', function (req, res)
{
  res.send(`pong ${counter}`);
  counter+=1;

})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
