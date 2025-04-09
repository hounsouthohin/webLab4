import { useEffect, useState } from 'react';
import ComposantComment from './ComposantComment';
import styles from './moduleStyle/CommentList.module.css';

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch('/db.json');
        const data = await res.json();

        // Filtrage des commentaires liés à cet article
        const filteredComments = data.comments.filter(
          (comment) => comment.postId === parseInt(postId)
        );
        setComments(filteredComments);
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
      }
    }

    fetchComments();
  }, [postId]);

  return (
    <div className={`container mt-5 pb-5 ${styles.commentListContainer}`}>
      <div className="row gy-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
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
