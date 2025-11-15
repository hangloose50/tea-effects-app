'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Plus, X, Leaf, Clock, Thermometer, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Tea {
  id: number;
  name: string;
  type: string;
  description: string;
}

interface BlendTea {
  tea_id: number;
  tea_name: string;
  tea_type: string;
  ratio: number;
  steep_time_sec: number;
  steep_temp_c: number;
  notes: string;
}

export default function BlendsPage() {
  const [teas, setTeas] = useState<Tea[]>([]);
  const [blendName, setBlendName] = useState('');
  const [blendDescription, setBlendDescription] = useState('');
  const [selectedTeas, setSelectedTeas] = useState<BlendTea[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeas();
  }, []);

  const fetchTeas = async () => {
    try {
      const response = await fetch('/api/teas');
      const data = await response.json();
      if (data.success) {
        setTeas(data.teas);
      }
    } catch (err) {
      console.error('Error fetching teas:', err);
    }
  };

  const addTeaToBlend = (tea: Tea) => {
    if (selectedTeas.find(t => t.tea_id === tea.id)) {
      setError('Tea already added to blend');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const newTea: BlendTea = {
      tea_id: tea.id,
      tea_name: tea.name,
      tea_type: tea.type,
      ratio: 100 / (selectedTeas.length + 1),
      steep_time_sec: tea.type === 'green' ? 120 : tea.type === 'oolong' ? 180 : 240,
      steep_temp_c: tea.type === 'green' ? 75 : tea.type === 'oolong' ? 85 : 95,
      notes: ''
    };

    // Recalculate ratios
    const updatedTeas = selectedTeas.map(t => ({
      ...t,
      ratio: 100 / (selectedTeas.length + 1)
    }));

    setSelectedTeas([...updatedTeas, newTea]);
  };

  const removeTeaFromBlend = (teaId: number) => {
    const updated = selectedTeas.filter(t => t.tea_id !== teaId);
    // Recalculate ratios
    const recalculated = updated.map(t => ({
      ...t,
      ratio: updated.length > 0 ? 100 / updated.length : 0
    }));
    setSelectedTeas(recalculated);
  };

  const updateTeaRatio = (teaId: number, ratio: number) => {
    setSelectedTeas(selectedTeas.map(t =>
      t.tea_id === teaId ? { ...t, ratio: Math.min(100, Math.max(0, ratio)) } : t
    ));
  };

  const updateTeaSteepTime = (teaId: number, time: number) => {
    setSelectedTeas(selectedTeas.map(t =>
      t.tea_id === teaId ? { ...t, steep_time_sec: time } : t
    ));
  };

  const updateTeaSteepTemp = (teaId: number, temp: number) => {
    setSelectedTeas(selectedTeas.map(t =>
      t.tea_id === teaId ? { ...t, steep_temp_c: temp } : t
    ));
  };

  const createBlend = async () => {
    if (!blendName.trim()) {
      setError('Please enter a blend name');
      return;
    }

    if (selectedTeas.length === 0) {
      setError('Please add at least one tea to your blend');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/blends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: blendName,
          description: blendDescription,
          teas: selectedTeas,
          target_effects: []
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setBlendName('');
        setBlendDescription('');
        setSelectedTeas([]);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || 'Failed to create blend');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create blend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tea-brown-50 via-tea-sage-50 to-tea-amber-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FlaskConical size={48} className="text-tea-clay-700" />
            <h1 className="font-serif text-5xl font-bold text-tea-brown-900">Create Your Blend</h1>
          </div>
          <p className="font-sans text-xl text-tea-brown-700 max-w-2xl mx-auto">
            Craft custom tea combinations by selecting teas and adjusting their ratios, steep times, and temperatures
          </p>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center gap-2"
          >
            <Sparkles className="text-green-600" size={20} />
            <p className="text-green-800 font-medium">Blend created successfully!</p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg"
          >
            <p className="text-red-800 font-medium">{error}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Blend Details & Selected Teas */}
          <div className="space-y-6">
            {/* Blend Info */}
            <Card>
              <h2 className="font-serif text-2xl font-bold text-tea-brown-900 mb-4">Blend Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-sm font-medium text-tea-brown-700 mb-2">
                    Blend Name *
                  </label>
                  <input
                    type="text"
                    value={blendName}
                    onChange={(e) => setBlendName(e.target.value)}
                    placeholder="e.g., Morning Clarity Blend"
                    className="w-full px-4 py-3 rounded-lg border-2 border-tea-sage-300 focus:border-tea-sage-500 focus:ring-2 focus:ring-tea-sage-200 outline-none transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-tea-brown-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={blendDescription}
                    onChange={(e) => setBlendDescription(e.target.value)}
                    placeholder="Describe your blend's purpose, flavor profile, or ideal use case..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border-2 border-tea-sage-300 focus:border-tea-sage-500 focus:ring-2 focus:ring-tea-sage-200 outline-none transition-all font-sans resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Selected Teas */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-bold text-tea-brown-900">Selected Teas</h2>
                <span className="font-sans text-sm text-tea-brown-600">
                  {selectedTeas.length} tea{selectedTeas.length !== 1 ? 's' : ''}
                </span>
              </div>

              {selectedTeas.length === 0 ? (
                <div className="text-center py-8">
                  <Leaf size={48} className="mx-auto mb-3 text-tea-sage-400" />
                  <p className="font-sans text-tea-brown-600">
                    No teas selected yet. Choose from the library →
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedTeas.map((tea, index) => (
                    <motion.div
                      key={tea.tea_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-br from-tea-sage-50 to-tea-amber-50 rounded-lg border border-tea-sage-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-tea-brown-900">
                            {tea.tea_name}
                          </h3>
                          <p className="font-sans text-sm text-tea-brown-600 capitalize">
                            {tea.tea_type} tea
                          </p>
                        </div>
                        <button
                          onClick={() => removeTeaFromBlend(tea.tea_id)}
                          className="text-tea-clay-600 hover:text-tea-clay-800 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block font-sans text-xs font-medium text-tea-brown-700 mb-1">
                            Ratio %
                          </label>
                          <input
                            type="number"
                            value={Math.round(tea.ratio)}
                            onChange={(e) => updateTeaRatio(tea.tea_id, Number(e.target.value))}
                            min="0"
                            max="100"
                            className="w-full px-2 py-1 text-sm rounded border border-tea-sage-300 focus:border-tea-sage-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-xs font-medium text-tea-brown-700 mb-1 flex items-center gap-1">
                            <Clock size={12} /> Time (s)
                          </label>
                          <input
                            type="number"
                            value={tea.steep_time_sec}
                            onChange={(e) => updateTeaSteepTime(tea.tea_id, Number(e.target.value))}
                            min="30"
                            max="600"
                            step="30"
                            className="w-full px-2 py-1 text-sm rounded border border-tea-sage-300 focus:border-tea-sage-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-xs font-medium text-tea-brown-700 mb-1 flex items-center gap-1">
                            <Thermometer size={12} /> Temp (°C)
                          </label>
                          <input
                            type="number"
                            value={tea.steep_temp_c}
                            onChange={(e) => updateTeaSteepTemp(tea.tea_id, Number(e.target.value))}
                            min="60"
                            max="100"
                            step="5"
                            className="w-full px-2 py-1 text-sm rounded border border-tea-sage-300 focus:border-tea-sage-500 outline-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <Button
                    onClick={createBlend}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>Saving Blend...</>
                    ) : (
                      <>
                        <Save size={20} />
                        Save Blend
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Right: Tea Library */}
          <div>
            <Card>
              <h2 className="font-serif text-2xl font-bold text-tea-brown-900 mb-4">Tea Library</h2>
              <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
                {teas.map((tea) => {
                  const isSelected = selectedTeas.some(t => t.tea_id === tea.id);
                  return (
                    <motion.div
                      key={tea.id}
                      whileHover={{ scale: isSelected ? 1 : 1.02 }}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-tea-sage-100 border-tea-sage-400 opacity-50 cursor-not-allowed'
                          : 'bg-white border-tea-brown-200 hover:border-tea-sage-400 hover:shadow-md'
                      }`}
                      onClick={() => !isSelected && addTeaToBlend(tea)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-serif text-lg font-bold text-tea-brown-900">
                            {tea.name}
                          </h3>
                          <p className="font-sans text-sm text-tea-brown-600 capitalize mb-2">
                            {tea.type} tea
                          </p>
                          <p className="font-sans text-xs text-tea-brown-600 line-clamp-2">
                            {tea.description}
                          </p>
                        </div>
                        {!isSelected && (
                          <Plus size={24} className="text-tea-sage-600 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}