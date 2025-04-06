
// app/Composants/detailsBlog.js
import CommentList from "./CommentList";
import AddComment from "./AddComment";

export default function BlogDetails({ blog }) {
  if (!blog) {
    return <p>Blog non trouvé</p>;
  }

  return (
            <div className="container">
                <div className="card carte m-auto h-100 w-100">
                    <img src="../img/blog.jpg" className="card-img-top" alt="card" />
                    <div className="card-body text-center d-flex flex-column">
                        <h5 className="card-title text-white title fw-bold shadow-lg p-2 rounded">
                            {blog.title}
                        </h5>
                            <div className="card-text card-text-scroll overflow-auto text-dark">
                            {blog.content}
                    </div>  
                        <p className="card-meta mt-auto text-center text-dark">
                            <small>
                                <strong>Auteur :</strong> {blog.author} |  
                                <strong>Date :</strong> {blog.date}
                            </small>
                        </p>
                </div>
            </div>
      
      <h2>Commentaires</h2>
      <AddComment postId={blog.id} />
      <CommentList postId={blog.id} />
    </div>
  );
}
