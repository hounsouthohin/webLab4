'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogDetails from '../../Composants/detailsBlog';
import { getPostsFromIndexedDB } from '../../utils/indexedDB'; // Importer la fonction pour récupérer depuis IndexedDB

export default function Page() {
  const { id } = useParams(); // ← récupère dynamiquement les params
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const res = await fetch(`http://localhost:5501/posts/${id}`);

        if (!res.ok) {
          throw new Error('Erreur lors du fetch');
        }

        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du blog :", error);

        // Si l'API échoue, essayer de récupérer le blog depuis IndexedDB
        try {
          const postsFromIndexedDB = await getPostsFromIndexedDB();
          const blogFromIndexedDB = postsFromIndexedDB.find(post => post.id === id);
          setBlog(blogFromIndexedDB || null);
        } catch (indexedDBError) {
          console.error('Erreur lors de la récupération du blog depuis IndexedDB :', indexedDBError);
          setBlog(null);
        }
      }
    }

    if (id) fetchBlogData();
  }, [id]);

  if (!blog) {
    return <p>Blog non trouvé</p>;
  }

  return (
    <div className="container">
      <BlogDetails blog={blog} />
    </div>
  );
}
