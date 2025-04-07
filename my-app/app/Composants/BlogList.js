// components/BlogList.js
// components/BlogList.js
import fs from 'fs';
import path from 'path';
import BlogCard from './BlogCard';
import styles from './moduleStyle/BlogList.module.css'; // Import du CSS Module
import Link from "next/link";

export default function BlogList() {
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileData);
  const posts = data.posts;



  return (
    <div className={`container mt-5 pb-5 ${styles.container}`}>
        {/* Row pour aligner les cartes de manière fluide */}
        <Link href="../AjoutBlog" className="btn btn-primary mb-4">
            Ajouter un article
        </Link>
        <div className="row gy-4">
            {posts.map((post) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 blobCard" key={post.id}>
                    <BlogCard
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        author={post.author}
                        date={post.date}
                    />
                </div>
            ))}
        </div>
    </div>
);


}
