import fs from 'fs';
import path from 'path';
import ComposantComment from './ComposantComment';
import styles from './moduleStyle/CommentList.module.css';

export default function CommentList({ postId }) {
  // Lecture du fichier JSON
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileData);

  // Filtrage des commentaires liés à cet article
  const comments = data.comments.filter(comment => comment.postId === parseInt(postId));

  return (
    <div className={`container mt-5 pb-5 ${styles.commentListContainer}`}>
    <div className="row gy-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
        {comments.length > 0 ? (
            comments.map(comment => (
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
