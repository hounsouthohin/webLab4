import { addCommentToIndexedDB } from '../utils/indexedDB';  // Assure-toi d'importer ta fonction

export async function submitComment(postId, content) {
  const newComment = {
    postId: parseInt(postId),
    content,
    date: new Date().toISOString()
  };

  try {
    // Tentative d'envoi du commentaire au serveur
    const response = await fetch('http://localhost:5501/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l’ajout du commentaire');
    }

    const savedComment = await response.json();
    return savedComment;  // Commentaire enregistré sur le serveur
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire :', error);

    // Si le serveur est indisponible, on l'ajoute à IndexedDB pour une utilisation future
    try {
      await addCommentToIndexedDB(newComment);  // Utilisation de la fonction déjà définie
      return newComment;  // Commentaire sauvegardé localement dans IndexedDB
    } catch (indexedDBError) {
      console.error('Erreur lors de la sauvegarde du commentaire dans IndexedDB :', indexedDBError);
      throw new Error('Erreur lors de la sauvegarde du commentaire dans IndexedDB');
    }
  }
}

