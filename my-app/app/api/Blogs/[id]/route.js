import { readData, writeData } from '../../../lib/dbHandlers';

export async function GET(req, { params }) {
  const data = readData();
  const post = data.posts.find((p) => p.id === params.id);
  if (!post) return new Response(JSON.stringify({ error: 'Publication non trouvée' }), { status: 404 });
  return new Response(JSON.stringify(post), { status: 200 });
}

export async function PUT(req, { params }) {
  const data = readData();
  const updatedPost = await req.json();
  const index = data.posts.findIndex((p) => p.id === params.id);
  if (index === -1) return new Response(JSON.stringify({ error: 'Publication non trouvée' }), { status: 404 });

  data.posts[index] = { ...data.posts[index], ...updatedPost };
  writeData(data);

  return new Response(JSON.stringify({ message: 'Publication mise à jour' }), { status: 200 });
}

export async function DELETE(req, { params }) {
  const data = readData();
  const index = data.posts.findIndex((p) => p.id === params.id);
  if (index === -1) return new Response(JSON.stringify({ error: 'Publication non trouvée' }), { status: 404 });

  data.posts.splice(index, 1);
  writeData(data);

  return new Response(JSON.stringify({ message: 'Publication supprimée' }), { status: 200 });
}


export async function POST(request) {
    const newPost = await request.json();  // Récupère le corps de la requête (les données du post)
    
    // Validation des champs requis
    if (!newPost.title || !newPost.content || !newPost.author) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis (title, content, author)' },
        { status: 400 }
      );
    }
  
    const data = readData();  // Récupère les données existantes depuis le fichier
    const postId = Date.now().toString();  // Crée un ID unique basé sur le timestamp actuel
    
    const newPostWithId = {
      ...newPost,  // Garde les propriétés de newPost
      id: postId,  // Ajoute l'ID unique
      date: new Date().toISOString().split('T')[0],  // Date du jour en format YYYY-MM-DD
    };
  
    data.posts.push(newPostWithId);  // Ajoute le nouveau post à la liste des posts
    writeData(data);  // Enregistre les nouvelles données dans le fichier
  
    return NextResponse.json(
      { message: 'Post ajouté avec successe', post: newPostWithId },
      { status: 201 }
    );
  }