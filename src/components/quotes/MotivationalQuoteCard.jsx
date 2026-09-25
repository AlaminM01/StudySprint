import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Quote, Shuffle, Copy, Check, Sparkles, Heart } from 'lucide-react';
import { MOTIVATIONAL_QUOTES } from '../../data/quotes';

export const MotivationalQuoteCard = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('studysprint_favorite_quotes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const quote = MOTIVATIONAL_QUOTES[currentIndex] || MOTIVATIONAL_QUOTES[0];
  const isFavorite = favorites.includes(quote.id);

  const handleShuffle = () => {
    const nextIdx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setCurrentIndex(nextIdx);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.quote}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = () => {
    const nextFavorites = isFavorite
      ? favorites.filter((id) => id !== quote.id)
      : [...favorites, quote.id];
    setFavorites(nextFavorites);
    try {
      localStorage.setItem('studysprint_favorite_quotes', JSON.stringify(nextFavorites));
    } catch (e) {}
  };

  return (
    <Card glow className={`p-6 sm:p-8 relative overflow-hidden ${className}`}>
      {/* Background watermark quote icon */}
      <Quote className="absolute right-4 bottom-4 w-32 h-32 text-indigo-500/5 dark:text-indigo-400/5 pointer-events-none -rotate-12" />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        {/* Top category & actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{quote.category} Wisdom</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-xl transition-colors ${
                isFavorite
                  ? 'text-rose-500 bg-rose-500/10'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            <Button
              variant="outline"
              size="sm"
              icon={Shuffle}
              onClick={handleShuffle}
              className="text-xs"
            >
              Shuffle
            </Button>
          </div>
        </div>

        {/* Big inspirational quote text */}
        <blockquote className="space-y-3">
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed italic">
            "{quote.quote}"
          </p>
          <footer className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-indigo-500 rounded-full" />
            <cite className="not-italic text-sm font-bold text-slate-900 dark:text-white">
              {quote.author}
            </cite>
            <span className="text-xs text-slate-400">• {quote.title}</span>
          </footer>
        </blockquote>
      </div>
    </Card>
  );
};

export default MotivationalQuoteCard;
