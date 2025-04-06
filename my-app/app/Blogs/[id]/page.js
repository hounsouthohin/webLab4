// app/blog/[id]/page.js

import fs from 'fs';
import path from 'path';
import BlogDetails from '../../Composants/detailsBlog';

export default async function Page({ params }) {
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
      <BlogDetails blog={blog} />
    </div>
  );
}
