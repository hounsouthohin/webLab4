'use client';

import { useEffect, useState } from 'react';
import ComposantComment from './ComposantComment';
import AddComment from './AddComment';
import styles from './moduleStyle/CommentList.module.css';
import { getCommentsFromIndexedDB } from '../utils/indexedDB';

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  // Fonction pour ajouter un nouveau commentaire dans la liste des commentaires
  function addNewComment(newComment) {
    setComments((prevComments) => [newComment, ...prevComments]);
  }

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`http://localhost:5501/comments?postId=${postId}`);
        if (!res.ok) throw new Error("Erreur lors du fetch des commentaires");
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);

        // Si l'API échoue, essayer de récupérer les commentaires depuis IndexedDB
        try {
          const commentsFromIndexedDB = await getCommentsFromIndexedDB(postId);
          setComments(commentsFromIndexedDB);
        } catch (indexedDBError) {
          console.error('Erreur lors de la récupération des commentaires depuis IndexedDB :', indexedDBError);
        }
      }
    }

    fetchComments();
  }, [postId]);

  return (
    <div className={`container mt-5 pb-5 ${styles.commentListContainer}`}>
      {/* Passer la fonction `addNewComment` au composant `AddComment` */}
      <AddComment postId={postId} addNewComment={addNewComment} />
      <div className="row gy-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 mt-3">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="col" key={comment.id}>
              <ComposantComment
                content={comment.content}
                author={comment.author}
                date={comment.date}
              />
            </div>
          ))
        ) : (
          <p className="text-center">Aucun commentaire pour ce post.</p>
        )}
      </div>
    </div>
  );
}
