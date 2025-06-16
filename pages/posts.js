import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('General');

  useEffect(() => {
    async function fetchPosts() {
      let { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      else setPosts(data);
    }
    fetchPosts();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    // Only check auth when trying to post
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    const user_id = user.id;

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, type, user_id }])
      .select();

    if (error) {
      console.error(error);
    } else {
      setPosts([data[0], ...posts]);
      setTitle('');
      setContent('');
      setType('General');
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Community Posts</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          className="border p-2 mb-2 w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Career">Career</option>
          <option value="University">University</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Post
        </button>
      </form>

      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <span className="text-sm text-gray-500">
              {post.type} • {new Date(post.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
