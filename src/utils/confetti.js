import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6'],
    });
  } catch (e) {
    console.warn('Confetti trigger error:', e);
  }
};

export const triggerMilestoneCelebration = () => {
  try {
    const end = Date.now() + 1500;
    const colors = ['#6366F1', '#EC4899', '#F59E0B'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {}
};
