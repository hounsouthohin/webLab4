// app/Composants/BlogList.js
'use client';
import BlogCard from './BlogCard';
import styles from './moduleStyle/BlogList.module.css';
import { useEffect } from 'react';
import { syncPostsAndCommentsToIndexedDB } from '@/utils/sync';
import Link from "next/link";

export default function BlogList({ posts }) {

    useEffect(() => {
        syncPostsAndCommentsToIndexedDB();
      }, []);

  return (
    <div className={`container mt-5 pb-5 ${styles.container}`}>
      <Link href="../AjoutBlog" className="btn btn-primary mb-4">
        Ajouter un article
      </Link>
      <div className="row gy-4">
        {posts.map((post) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 blobCard" key={post.id}>
            <BlogCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}

