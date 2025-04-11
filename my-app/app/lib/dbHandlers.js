import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'db.json');

export function readData() {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
       