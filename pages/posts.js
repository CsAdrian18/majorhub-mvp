import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user)
    })

    fetchPosts()
  }, [])

  async function fetchPosts() {
    let { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (error) console.error(error)
    else setPosts(data)
  }

  async function submitPost() {
    if (!newPost) return
    const { data, error } = await supabase.from('posts').insert([
      { user_id: user.id, content: newPost }
    ])
    if (error) console.error(error)
    else {
      setNewPost('')
      fetchPosts()
    }
  }

  if (!user) {
    return <div>Please log in to post</div>
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Community Posts</h1>
      <div className="mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your post here..."
          className="border p-2 w-full mb-2"
        />
        <button onClick={submitPost} className="bg-blue-500 text-white px-4 py-2 rounded">
          Post
        </button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 p-4 border rounded">
            <p>{post.content}</p>
            <p className="text-sm text-gray-400">{post.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
