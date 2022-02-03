import { useRef, useMemo, useLayoutEffect } from "react";

const useGameLoop = (speed: number, update: () => void, draw: () => void) => {
  const rafRef = useRef<number | null>(null);
  const ms_per_update = useMemo(() => 1000 / speed, [speed]);
  const prevTimeRef = useRef(performance.now());
  const lagRef = useRef(0);

  const gameLoop = (time: number) => {
    const elapsedTimeBetweenFrames = time - prevTimeRef.current;
    prevTimeRef.current = time;
    lagRef.current += elapsedTimeBetweenFrames;
    let loops = 0;

    while (lagRef.current >= ms_per_update) {
      // update step
      update();
      lagRef.current -= ms_per_update;
      // sanity check
      if (++loops > 240) {
        lagRef.current = 0;
        break;
      }
    }

    // draw step
    // unnecessary to draw if there aren't updates yet
    if (loops) draw();
    rafRef.current = requestAnimationFrame(gameLoop);
  };

  const start = () => {
    rafRef.current = requestAnimationFrame(gameLoop);
  };

  const stop = () => {
    rafRef.current && cancelAnimationFrame(rafRef.current);
  };

  return { start, stop };
};

export default useGameLoop;
