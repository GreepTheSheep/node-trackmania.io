const shell = require('shelljs');
const fs = require('fs');

const fileObjs = fs.readdirSync('./examples', { withFileTypes: true }); 

fileObjs.forEach(file => { 
    console.log('Testing',file.name);
    
    shell.exec('node ./examples/' + file.name, function(code) {
        console.log(file.name, 'Exit code:', code);
        if (code != 0){
            process.exit(code);
        }
    });
});