export async function POST(request) {
  const newPost = await request.json();

  if (
    !newPost.title?.trim() ||
    !newPost.content?.trim() ||
    !newPost.author?.trim()
  ) {
    return new Response(JSON.stringify({ error: 'Tous les champs sont requis.' }), { status: 400 });
  }

  newPost.id = Date.now().toString();
  newPost.date = new Date().toISOString().split('T')[0];

  const response = await fetch('http://localhost:5501/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    console.error('Erreur d’ajout du blog :', await response.text());
    return new Response(JSON.stringify({ error: 'Erreur lors de l’ajout du post' }), { status: 500 });
  }

  const savedPost = await response.json();
  return new Response(JSON.stringify(savedPost), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}





