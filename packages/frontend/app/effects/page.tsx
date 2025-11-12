'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

function EffectsContent() {
  const searchParams = useSearchParams();
  const effect = searchParams.get('effect');

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [timeOfDay, setTimeOfDay] = useState('morning');

  useEffect(() => {
    if (effect) {
      fetchRecommendations();
    }
  }, [effect]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      const response = await axios.post(`${apiUrl}/api/recommendations`, {
        desired_effect: effect,
        intensity_needed: 4,
        time_of_day: timeOfDay,
        recent_caffeine: 0,
        preferences: {
          max_caffeine: 100
        }
      });

      setRecommendations(response.data.recommendations || []);
    } catch (error: any) {
      console.error('Error fetching recommendations:', error);
      alert('Failed to get recommendations. Make sure the API server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (!effect) {
    return <div>No effect selected</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Recommendations for {effect?.replace('_', ' ')}
          </h1>
          <p className="text-gray-600">Based on your preferences and current state</p>
        </div>

        {/* Time of Day Selector */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time of Day
          </label>
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
          <button
            onClick={fetchRecommendations}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Get Recommendations
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🍵</div>
            <p className="text-gray-600">Brewing your perfect recommendations...</p>
          </div>
        )}

        {/* Recommendations */}
        {!loading && recommendations.length > 0 && (
          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">
                      {rec.tea.name}
                    </h2>
                    <p className="text-gray-500 capitalize">
                      {rec.tea.type} • {rec.tea.origin}
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                    #{index + 1} Pick
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{rec.reasoning}</p>

                {/* Compounds */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Compounds</h3>
                  <div className="flex gap-4 flex-wrap">
                    <div className="bg-white px-3 py-2 rounded-lg">
                      <span className="text-sm text-gray-600">Caffeine:</span>
                      <span className="ml-2 font-bold">{rec.compound_breakdown.caffeine_mg}mg</span>
                    </div>
                    <div className="bg-white px-3 py-2 rounded-lg">
                      <span className="text-sm text-gray-600">L-theanine:</span>
                      <span className="ml-2 font-bold">{rec.compound_breakdown.l_theanine_mg}mg</span>
                    </div>
                  </div>
                </div>

                {/* Brewing */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Brewing Instructions</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-blue-700">Temperature</p>
                      <p className="text-xl font-bold">{rec.brewing_method.temperature_c}°C</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">Time</p>
                      <p className="text-xl font-bold">{rec.brewing_method.steep_time_sec}s</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">Amount</p>
                      <p className="text-xl font-bold">{rec.brewing_method.amount_g}g</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && recommendations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Click "Get Recommendations" to see personalized tea suggestions
          </div>
        )}
      </div>
    </div>
  );
}

export default function EffectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EffectsContent />
    </Suspense>
  );
}
