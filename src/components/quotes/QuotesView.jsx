import React, { useState } from 'react';
import Card from '../common/Card';
import MotivationalQuoteCard from './MotivationalQuoteCard';
import { MOTIVATIONAL_QUOTES } from '../../data/quotes';
import { Sparkles, Quote, Copy, Check, Heart, Search } from 'lucide-react';

export const QuotesView = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('studysprint_favorite_quotes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = ['All', 'Focus', 'Consistency', 'Discipline', 'Mindset', 'Success', 'Favorites'];

  const toggleFavorite = (id) => {
    const nextFavorites = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(nextFavorites);
    try {
      localStorage.setItem('studysprint_favorite_quotes', JSON.stringify(nextFavorites));
    } catch (e) {}
  };

  const handleCopy = (q) => {
    navigator.clipboard.writeText(`"${q.quote}" — ${q.author}`);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredQuotes = MOTIVATIONAL_QUOTES.filter((q) => {
    if (selectedCategory === 'Favorites' && !favorites.includes(q.id)) return false;
    if (selectedCategory !== 'All' && selectedCategory !== 'Favorites' && q.category !== selectedCategory) return false;
    if (search.trim()) {
      const query = search.toLowerCase();
      return q.quote.toLowerCase().includes(query) || q.author.toLowerCase().includes(query);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* View Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Mindset & Daily Inspiration
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Science-backed mental models, stoic discipline, and focus mantras for high achievers
        </p>
      </div>

      {/* Featured Quote Spotlight */}
      <MotivationalQuoteCard />

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              {cat === 'Favorites' ? `❤️ Favorites (${favorites.length})` : cat}
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search quotes or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Grid of quotes */}
      {filteredQuotes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400 text-sm">
          No quotes match your selected filter or favorites yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuotes.map((q) => {
            const isFav = favorites.includes(q.id);
            const isCopied = copiedId === q.id;

            return (
              <Card
                key={q.id}
                hoverEffect
                className="p-5 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {q.category}
                    </span>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleFavorite(q.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isFav ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
                        }`}
                        title={isFav ? 'Remove favorite' : 'Bookmark quote'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>

                      <button
                        onClick={() => handleCopy(q)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        title="Copy text"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                    "{q.quote}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {q.author}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {q.title}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuotesView;
