import Link from "next/link";
import styles from './moduleStyle/BlogCard.module.css'; // Importer le module CSS

export default function BlogCard({ id, title, content, author, date }) {
    return (
        <div className={`col ${styles.blogCardContainer}`}>
            <Link href={`/Blogs/${id}`} className="text-decoration-none">
                <div className={`${styles.card} card m-auto h-100 w-100`}>
                    <img src="../img/blog.jpg" className="card-img-top" alt="card" />
                    <div className={`${styles.cardBody} card-body text-center d-flex flex-column`}>
                        <h5 className={`${styles.title} card-title text-white fw-bold shadow-lg p-2 rounded`}>
                            {title}
                        </h5>
                        <div className={`${styles.cardText} card-text`}>
                            {content}
                        </div>
                        <p className="card-meta mt-auto text-center text-dark">
                            <small>
                                <strong>Auteur :</strong> {author} |  
                                <strong>Date :</strong> {date}
                            </small>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
