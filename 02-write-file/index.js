//modules import
const fs = require('fs');
const path = './02-write-file/text.txt';
const {stdin, stdout, exit} = process;
const out = fs.createWriteStream(path);

//greeting message
stdout.write('You can write whatever you want:\n');

//handling answer and checking for 'exit' word
stdin.on('data', writings =>{
    if (writings.toString().trim().toLowerCase() === 'exit'){
        exit();
    }
    out.write(writings.toString());
});

//goodbye message
process.on('exit', () =>{
    stdout.write('\nThanks and goodbye!\n');
});
//Ctrl+C handler
process.on('SIGINT', exit);