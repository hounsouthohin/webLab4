"use server";

import fs from "fs";
import path from "path";
//ajouter un comment dans indexedDB
import { addCommentToIndexedDB } from '../../utils/indexedDB';
export async function submitComment(postId, content) {
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileData);

  const newComment = {
    id: Date.now().toString(),
    postId: parseInt(postId),
    content,
    date: new Date().toISOString()
  };
  


  await addCommentToIndexedDB(newComment);
  data.comments.push(newComment);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
