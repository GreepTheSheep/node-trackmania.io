var cwf = require.main.filename
cwf = cwf.substring(cwf.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1)
console.log(cwf)