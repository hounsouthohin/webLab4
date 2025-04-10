'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addPostToIndexedDB, getPostsFromIndexedDB } from '../utils/indexedDB';

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  // Fonction pour récupérer les posts depuis le serveur ou IndexedDB
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5501/posts');

      if (response.ok) {
        const postsFromServer = await response.json();
        setPosts(postsFromServer); // Récupérer les posts depuis le serveur
      } else {
        throw new Error('Erreur lors de la récupération des posts du serveur');
      }
    } catch (error) {
      console.error("Le serveur est hors ligne, récupération depuis IndexedDB", error);
      const postsFromIndexedDB = await getPostsFromIndexedDB(); // Récupérer les posts depuis IndexedDB
      setPosts(postsFromIndexedDB);
    }
  };

  useEffect(() => {
    fetchPosts(); // Appel au lancement pour récupérer les posts
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePublishClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async (confirmed) => {
    setShowConfirm(false);
    if (!confirmed) return;

    const newPost = {
      ...formData,
      date: new Date().toISOString().split('T')[0],
      id: Date.now().toString(), // Ajout d'un ID unique
    };

    // Tentative de poster sur le serveur db.json (localhost)
    try {
      const response = await fetch('http://localhost:5501/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      
      if (response.ok) {
        const createdPost = await response.json();
        setPosts((prevPosts) => [...prevPosts, createdPost]); // Ajouter le post au tableau local
        alert("Article ajouté !");
        router.push('../');
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      // Si l'API ne fonctionne pas (serveur hors ligne), on enregistre dans IndexedDB
      console.error("Erreur lors de l'ajout via l'API, sauvegarde dans IndexedDB", error);
      try {
        await addPostToIndexedDB(newPost);  // Enregistrer dans IndexedDB
        setPosts((prevPosts) => [...prevPosts, newPost]); // Ajouter le post localement
        alert("Serveur hors ligne, article sauvegardé localement.");
        router.push('../');
      } catch (indexedDBError) {
        console.error('Erreur lors de l’ajout dans IndexedDB', indexedDBError);
        alert("Erreur lors de la sauvegarde locale.");
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Ajouter un article</h2>

      <div className="mb-3">
        <label className="form-label">Titre</label>
        <input type="text" className="form-control" name="title" onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Contenu</label>
        <textarea className="form-control" rows="6" name="content" onChange={handleChange}></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Auteur</label>
        <input type="text" className="form-control" name="author" onChange={handleChange} />
      </div>

      {!showConfirm ? (
        <button className="btn btn-success" onClick={handlePublishClick}>
          Publier l'article
        </button>
      ) : (
        <div className="alert alert-warning mt-4">
          <p className="mb-3">Confirmez-vous l’ajout de cet article ?</p>
          <button className="btn btn-success me-2" onClick={() => handleConfirm(true)}>Oui</button>
          <button className="btn btn-secondary" onClick={() => handleConfirm(false)}>Non</button>
        </div>
      )}

      
    </div>
  );
}

