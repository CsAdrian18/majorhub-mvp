import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!id) return;

    async function fetchPost() {
      let { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error(error);
      else setPost(data);
    }

    async function fetchComments() {
      let { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true });
      if (error) console.error(error);
      else setComments(data);
    }

    fetchPost();
    fetchComments();
  }, [id]);

  async function handleCommentSubmit(e) {
    e.preventDefault();

    // Only check auth when trying to comment
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    const user_id = user.id;

    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: id, content: newComment, user_id }])
      .select();

    if (error) console.error(error);
    else {
      setComments([...comments, data[0]]);
      setNewComment('');
    }
  }

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      <p className="mb-8 text-gray-500">{post.type} • {new Date(post.created_at).toLocaleString()}</p>

      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Post Comment
        </button>
      </form>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-2 p-3 border rounded bg-gray-50">
            <p>{comment.content}</p>
            <span className="text-sm text-gray-400">{new Date(comment.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
