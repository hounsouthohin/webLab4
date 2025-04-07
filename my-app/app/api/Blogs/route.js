import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  let data;
  try {
    data = JSON.parse(fileContent);
    if (!Array.isArray(data.posts)) {
      throw new Error("Le fichier JSON ne contient pas un tableau 'posts'");
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur de parsing JSON' }), { status: 500 });
  }

  const newPost = await request.json();

  // Vérification que les champs sont remplis
  if (
    !newPost.title?.trim() ||
    !newPost.content?.trim() ||
    !newPost.author?.trim()
  ) {
    return new Response(JSON.stringify({ error: 'Tous les champs sont requis.' }), { status: 400 });
  }

  newPost.id = Date.now().toString();
  newPost.date = new Date().toISOString().split('T')[0];

  data.posts.push(newPost);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

  return new Response(JSON.stringify({ message: 'Ajouté avec succès' }), { status: 200 });
}
