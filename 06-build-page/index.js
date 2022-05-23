//modules and variables
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const newFileLocation = path.join(__dirname, 'project-dist');
const newStylesLocation = path.join(newFileLocation, 'style.css');
const oldStylesLocation = path.join(__dirname, 'styles');
const templateHtml = path.join(__dirname, 'template.html');
const templateLocation = path.join(__dirname, 'components');
const newHTMLLocation = path.join(newFileLocation, 'index.html');
const assetsLocation = path.join(__dirname, 'assets');
const newAssetsLocation = path.join(newFileLocation, 'assets');

//delete 'project-dist' folder, if it exists
async function deleteFolder() {
    await fsPromises.rm(newFileLocation, {recursive: true, force: true}, (err) => {
        if (err){
            console.log('You\'ve got an error ' + err);
        } 
    });
}

//create 'project-dist' folder
async function createFolder() {
    await fsPromises.mkdir(newFileLocation, {recursive: true}, (err) => {
        if (err){
            console.log('You\'ve got an error ' + err);
        } 
    });
}

//making a HTML file from template
async function fromTemplatesToIndex() {
    let indexHTML = await fsPromises.readFile(templateHtml, 'utf-8');
    const templates = await fsPromises.readdir(templateLocation, {withFileTypes: true});
    for(let item of templates) {
        const templatesInsides = await fsPromises.readFile(path.join(templateLocation, `${item.name}`), 'utf-8');
        const regExp = new RegExp(`{{${(item.name).split('.')[0]}}}`, 'g');
        indexHTML = indexHTML.replace(regExp, templatesInsides);
    }
    await fsPromises.writeFile(newHTMLLocation, indexHTML);
}

//merging styles
async function styleMerge(){
    const readingFolder = await fsPromises.readdir(oldStylesLocation, {withFileTypes: true}, (err) =>{ // reading content in styles folder
        if (err){
            console.log('You\'ve got an error ' + err);
        }
    });
    await fsPromises.open(newStylesLocation, 'a'); //open or create a file to merge into ('a' flag) 
    for(let item of readingFolder){
        if (item.isFile()){ //checking if it's a file
            let fullStylesLocation = path.join(oldStylesLocation, item.name); // files fron styles folder
            let stylesFilePath = path.join(oldStylesLocation, path.parse(fullStylesLocation).base);
            if (path.extname(item.name) === '.css'){ //checking extention, if it's .css, then reading and appending files
                fs.readFile(stylesFilePath, 'utf-8', (err, data) =>{
                    if (err){
                        console.log('You\'ve got an error ' + err);
                    }
                    fs.appendFile(newStylesLocation, data, 'utf-8', (err) =>{
                        if (err){
                            console.log('You\'ve got an error ' + err);
                        }
                        console.log('Content from ' + path.parse(fullStylesLocation).base + ' was added to bundle.css file');
                    });
                });                    
            }
        }
    }
}

//copying assets folder
async function copyDir(assetsLocation, newAssetsLocation) {
    const entries = await fsPromises.readdir(assetsLocation, {withFileTypes: true}, (err) => { //open old folder
        if (err){
            console.log('You\'ve got an error ' + err);
        } 
    });
    await fsPromises.mkdir(newAssetsLocation, {recursive: true}, (err) => { //create new folder
        if (err){
            console.log('You\'ve got an error ' + err);
        }
    });
    for(let entry of entries) {
        const oldAssetFileLocation = path.join(assetsLocation, entry.name);
        const newAssetFileLocation = path.join(newAssetsLocation, entry.name);
        if(entry.isDirectory()) {
            await copyDir(oldAssetFileLocation, newAssetFileLocation);
        } else {
            await fsPromises.copyFile(oldAssetFileLocation, newAssetFileLocation);
            console.log('Your assets were successfully copied to ' + newAssetFileLocation);
        }
    }
}

//creating a page
function buildPage(){
    deleteFolder().then(()=>{
        createFolder();
        styleMerge();
        copyDir(assetsLocation, newAssetsLocation);
        fromTemplatesToIndex();
    });
    console.log('The page was build!');
}

buildPage();