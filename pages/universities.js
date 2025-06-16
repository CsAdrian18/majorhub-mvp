import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Universities() {
  const [universities, setUniversities] = useState([])

  useEffect(() => {
    async function fetchUniversities() {
      let { data, error } = await supabase.from('universities').select('*')
      console.log('SUPABASE FETCH RESULT:', { data, error })

      if (error) console.error('SUPABASE ERROR:', error)
      else setUniversities(data)
    }
    fetchUniversities()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Universities</h1>
      <ul>
        {universities.map((uni) => (
          <li key={uni.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{uni.name}</h2>
            <p className="text-gray-700">{uni.location}</p>
            <p>{uni.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
