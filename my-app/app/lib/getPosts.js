// lib/getPosts.js
import { getPostsFromIndexedDB } from '../utils/indexedDB'; // Assurez-vous que le chemin est correct

export async function getAllPosts() {
  try {
    const res = await fetch('http://localhost:5501/posts');
    
    if (!res.ok) {
      throw new Error('Échec du chargement des posts depuis le serveur');
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des posts :', error);
    
    // En cas d'échec, tenter de récupérer les posts depuis IndexedDB
    try {
      console.log('Tentative de récupération des posts depuis IndexedDB...');
      const postsFromIndexedDB = await getPostsFromIndexedDB();
      return postsFromIndexedDB || []; // Retourne un tableau vide si aucun post n'est trouvé dans IndexedDB
    } catch (indexedDBError) {
      console.error('Erreur lors de la récupération des posts depuis IndexedDB :', indexedDBError);
      return []; // Retourne un tableau vide si IndexedDB échoue également
    }
  }
}

