'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BookOpen, Star, Calendar, Trash2, Check, X } from 'lucide-react';
import { getDB, JournalEntry, Tea } from '@/lib/db/indexedDB';
import { Button } from '@/components/ui/Button';

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [teas, setTeas] = useState<Tea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewEntry, setShowNewEntry] = useState(false);

  // New entry form state
  const [selectedTeaId, setSelectedTeaId] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [brewingNotes, setBrewingNotes] = useState('');
  const [effectsExperienced, setEffectsExperienced] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const db = await getDB();
      const [journalEntries, allTeas] = await Promise.all([
        db.getJournalEntries(),
        db.getTeas()
      ]);

      setEntries(journalEntries);
      setTeas(allTeas);
    } catch (error) {
      console.error('Error loading journal data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTeaId || rating === 0) {
      alert('Please select a tea and provide a rating');
      return;
    }

    try {
      const db = await getDB();
      const selectedTea = teas.find(t => t.id === selectedTeaId);

      const newEntry: JournalEntry = {
        id: `journal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        tea_id: selectedTeaId,
        tea_name: selectedTea?.name || 'Unknown Tea',
        rating,
        notes,
        effects_experienced: effectsExperienced,
        brewing_notes: brewingNotes,
        created_at: new Date().toISOString(),
        synced: false
      };

      await db.saveJournalEntry(newEntry);

      // Reset form
      setSelectedTeaId('');
      setRating(0);
      setNotes('');
      setBrewingNotes('');
      setEffectsExperienced([]);
      setShowNewEntry(false);

      // Reload entries
      await loadData();
    } catch (error) {
      console.error('Error saving journal entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const db = await getDB();
      await db.deleteJournalEntry(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-tea-brown-50 via-tea-clay-50 to-tea-brown-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-tea-sage-100 to-tea-amber-100 border-b border-tea-brown-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="font-serif text-5xl font-bold text-tea-brown-900 mb-2">
                <BookOpen className="inline-block mr-3 mb-2" size={48} />
                Tea Journal
              </h1>
              <p className="font-sans text-xl text-tea-clay-700">
                Record your tea experiences and track your favorites
              </p>
            </div>
            <Button
              onClick={() => setShowNewEntry(!showNewEntry)}
              variant="primary"
              className="!bg-tea-sage-600 hover:!bg-tea-sage-700"
            >
              <Plus size={20} className="mr-2" />
              New Entry
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* New Entry Form */}
        <AnimatePresence>
          {showNewEntry && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="card-organic !bg-white">
                <form onSubmit={handleSubmitEntry} className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-tea-brown-900">
                    New Journal Entry
                  </h2>

                  {/* Tea Selection */}
                  <div>
                    <label className="block font-sans font-medium text-tea-brown-800 mb-2">
                      Select Tea
                    </label>
                    <select
                      value={selectedTeaId}
                      onChange={(e) => setSelectedTeaId(e.target.value)}
                      className="input"
                      required
                    >
                      <option value="">Choose a tea...</option>
                      {teas.map((tea) => (
                        <option key={tea.id} value={tea.id}>
                          {tea.name} ({tea.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block font-sans font-medium text-tea-brown-800 mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            size={32}
                            className={star <= rating ? 'fill-tea-amber-500 text-tea-amber-500' : 'text-tea-brown-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tasting Notes */}
                  <div>
                    <label className="block font-sans font-medium text-tea-brown-800 mb-2">
                      Tasting Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="input min-h-[100px]"
                      placeholder="Describe the flavor, aroma, and your overall experience..."
                      required
                    />
                  </div>

                  {/* Brewing Notes */}
                  <div>
                    <label className="block font-sans font-medium text-tea-brown-800 mb-2">
                      Brewing Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={brewingNotes}
                      onChange={(e) => setBrewingNotes(e.target.value)}
                      className="input"
                      placeholder="e.g., 185°F for 3 minutes..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowNewEntry(false)}
                    >
                      <X size={18} className="mr-2" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="!bg-tea-sage-600 hover:!bg-tea-sage-700"
                    >
                      <Check size={18} className="mr-2" />
                      Save Entry
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-steam">🍵</div>
            <p className="font-sans text-lg text-tea-clay-600">Loading journal...</p>
          </div>
        )}

        {/* Journal Entries */}
        {!loading && entries.length > 0 && (
          <div className="space-y-6">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-organic !bg-white hover:shadow-organic-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-tea-brown-900 mb-1">
                      {entry.tea_name}
                    </h3>
                    <div className="flex items-center gap-2 text-tea-clay-600 font-sans text-sm">
                      <Calendar size={16} />
                      <span>{formatDate(entry.created_at)}</span>
                      {!entry.synced && (
                        <span className="badge-amber ml-2">
                          Offline
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          className={star <= entry.rating ? 'fill-tea-amber-500 text-tea-amber-500' : 'text-tea-brown-300'}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-tea-clay-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-sans font-semibold text-tea-brown-800 mb-1">
                      Tasting Notes
                    </h4>
                    <p className="font-sans text-tea-brown-700 leading-relaxed">
                      {entry.notes}
                    </p>
                  </div>

                  {entry.brewing_notes && (
                    <div>
                      <h4 className="font-sans font-semibold text-tea-brown-800 mb-1">
                        Brewing Notes
                      </h4>
                      <p className="font-sans text-tea-brown-700">
                        {entry.brewing_notes}
                      </p>
                    </div>
                  )}

                  {entry.effects_experienced && entry.effects_experienced.length > 0 && (
                    <div>
                      <h4 className="font-sans font-semibold text-tea-brown-800 mb-2">
                        Effects Experienced
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {entry.effects_experienced.map((effect, i) => (
                          <span key={i} className="badge-sage">
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && entries.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📖</div>
            <p className="font-sans text-xl text-tea-clay-600 mb-2">
              Your journal is empty
            </p>
            <p className="font-sans text-base text-tea-clay-500 mb-6">
              Start recording your tea experiences to build your personal tea diary
            </p>
            <Button
              onClick={() => setShowNewEntry(true)}
              variant="primary"
              className="!bg-tea-sage-600 hover:!bg-tea-sage-700"
            >
              <Plus size={20} className="mr-2" />
              Create First Entry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
