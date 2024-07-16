const path = require('path');
const fs = require('fs');

function readFile() {
  const data = fs.readFileSync(path.join(__dirname, './data.json'), 'utf8')
  return data
}


module.exports = {
  readFile
}
