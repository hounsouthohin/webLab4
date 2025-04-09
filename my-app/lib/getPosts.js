// lib/getPosts.js
import fs from 'fs';
import path from 'path';

export async function getAllPosts() {
  const filePath = path.join(process.cwd(), '/db.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileData);
  return data.posts || [];
}
