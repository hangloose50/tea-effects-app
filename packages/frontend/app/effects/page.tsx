'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Thermometer, Droplets, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

// Fallback recommendations for when API/Ollama is unavailable
const fallbackRecommendations: Record<string, any[]> = {
  creativity: [
    {
      tea: {
        name: "Tie Guan Yin (Iron Goddess)",
        type: "oolong",
        description: "Premium oolong with exceptional L-theanine content. Known for producing a calm, creative mental state.",
        compounds: [
          { name: "caffeine", amount_mg: 45 },
          { name: "l-theanine", amount_mg: 40 }
        ]
      },
      reasoning: "High L-theanine balances caffeine for calm focus and creative thinking",
      brewing_method: {
        temperature_c: 85,
        steep_time_sec: 180,
        amount_g: 3
      },
      compound_breakdown: { caffeine_mg: 45, l_theanine_mg: 40 }
    },
    {
      tea: {
        name: "Gyokuro",
        type: "green",
        description: "Shade-grown premium green tea with very high L-theanine. Produces exceptional calm-focus state.",
        compounds: [
          { name: "caffeine", amount_mg: 40 },
          { name: "l-theanine", amount_mg: 50 }
        ]
      },
      reasoning: "Highest L-theanine content promotes alpha brain waves for creativity",
      brewing_method: {
        temperature_c: 70,
        steep_time_sec: 120,
        amount_g: 3
      },
      compound_breakdown: { caffeine_mg: 40, l_theanine_mg: 50 }
    }
  ],
  sustained_focus: [
    {
      tea: {
        name: "Sencha",
        type: "green",
        description: "Classic Japanese green tea with balanced caffeine and L-theanine for sustained focus.",
        compounds: [
          { name: "caffeine", amount_mg: 35 },
          { name: "l-theanine", amount_mg: 25 }
        ]
      },
      reasoning: "Balanced compounds provide steady energy without jitters",
      brewing_method: {
        temperature_c: 75,
        steep_time_sec: 90,
        amount_g: 2.5
      },
      compound_breakdown: { caffeine_mg: 35, l_theanine_mg: 25 }
    }
  ],
  calm: [
    {
      tea: {
        name: "Chamomile Lavender",
        type: "herbal",
        description: "Caffeine-free herbal blend with natural calming properties.",
        compounds: [
          { name: "apigenin", amount_mg: 5 },
          { name: "linalool", amount_mg: 3 }
        ]
      },
      reasoning: "Natural compounds that promote GABA activity for relaxation",
      brewing_method: {
        temperature_c: 95,
        steep_time_sec: 300,
        amount_g: 2
      },
      compound_breakdown: { caffeine_mg: 0, l_theanine_mg: 0 }
    }
  ],
  energy_boost: [
    {
      tea: {
        name: "Yerba Mate",
        type: "herbal",
        description: "South American tea with high caffeine and unique xanthine alkaloids for clean energy.",
        compounds: [
          { name: "caffeine", amount_mg: 80 },
          { name: "theobromine", amount_mg: 20 }
        ]
      },
      reasoning: "High caffeine with theobromine provides sustained energy without crash",
      brewing_method: {
        temperature_c: 80,
        steep_time_sec: 240,
        amount_g: 3
      },
      compound_breakdown: { caffeine_mg: 80, l_theanine_mg: 0 }
    }
  ],
  sleep_prep: [
    {
      tea: {
        name: "Passionflower Valerian",
        type: "herbal",
        description: "Powerful sleep-promoting herbal blend. Best consumed 30-60 minutes before bed.",
        compounds: [
          { name: "valerenic acid", amount_mg: 10 },
          { name: "chrysin", amount_mg: 5 }
        ]
      },
      reasoning: "Compounds that enhance GABA and reduce neural activity for sleep",
      brewing_method: {
        temperature_c: 95,
        steep_time_sec: 420,
        amount_g: 2.5
      },
      compound_breakdown: { caffeine_mg: 0, l_theanine_mg: 0 }
    }
  ],
  memory: [
    {
      tea: {
        name: "Ginkgo Green",
        type: "green",
        description: "Green tea enhanced with ginkgo biloba for memory and cognitive function.",
        compounds: [
          { name: "caffeine", amount_mg: 30 },
          { name: "ginkgolides", amount_mg: 15 }
        ]
      },
      reasoning: "Ginkgo compounds improve blood flow to brain for enhanced memory",
      brewing_method: {
        temperature_c: 80,
        steep_time_sec: 150,
        amount_g: 2.5
      },
      compound_breakdown: { caffeine_mg: 30, l_theanine_mg: 20 }
    }
  ]
};

function EffectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const effect = searchParams.get('effect');

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    if (effect) {
      fetchRecommendations();
    }
  }, [effect, timeOfDay]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);

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
      }, {
        timeout: 10000 // 10 second timeout
      });

      if (response.data.success && response.data.recommendations) {
        setRecommendations(response.data.recommendations);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error: any) {
      console.error('Error fetching recommendations:', error);

      // Use fallback recommendations
      const fallback = fallbackRecommendations[effect || ''] || [];
      if (fallback.length > 0) {
        setRecommendations(fallback);
        setUsingFallback(true);
        setError('Using offline recommendations (API unavailable)');
      } else {
        setError('Unable to get recommendations. Please ensure the API server and Ollama are running.');
        setRecommendations([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatEffectName = (effectName: string) => {
    return effectName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!effect) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-tea-brown-50 via-tea-clay-50 to-tea-brown-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍵</div>
          <p className="font-sans text-xl text-tea-clay-600">No effect selected</p>
          <Link href="/">
            <button className="mt-4 bg-tea-sage-600 hover:bg-tea-sage-700 text-white px-6 py-3 rounded-lg font-sans">
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-tea-brown-50 via-tea-clay-50 to-tea-brown-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-tea-brown-700 hover:text-tea-brown-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-sans">Back to Home</span>
          </button>

          <h1 className="font-serif text-5xl font-bold text-tea-brown-900 mb-2">
            Recommendations for {formatEffectName(effect)}
          </h1>
          <p className="font-sans text-xl text-tea-clay-600">
            Based on your preferences and current state
          </p>
        </div>

        {/* Time of Day Selector */}
        <div className="bg-white rounded-xl shadow-organic p-6 mb-8 border border-tea-brown-200">
          <label className="block font-sans font-medium text-tea-brown-800 mb-3">
            Time of Day
          </label>
          <div className="flex gap-3">
            {['morning', 'afternoon', 'evening', 'night'].map((time) => (
              <button
                key={time}
                onClick={() => setTimeOfDay(time)}
                className={`flex-1 py-2 px-4 rounded-lg font-sans capitalize transition-all ${
                  timeOfDay === time
                    ? 'bg-tea-sage-600 text-white shadow-md'
                    : 'bg-tea-brown-100 text-tea-brown-700 hover:bg-tea-brown-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Error/Warning Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
              usingFallback
                ? 'bg-tea-amber-100 border border-tea-amber-300 text-tea-amber-800'
                : 'bg-red-100 border border-red-300 text-red-800'
            }`}
          >
            <AlertCircle size={20} />
            <span className="font-sans">{error}</span>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4 inline-block"
            >
              🍵
            </motion.div>
            <p className="font-sans text-lg text-tea-clay-600">
              Brewing your perfect recommendations...
            </p>
          </div>
        )}

        {/* Recommendations */}
        {!loading && recommendations.length > 0 && (
          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-organic-lg p-8 border border-tea-brown-200"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-tea-brown-900 mb-2">
                      {rec.tea.name}
                    </h2>
                    <span className="inline-block px-3 py-1 bg-tea-sage-100 text-tea-sage-700 rounded-full font-sans text-sm capitalize">
                      {rec.tea.type}
                    </span>
                  </div>
                  {index === 0 && (
                    <span className="flex items-center gap-2 px-4 py-2 bg-tea-amber-100 text-tea-amber-800 rounded-full font-sans font-medium">
                      <Sparkles size={18} />
                      Top Pick
                    </span>
                  )}
                </div>

                {rec.tea.description && (
                  <p className="font-sans text-lg text-tea-brown-700 mb-6 leading-relaxed">
                    {rec.tea.description}
                  </p>
                )}

                {/* Reasoning */}
                <div className="bg-tea-sage-50 rounded-lg p-4 mb-6 border border-tea-sage-200">
                  <h3 className="font-serif text-xl font-bold text-tea-sage-800 mb-2">
                    Why this tea?
                  </h3>
                  <p className="font-sans text-tea-sage-700">
                    {rec.reasoning}
                  </p>
                </div>

                {/* Compounds */}
                <div className="bg-tea-clay-50 rounded-lg p-4 mb-6 border border-tea-clay-200">
                  <h3 className="font-serif text-xl font-bold text-tea-clay-800 mb-3">Compounds</h3>
                  <div className="flex gap-4 flex-wrap">
                    <div className="bg-white px-3 py-2 rounded-lg border border-tea-clay-200">
                      <span className="font-sans text-sm text-tea-clay-600">Caffeine:</span>
                      <span className="ml-2 font-sans font-bold text-tea-brown-900">{rec.compound_breakdown?.caffeine_mg || 0}mg</span>
                    </div>
                    <div className="bg-white px-3 py-2 rounded-lg border border-tea-clay-200">
                      <span className="font-sans text-sm text-tea-clay-600">L-theanine:</span>
                      <span className="ml-2 font-sans font-bold text-tea-brown-900">{rec.compound_breakdown?.l_theanine_mg || 0}mg</span>
                    </div>
                  </div>
                </div>

                {/* Brewing Instructions */}
                {rec.brewing_method && (
                  <div className="bg-tea-brown-50 rounded-lg p-4 border border-tea-brown-200">
                    <h3 className="font-serif text-xl font-bold text-tea-brown-800 mb-3">
                      Brewing Instructions
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Thermometer className="text-tea-amber-600" size={20} />
                        <div>
                          <p className="font-sans text-sm text-tea-clay-600">Temperature</p>
                          <p className="font-sans font-semibold text-tea-brown-800">
                            {rec.brewing_method.temperature_c}°C
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-tea-amber-600" size={20} />
                        <div>
                          <p className="font-sans text-sm text-tea-clay-600">Steep Time</p>
                          <p className="font-sans font-semibold text-tea-brown-800">
                            {Math.floor(rec.brewing_method.steep_time_sec / 60)}:{(rec.brewing_method.steep_time_sec % 60).toString().padStart(2, '0')} min
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="text-tea-amber-600" size={20} />
                        <div>
                          <p className="font-sans text-sm text-tea-clay-600">Amount</p>
                          <p className="font-sans font-semibold text-tea-brown-800">
                            {rec.brewing_method.amount_g}g
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* No Recommendations */}
        {!loading && recommendations.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <p className="font-sans text-xl text-tea-clay-600">
              No recommendations available for this effect.
            </p>
            <Link href="/">
              <button className="mt-4 bg-tea-sage-600 hover:bg-tea-sage-700 text-white px-6 py-3 rounded-lg font-sans">
                Try Another Effect
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EffectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-tea-brown-50 via-tea-clay-50 to-tea-brown-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-steam">🍵</div>
            <p className="font-sans text-lg text-tea-clay-600">Loading...</p>
          </div>
        </div>
      }
    >
      <EffectsContent />
    </Suspense>
  );
}
