'use client';

import { useState } from 'react';
import { submitComment } from '../Actions/SubmitComment';


export default function AddComment({ postId, addNewComment }) {
  const [content, setContent] = useState('');

  async function handleSubmit(formData) {
    const content = formData.get("content");

    // 1. Appel au serveur pour ajouter le commentaire
    const newComment = await submitComment(postId, content);

    // 3. Appel de la fonction pour ajouter le commentaire dans la liste (parent)
    addNewComment(newComment);

    // 4. Réinitialiser le champ
    setContent('');
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-2 mt-4">
      <textarea
        name="content"
        placeholder="Écrivez votre commentaire ici..."
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full h-24 resize-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit self-end"
      >
        Ajouter le commentaire
      </button>
    </form>
  );
}
