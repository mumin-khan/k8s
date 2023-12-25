import express from 'express'
import path from 'path'
const app =express()

const port = process.env.PORT || 3000;
;
app.use(express.static('./'));

app.get('/', function (req, res)
{
  res.send('<h1>Hello, this is your HTML response!</h1>');
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});