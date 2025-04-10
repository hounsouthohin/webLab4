/*const filePath = path.join(process.cwd(), 'data', 'db.json');

// Fonction pour lire le fichier JSON
const readData = () => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

// Fonction pour écrire dans le fichier JSON
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Handler pour la requête GET : Obtenir une publication
export async function GET(req, { params }) {
  const data = readData();
  const postId = params.id; // Le paramètre de l'URL

  // Chercher la publication par son ID
  const post = data.posts.find((post) => post.id === postId);
  
  if (!post) {
    return new Response(JSON.stringify({ error: 'Publication non trouvée' }), { status: 404 });
  }

  return new Response(JSON.stringify(post), { status: 200 });
}

// Handler pour la requête POST : Créer une nouvelle publication
export async function POST(req) {
  const data = readData();
  const newPost = await req.json();

  // Validation des champs
  if (!newPost.title || !newPost.content || !newPost.author) {
    return new Response(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
  }

  // Ajouter un ID unique basé sur la date actuelle
  newPost.id = Date.now().toString();
  newPost.date = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  
  data.posts.push(newPost); // Ajouter la nouvelle publication à l'array

  writeData(data); // Sauvegarder les données dans le fichier JSON

  return new Response(JSON.stringify({ message: 'Publication créée avec succès' }), { status: 201 });
}

// Handler pour la requête PUT : Modifier une publication existante
export async function PUT(req, { params }) {
  const data = readData();
  const postId = params.id;
  const updatedPost = await req.json();

  // Chercher la publication à modifier
  const index = data.posts.findIndex((post) => post.id === postId);
  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Publication non trouvée' }), { status: 404 });
  }

  // Mettre à jour les champs
  data.posts[index] = { ...data.posts[index], ...updatedPost };
  writeData(data); // Sauvegarder les données mises à jour dans le fichier JSON

  return new Response(JSON.stringify({ message: 'Publication mise à jour avec succès' }), { status: 200 });
}

// Handler pour la requête DELETE : Supprimer une publication
export async function DELETE(req, { params }) {
  const data = readData();
  const postId = params.id;

  // Chercher la publication à supprimer
  const index = data.posts.findIndex((post) => post.id === postId);
  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Publication non trouvée' }), { status: 404 });
  }

  // Supprimer la publication
  data.posts.splice(index, 1);
  writeData(data); // Sauvegarder les données mises à jour dans le fichier JSON

  return new Response(JSON.stringify({ message: 'Publication supprimée avec succès' }), { status: 200 });
}
*/