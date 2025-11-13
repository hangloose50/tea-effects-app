'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TeaCard } from '@/components/tea/TeaCard';
import { Search, Filter } from 'lucide-react';
import axios from 'axios';
import { getDB, Tea } from '@/lib/db/indexedDB';

export default function TeasPage() {
  const [teas, setTeas] = useState<any[]>([]);
  const [filteredTeas, setFilteredTeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchTeas();
  }, []);

  useEffect(() => {
    filterTeas();
  }, [searchTerm, selectedType, teas]);

  const fetchTeas = async () => {
    try {
      const db = await getDB();

      // Try to fetch from API
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await axios.get(`${apiUrl}/api/teas`);
        const fetchedTeas = response.data.teas || [];

        // Save to IndexedDB for offline access
        await db.saveTeas(fetchedTeas);
        setTeas(fetchedTeas);
        setFilteredTeas(fetchedTeas);
      } catch (apiError) {
        console.warn('API unavailable, loading from offline storage:', apiError);

        // Load from IndexedDB when offline
        const cachedTeas = await db.getTeas();
        if (cachedTeas.length > 0) {
          setTeas(cachedTeas);
          setFilteredTeas(cachedTeas);
        }
      }
    } catch (error) {
      console.error('Error loading teas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTeas = () => {
    let filtered = teas;

    if (searchTerm) {
      filtered = filtered.filter(tea =>
        tea.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tea.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(tea => tea.type === selectedType);
    }

    setFilteredTeas(filtered);
  };

  const teaTypes = ['all', 'oolong', 'pu-erh', 'green', 'herbal'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-tea-brown-50 via-tea-clay-50 to-tea-brown-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-tea-sage-100 to-tea-amber-100 border-b border-tea-brown-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-tea-brown-900 mb-4"
          >
            Tea Library
          </motion.h1>
          <p className="font-sans text-xl text-tea-clay-700">
            Explore our curated collection of premium teas
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-tea-clay-500" size={20} />
            <input
              type="text"
              placeholder="Search teas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white border border-tea-brown-200 font-sans text-base text-tea-brown-800 placeholder-tea-clay-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-tea-sage-400 focus:border-tea-sage-400 transition-all"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={20} className="text-tea-clay-600" />
            {teaTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-sans font-medium transition-all ${
                  selectedType === type
                    ? 'bg-tea-sage-600 text-white shadow-md'
                    : 'bg-white text-tea-brown-700 border border-tea-brown-200 hover:border-tea-sage-400'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-steam">🍵</div>
            <p className="font-sans text-lg text-tea-clay-600">Loading teas...</p>
          </div>
        )}

        {/* Teas Grid */}
        {!loading && filteredTeas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeas.map((tea, index) => (
              <motion.div
                key={tea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TeaCard tea={tea} />
              </motion.div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredTeas.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-sans text-xl text-tea-clay-600 mb-2">No teas found</p>
            <p className="font-sans text-base text-tea-clay-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Tea Count */}
        {!loading && filteredTeas.length > 0 && (
          <div className="mt-8 text-center">
            <p className="font-sans text-tea-clay-600">
              Showing {filteredTeas.length} of {teas.length} teas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
