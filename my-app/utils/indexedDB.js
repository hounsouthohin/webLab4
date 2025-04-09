const DB_NAME = 'blogDatabase';
const DB_VERSION = 1;
const STORE_NAME_POSTS = 'posts';
const STORE_NAME_COMMENTS = 'comments';

// Fonction pour ouvrir une base de données IndexedDB
const openDB = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('IndexedDB n’est pas disponible côté serveur'));
  }

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(new Error('Erreur lors de l’ouverture de la base de données IndexedDB'));
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME_POSTS)) {
        db.createObjectStore(STORE_NAME_POSTS, { keyPath: 'id' });
      }
     
      if (!db.objectStoreNames.contains(STORE_NAME_COMMENTS)) {
        const commentStore = db.createObjectStore(STORE_NAME_COMMENTS, { keyPath: 'id' });
        commentStore.createIndex('postId', 'postId', { unique: false }); // ← index nécessaire pour getCommentsFromIndexedDB
      }
      
    };
  });
};

// Fonction pour ajouter un article dans IndexedDB
export const addPostToIndexedDB = async (post) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME_POSTS, 'readwrite');
  const store = transaction.objectStore(STORE_NAME_POSTS);
  store.add(post);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(post);
    transaction.onerror = () => reject(new Error('Erreur lors de l’ajout du post'));
  });
};

// Fonction pour obtenir tous les articles dans IndexedDB
export const getPostsFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME_POSTS, 'readonly');
  const store = transaction.objectStore(STORE_NAME_POSTS);
  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('Erreur lors de la récupération des posts'));
  });
};

// Fonction pour ajouter un commentaire dans IndexedDB
export const addCommentToIndexedDB = async (comment) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME_COMMENTS, 'readwrite');
  const store = transaction.objectStore(STORE_NAME_COMMENTS);
  store.add(comment);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(comment);
    transaction.onerror = () => reject(new Error('Erreur lors de l’ajout du commentaire'));
  });
};

// Fonction pour récupérer les commentaires par postId
export const getCommentsFromIndexedDB = async (postId) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME_COMMENTS, 'readonly');
  const store = transaction.objectStore(STORE_NAME_COMMENTS);

  // Vérifie que l’index postId existe (à créer sinon !)
  if (!store.indexNames.contains('postId')) {
    return [];
  }

  const index = store.index('postId');
  const request = index.getAll(postId);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('Erreur lors de la récupération des commentaires'));
  });
};
