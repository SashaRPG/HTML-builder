//modules import
const fs = require('fs');
const path = './01-read-file/text.txt';
const { stdout } = process;

//reading stream
const fileInsides = fs.createReadStream(path, 'utf-8');

/* if reading was succesfull, open a file and write data to console,
destroy stream afterwards */
fileInsides.on('readable', ()=>{
    let data = fileInsides.read();
    stdout.write(data);
    fileInsides.destroy();
});

//error handler
fileInsides.on('error', (err)=>{
    stdout.write(err.message);
});