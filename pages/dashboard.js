import { supabase } from '../lib/supabaseClient'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  if (!session) {
    return <div>Please log in to access this page.</div>
  }

  return (
    <div className="p-10">
      <h1>Welcome, {session.user.email}</h1>
    </div>
  )
}
