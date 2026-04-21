import confetti from 'canvas-confetti';

export function fireOrangeConfetti() {
  const colors = ['#FF4D00', '#E64400', '#FFB380', '#FFFFFF'];

  // Big center burst
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors,
  });

  // Side bursts
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  }, 200);
}
