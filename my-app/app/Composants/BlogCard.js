import Link from "next/link";

export default function BlogCard({ id, title, content, author, date }) {
    return (
        <div className="col">
            <Link href={`/blog/${id}`} className="text-decoration-none publication-link">
                <div className="card carte m-auto h-100 w-100">
                    <img src="/img/blog.jpg" className="card-img-top" alt="card" />
                    <div className="card-body text-center d-flex flex-column">
                        <h5 className="card-title text-white title fw-bold shadow-lg p-2 rounded">
                            {title}
                        </h5>
                        <div className="card-text card-text-scroll overflow-auto text-dark">
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
