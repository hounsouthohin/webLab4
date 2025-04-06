"use server";

import fs from "fs";
import path from "path";

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

  data.comments.push(newComment);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
