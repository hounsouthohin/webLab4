// components/BlogList.js
import fs from 'fs';
import path from 'path';
import BlogCard from './BlogCard';

export default function BlogList() {
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileData);
  const posts = data.posts;

  return (
    <div className="container mt-5 pb-5">
      <div className="row gy-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 posts-container">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
    </div>
  );
}

