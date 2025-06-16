import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">MajorHub</h1>
      <p className="text-lg text-center mb-8">
        Discover Students, majors, universities, and career paths — built for students like you.
      </p>
      <Link href="/auth" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Get Started
      </Link>
    </div>
  )
}
