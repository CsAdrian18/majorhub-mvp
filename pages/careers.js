import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Careers() {
  const [careers, setCareers] = useState([])

  useEffect(() => {
    async function fetchCareers() {
      let { data, error } = await supabase.from('careers').select('*')
      if (error) console.error(error)
      else setCareers(data)
    }
    fetchCareers()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Careers</h1>
      <ul>
        {careers.map((career) => (
          <li key={career.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{career.title}</h2>
            <p>{career.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
