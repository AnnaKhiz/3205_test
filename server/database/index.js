const path = require('path');
const fs = require('fs/promises');

async function readFile() {
  try {
    const data = await fs.readFile(path.join(__dirname, './data.json'), 'utf8')
    return data
  } catch (error) {
    console.error(`Error reading the file: ${error}`);
  }

}
module.exports = {
  readFile
}
