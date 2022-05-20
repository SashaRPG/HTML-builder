//modules import
const fs = require('fs');
const path = require('path');
const location = './03-files-in-folder/secret-folder';

//getting files with readdir
fs.readdir(location, {withFileTypes: true}, (err, files) =>{
    console.log('Files in secret folder: \n');
    //error handler
    if (err){
        console.log(`You've got and error! ${err}`);
    } else {
        //getting info about files
        files.forEach(file =>{
            if (file.isFile()){ //checking if it's a file
                let fullPath = path.join(location, file.name);
                let fileName = path.parse(fullPath);
                fs.lstat(fullPath, (err, info) =>{
                    if (err){
                        console.log(`You've got and error! ${err}`);
                    } else {
                        console.log(fileName.name + ' - ' + path.extname(fullPath).slice(1) + ' - ' + Math.ceil(info.size / 1024) + 'kb');
                    }
                });
            } else {
                return;
            }
        });
    }
});