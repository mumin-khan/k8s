import express from 'express'
import path from 'path'
import fs from 'fs'
import axios from 'axios'
import { promisify } from 'util'
import cors from 'cors'
const writeFileAsync = promisify(fs.writeFile);
const statAsync = promisify(fs.stat);
const directory = path.join('/', 'usr', 'src', 'app', 'files')


const directoryAlreadyExists = async () => new Promise(res => {
  fs.access(directory, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`Directory '${directory}' does not exist.`);
      res(false)
    } else {
      res(true)
    }
  })
});
  const findADirectory = async () => {
    if (await directoryAlreadyExists()) return
    console.log("test")
    await new Promise(res => fs.mkdir(directory,{recursive:true},(err) => console.log("error",err)))
  }

findADirectory()

const app =express()
app.use(cors())
const port = process.env.PORT || 3000;

async function downloadImage(url, filePath) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  await writeFileAsync(filePath, Buffer.from(response.data));
}
async function deleteFiles()
{
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory '${directory}':`, err);
      return;
    }

    // Loop through the files and subdirectories
    for (const file of files) {
      const filePath = path.join(directory, file);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting file '${filePath}':`, unlinkErr);
        } else {
          console.log(`File '${filePath}' deleted.`);
        }
      }); 
       }
  })
}
async function processImage() {
  const currentDate = new Date( Date.now()).toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  console.log(currentDate)
  const fileName = `image_${currentDate}.jpg`;
  const filePath = path.join(directory, fileName);
  const imageUrl = `https://picsum.photos/${Math.round(Math.random()*1000)}`; 

  try {
    // Check if the file exists
    await statAsync(filePath);

    // If the file exists, do nothing (file is already present for today)
    console.log('File already exists for today.');
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file does not exist, download and store it
      
      console.log('File does not exist. Downloading and storing...');
      deleteFiles()
      try {
        await downloadImage(imageUrl, filePath);
        console.log('Image downloaded and stored successfully.');
      } catch (downloadError) {
        console.error('Error downloading or storing the image:', downloadError);
      }
    } else {
      console.error('Error checking file existence:', err);
    }
  }
}
app.use(express.static('./'));

app.get('/',function (req, res)
{
  res.sendFile(process.cwd()+'/about.html')
})

app.get('/image',async function(req,res)
{
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  const fileName = `image_${currentDate}.jpg`;
  await processImage()


const sourcePath = path.join(directory, fileName);
const destinationPath = process.cwd()+'/image.jpg';

const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destinationPath);

readStream.on('error', (err) => {
  console.error('Error reading the source file:', err);
});

writeStream.on('error', (err) => {
  console.error('Error writing the destination file:', err);
});

writeStream.on('finish', () => {
  console.log('File copied successfully.');
  res.sendFile(process.cwd()+'/index.html')

});
console.log("pop")
 readStream.pipe(writeStream);

  // res.sendFile(path.join(directory, fileName), { root: '/' })
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});