// Web Audio API Synthesizer for notifications and ambient focus audio
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.ambientSource = null;
    this.ambientGain = null;
    this.isMuted = false;
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Play pleasant chime on Pomodoro completion
  playCompletionChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // High-pitched pleasant chord: C5, E5, G5, C6
      const freqs = [523.25, 659.25, 783.99, 1046.5];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1.3);
      });
    } catch (e) {
      console.warn('Audio chime playback error:', e);
    }
  }

  // Play micro click / tick
  playTick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  // Generate synthetic ambient sounds (rain, white noise, binaural beats)
  startAmbient(type = 'whitenoise', volume = 0.5) {
    this.stopAmbient();
    if (type === 'none' || this.isMuted) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      if (type === 'whitenoise') {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      } else if (type === 'rain') {
        // Pink-ish filtered noise with droplet variations
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.12;
        }
      } else if (type === 'binaural') {
        // 220Hz + 230Hz (10Hz Alpha wave for calm focus)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.frequency.value = 220;
        osc2.frequency.value = 230;
        gain.gain.value = volume * 0.08;
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start();
        osc2.start();
        this.ambientSource = {
          stop: () => {
            try {
              osc1.stop();
              osc2.stop();
            } catch (e) {}
          },
        };
        return;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.value = type === 'rain' ? 800 : 1000;

      const gainNode = ctx.createGain();
      gainNode.gain.value = volume * 0.15;
      this.ambientGain = gainNode;

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      whiteNoise.start();
      this.ambientSource = whiteNoise;
    } catch (e) {
      console.warn('Ambient sound synthesis error:', e);
    }
  }

  setAmbientVolume(vol) {
    if (this.ambientGain) {
      try {
        this.ambientGain.gain.setValueAtTime(vol * 0.15, this.audioCtx.currentTime);
      } catch (e) {}
    }
  }

  stopAmbient() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
      } catch (e) {}
      this.ambientSource = null;
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted) {
      this.stopAmbient();
    }
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
