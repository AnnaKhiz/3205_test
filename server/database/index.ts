import path from 'path';
import fs from 'fs/promises';

const readFile = async function (): Promise<string> {
  try {
    const data: string = await fs.readFile(path.join('./','server/database/data.json'), 'utf8')
    return data
  } catch (error) {
    console.error(`Error reading the file: ${error}`);
    return ''
  }
}
export default readFile

