
// app/Composants/detailsBlog.js
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import styles from './moduleStyle/BlogDetails.module.css';

export default function BlogDetails({ blog }) {
  if (!blog) {
    return <p>Blog non trouvé</p>;
  }

  return (
    <div className={`container mt-5 ${styles.container}`}>
    <div className={`card carte m-auto h-100 w-100 ${styles.card}`}>
        <img src="../img/blog.jpg" className={`card-img-top ${styles.cardImage}`} alt="card" />
        <div className={`card-body text-center d-flex flex-column ${styles.cardBody}`}>
            <h5 className={`card-title text-white ${styles.title}`}>
                {blog.title}
            </h5>
            <div className={`card-text ${styles.content} text-dark`}>
                {blog.content}
            </div>  
            <p className={`card-meta mt-auto text-center text-dark ${styles.cardMeta}`}>
                <small>
                    <strong>Auteur :</strong> {blog.author} |  
                    <strong>Date :</strong> {blog.date}
                </small>
            </p>
        </div>
    </div>
    <CommentList postId={blog.id} />
</div>
  );
}
