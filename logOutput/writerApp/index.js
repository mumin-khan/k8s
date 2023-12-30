import path from 'path'
import fs from 'fs'

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'timestamp.txt')

const fileAlreadyExists = async () => new Promise(res => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false)
      return res(true)
    })
  })
  
  const findAFile = async () => {
    if (await fileAlreadyExists()) return
    console.log('pop',directory)
    await new Promise(res => fs.mkdir(directory,{recursive:true},(err) => console.log("error",err)))
  }

findAFile()

const writeToAafile = ()=>
{
    let currentDate = new Date(Date.now()).toISOString()

    fs.writeFile(filePath,currentDate , (writeErr) => {
        if (writeErr) {
          console.error('Error writing to the file:', writeErr);
        }
     } )
}
setInterval(() => {

    writeToAafile()
}, 5000);

