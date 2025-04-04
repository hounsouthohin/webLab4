// fonction AddComment
export default function AddComment({ postId }) {
    return (
        <div className="container my-3">
            <h2>Ajouter un commentaire</h2>
            <form action={`http://localhost:5501/posts/${postId}/comments`} method="POST">
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenu</label>
                    <textarea className="form-control" id="content" name="content" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
}