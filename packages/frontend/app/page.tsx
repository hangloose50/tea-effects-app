'use client';

import Link from 'next/link';

const effects = [
  { name: 'Focus', icon: '🎯', description: 'Sustained concentration', path: 'sustained_focus' },
  { name: 'Calm', icon: '😌', description: 'Reduce anxiety & stress', path: 'calm' },
  { name: 'Energy', icon: '⚡', description: 'Physical & mental boost', path: 'energy_boost' },
  { name: 'Sleep', icon: '💤', description: 'Prepare for rest', path: 'sleep_prep' },
  { name: 'Creativity', icon: '🎨', description: 'Divergent thinking', path: 'creativity' },
  { name: 'Memory', icon: '🧠', description: 'Learning & recall', path: 'memory' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-900 mb-4">
            🍵 Tea Effects
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered tea recommendations based on your desired effects
          </p>
        </div>

        {/* Effect Selector */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            What do you need right now?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {effects.map((effect) => (
              <Link
                key={effect.name}
                href={`/effects?effect=${effect.path}`}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer border-2 border-transparent hover:border-green-500"
              >
                <div className="text-5xl mb-4 text-center">{effect.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                  {effect.name}
                </h3>
                <p className="text-gray-600 text-center">{effect.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Link
            href="/blends"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center hover:opacity-90 transition-opacity"
          >
            <div className="text-3xl mb-2">🧪</div>
            <h3 className="text-xl font-bold mb-2">Create Blend</h3>
            <p className="text-sm opacity-90">Custom mix for specific effects</p>
          </Link>

          <Link
            href="/tea"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl p-6 text-center hover:opacity-90 transition-opacity"
          >
            <div className="text-3xl mb-2">🍃</div>
            <h3 className="text-xl font-bold mb-2">Browse Teas</h3>
            <p className="text-sm opacity-90">Explore our tea database</p>
          </Link>

          <Link
            href="/journal"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl p-6 text-center hover:opacity-90 transition-opacity"
          >
            <div className="text-3xl mb-2">📝</div>
            <h3 className="text-xl font-bold mb-2">Tea Journal</h3>
            <p className="text-sm opacity-90">Track your experiences</p>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-green-100 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            How it works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">1️⃣</div>
              <p className="text-gray-700">Select your desired effect</p>
            </div>
            <div>
              <div className="text-4xl mb-2">2️⃣</div>
              <p className="text-gray-700">Get AI-powered recommendations</p>
            </div>
            <div>
              <div className="text-4xl mb-2">3️⃣</div>
              <p className="text-gray-700">Brew & track your experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
