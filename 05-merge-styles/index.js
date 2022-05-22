//modules import & variables declarations
const fs = require('fs');
const path = require('path');
const distLocation = path.join(__dirname, 'project-dist');
const stylesLocation = './05-merge-styles/styles';
const newFileLocation = path.join(distLocation, 'bundle.css');

function styleMerge(){
    fs.readdir(stylesLocation, {withFileTypes: true}, (err, files) =>{ // reading content in styles folder
        if (err){
            console.log('You\'ve got an error ' + err);
        } else{
            fs.open(newFileLocation, 'a', (err) =>{ //open or create a file to merge into ('a' flag) 
                if (err){
                    console.log('You\'ve got an error ' + err);
                }
            });
            files.forEach(item =>{
                if (item.isFile()){ //checking if it's a file
                    let fullStylesLocation = path.join(stylesLocation, item.name); // files fron styles folder
                    let stylesFilePath = path.join(stylesLocation, path.parse(fullStylesLocation).base);
                    if (path.extname(item.name) === '.css'){ //checking extention, if it's .css, then reading and appending files
                        fs.readFile(stylesFilePath, 'utf-8', (err, data) =>{
                            if (err){
                                console.log('You\'ve got an error ' + err);
                            }
                            fs.appendFile(newFileLocation, data, 'utf-8', (err) =>{
                                if (err){
                                    console.log('You\'ve got an error ' + err);
                                }
                                console.log('Content from ' + path.parse(fullStylesLocation).base + ' was added to bundle.css file');
                            });
                        });
                    }
                }
            });
        }
    });
}

styleMerge();