//modules inmport 
const fs = require('fs');
const path = require('path');
const locationOriginal = './04-copy-directory/files';
const locationCopy = './04-copy-directory/files-copy';

function copyDir(){
    fs.access(locationCopy, (err) =>{
        if (err){ //creating a folder if it doesn't exist
            fs.mkdir(locationCopy, {recursive: true}, () => {
                console.log('New folder was created successfully!\n');
            });
        }
    });

    //reading original folder
    fs.readdir(locationOriginal, {withFileTypes: true}, (err, files) =>{
        if (err){
            console.log(`You've got an error ${err}\n`);
        } else {
            //for each file of the original folder
            files.forEach(file =>{
                let fileName = path.parse(path.join(locationOriginal, file.name)).base; //full name of the file including its extention
                let oldFileLocation = path.join(locationOriginal, fileName); //full path to old files
                let newFileLocation = path.join(locationCopy, fileName); //full path to new copy
                //copying files from old to new folder + error handler
                fs.copyFile(oldFileLocation, newFileLocation, (err) =>{
                    if (err){
                        console.log(`You've got an error ${err}\n`);
                    } else{
                        console.log(`${fileName} was successfully copied to "files-copy" folder`);
                    }
                });
            });
        }
    });
}

//function call
copyDir();