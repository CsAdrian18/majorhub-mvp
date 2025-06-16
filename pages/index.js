import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-8 text-center tracking-tight">
        🚀 <span className="text-blue-400">MajorHub</span>
      </h1>
      <p className="text-lg text-gray-300 mb-12 text-center max-w-2xl">
        The community platform built for students to explore careers, universities, and real experiences from real people.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <Link href="/posts">
          <div className="bg-blue-600 hover:bg-blue-500 transition rounded-xl p-6 flex items-center justify-center text-xl font-semibold shadow-lg cursor-pointer">
            🎙 Community Posts
          </div>
        </Link>

        <Link href="/universities">
          <div className="bg-green-500 hover:bg-green-400 transition rounded-xl p-6 flex items-center justify-center text-xl font-semibold shadow-lg cursor-pointer">
            🎓 Universities
          </div>
        </Link>

        <Link href="/careers">
          <div className="bg-purple-600 hover:bg-purple-500 transition rounded-xl p-6 flex items-center justify-center text-xl font-semibold shadow-lg cursor-pointer">
            💼 Careers
          </div>
        </Link>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        Built with ❤️ for students like you.
      </footer>
    </div>
  );
}
