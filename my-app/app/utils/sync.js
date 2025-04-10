import { addPostToIndexedDB, addCommentToIndexedDB } from './indexedDB';

export async function syncPostsAndCommentsToIndexedDB() {
  try {
    const res = await fetch('/data/db.json');
    const data = await res.json();

    if (data?.posts) {
      for (const post of data.posts) {
        await addPostToIndexedDB(post);
        if (post.comments) {
          for (const comment of post.comments) {
            await addCommentToIndexedDB({ ...comment, postId: post.id });
          }
        }
      }
    }
  } catch (error) {
    console.error("Erreur de synchronisation avec le serveur :", error);
  }
}
