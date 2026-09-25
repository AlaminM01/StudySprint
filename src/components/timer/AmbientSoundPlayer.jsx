import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, CloudRain, Wind, Radio, Sliders, Waves } from 'lucide-react';
import Card from '../common/Card';
import soundEngine from '../../utils/soundSynth';

export const AmbientSoundPlayer = ({ isMuted = false }) => {
  const [activeSound, setActiveSound] = useState('none');
  const [volume, setVolume] = useState(0.5);

  const sounds = [
    { id: 'none', label: 'Off', icon: VolumeX },
    { id: 'rain', label: 'Rain', icon: CloudRain },
    { id: 'whitenoise', label: 'White Noise', icon: Wind },
    { id: 'binaural', label: 'Alpha Waves', icon: Radio },
  ];

  const handleSelectSound = (soundId) => {
    setActiveSound(soundId);
    if (soundId === 'none' || isMuted) {
      soundEngine.stopAmbient();
    } else {
      soundEngine.startAmbient(soundId, volume);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setAmbientVolume(val);
  };

  useEffect(() => {
    if (isMuted) {
      soundEngine.stopAmbient();
    } else if (activeSound !== 'none') {
      soundEngine.startAmbient(activeSound, volume);
    }
    return () => soundEngine.stopAmbient();
  }, [isMuted]);

  return (
    <Card className="p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Waves className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Binaural & Ambient Soundscapes
            </h4>
            <p className="text-[11px] text-slate-400">
              Synthesized offline audio to enhance deep concentration
            </p>
          </div>
        </div>

        {/* Volume Slider */}
        {activeSound !== 'none' && !isMuted && (
          <div className="flex items-center gap-2 max-w-[140px]">
            <Volume2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Sound Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {sounds.map((snd) => {
          const Icon = snd.icon;
          const isSelected = activeSound === snd.id;

          return (
            <button
              key={snd.id}
              onClick={() => handleSelectSound(snd.id)}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{snd.label}</span>
              {isSelected && snd.id !== 'none' && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default AmbientSoundPlayer;
