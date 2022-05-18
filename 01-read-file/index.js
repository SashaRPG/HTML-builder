const fs = require('fs');
const path = './01-read-file/text.txt';
const { stdout } = process;

const fileInsides = fs.createReadStream(path, 'utf-8');

fileInsides.on('readable', ()=>{
    let data = fileInsides.read();
    stdout.write(data);
    fileInsides.destroy();
});

fileInsides.on('error', (err)=>{
    stdout.write(err.message);
});