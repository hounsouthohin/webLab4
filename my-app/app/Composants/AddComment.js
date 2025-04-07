//fonction AddComment avec attribut action
'use client';

import { useState } from "react";
import { submitComment } from '../Actions/SubmitComment'; // la fonction "use server"

export default function AddComment({ postId }) {
  const [content, setContent] = useState("");

  async function handleSubmit(formData) {
    
    const content = formData.get("content");
    await submitComment(postId, content);
    setContent(""); // Reset du champ
  }


  return (
    <form action={handleSubmit} className="mb-3">
      <h2>Ajouter un commentaire</h2>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Contenu</label>
        <textarea
          className="form-control"
          id="content"
          name="content"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Ajouter</button>
    </form>
  );
}
