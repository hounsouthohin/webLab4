// app/page.js
import { getAllPosts } from '@/lib/getPosts';
import BlogList from './Composants/BlogList';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <main>
      <h1 className="text-3xl font-bold mt-4 text-center">Blogs</h1>
      <BlogList posts={posts} />
    </main>
  );
}



