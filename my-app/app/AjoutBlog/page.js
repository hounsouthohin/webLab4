'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPostToIndexedDB } from '../../utils/indexedDB';

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

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

    const response = await fetch('/api/Blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        date: new Date().toISOString().split('T')[0]
      })
    });

  
    if (response.ok) {
      const createdPost = await response.json(); // <- important pour recevoir l'article avec id + date
      await addPostToIndexedDB(createdPost);
      alert("Article ajouté !");
      router.push('../');
    }
    else {
      alert("Erreur lors de l’ajout");
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
