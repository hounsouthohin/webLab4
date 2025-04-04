// app/Blogs/[id]/page.js
import fs from 'fs';
import path from 'path';
import CommentList from "./CommentList";
import AddComment from "./AddComment";

export default async function BlogDetails({ params }) {
    // Définir le chemin vers le fichier db.json
    const filePath = path.join(process.cwd(), 'data', 'db.json');

    // Lire le fichier db.json et le convertir en JSON
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    // Trouver le blog correspondant à l'ID passé dans l'URL
    const blog = data.posts.find(post => post.id === params.id);

    // Si le blog n'est pas trouvé, retourner un message d'erreur
    if (!blog) {
        return <p>Blog non trouvé</p>;
    }

    // Retourner le rendu du blog avec les commentaires et le formulaire pour ajouter un commentaire
    return (
        <div className="container">
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <p><strong>Auteur :</strong> {blog.author} | <strong>Date :</strong> {blog.date}</p>
            
            <h2>Commentaires</h2>
            <AddComment postId={params.id} /> {/* Formulaire pour ajouter un commentaire */}
            <CommentList postId={params.id} /> {/* Liste des commentaires */}
        </div>
    );
}
