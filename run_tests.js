const shell = require('shelljs');
const fs = require('fs');

const fileObjs = fs.readdirSync('./test', { withFileTypes: true }); 

fileObjs.forEach(file => { 
    console.log('Testing',file.name);
    
    shell.exec('node ./test/' + file.name, function(code) {
        console.log('Exit code:', code);
        if (code != 0){
            process.exit(code);
        }
    });
});