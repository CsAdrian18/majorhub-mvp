import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex space-x-4 p-4 bg-gray-200">
      <Link href="/">Home</Link>
      <Link href="/universities">Universities</Link>
      <Link href="/careers">Careers</Link>
      <Link href="/auth">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  )
}

