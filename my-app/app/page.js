// app/page.js
'use client';
import { useEffect, useState } from 'react';
import { getPostsFromIndexedDB } from '../app/utils/indexedDB';
import BlogList from './Composants/BlogList';


export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Tentative de récupération des posts depuis l'API
        const res = await fetch('http://localhost:5501/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          throw new Error('Erreur lors de la récupération des posts depuis l\'API');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des posts depuis l\'API :', error);

        // Si l'API échoue, récupérer les posts depuis IndexedDB
        try {
          const postsFromIndexedDB = await getPostsFromIndexedDB();
          setPosts(postsFromIndexedDB);
        } catch (indexedDBError) {
          console.error('Erreur lors de la récupération des posts depuis IndexedDB :', indexedDBError);
        }
      } finally {
        setLoading(false); // Arrêter le chargement
      }
    }

    fetchPosts();
  }, []); // Exécuter au montage du composant

  if (loading) {
    return <p>Chargement...</p>; // Message de chargement
  }

  return (
    <main>
      <h1 className="text-3xl font-bold mt-4 text-center">Blogs</h1>
      <BlogList posts={posts} />
    </main>
  );
}



