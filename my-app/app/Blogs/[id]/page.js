// app/blog/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import BlogDetails from '../../Composants/detailsBlog';

export default function Page({ params }) {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const res = await fetch('/db.json');
        const data = await res.json();

        const foundBlog = data.posts.find(post => post.id === params.id);
        setBlog(foundBlog);
      } catch (error) {
        console.error("Erreur lors de la récupération du blog :", error);
      }
    }

    fetchBlogData();
  }, [params.id]);

  if (!blog) {
    return <p>Blog non trouvé</p>;
  }

  return (
    <div className="container">
      <BlogDetails blog={blog} />
    </div>
  );
}

