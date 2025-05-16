import { useEffect } from "react";
import confetti from "canvas-confetti";

const ConfettiEffect = ({ isBuyed }: any) => {
  console.log("isBuyed", isBuyed);
  useEffect(() => {
    function randomInRange(min: any, max: any) {
      return Math.random() * (max - min) + min;
    }

    if (isBuyed) {
      const duration = 15 * 1000; // 20 saniye
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 700); // Her 1 saniyede bir patlayacak

      return () => clearInterval(interval); // Temizlik
    }
  }, [isBuyed]);

  return null;
};

export default ConfettiEffect;
