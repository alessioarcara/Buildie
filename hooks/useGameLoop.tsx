import { useRef, useEffect, useMemo, useLayoutEffect } from "react";

// const ms_per_update = 1000 / 1;
let prevTime = performance.now();
let lag = 0;

const useGameLoop = (speed: number, update: () => void, draw: () => void) => {
  const rafRef = useRef<number | null>(null);
  const ms_per_update = useMemo(() => 1000 / speed, [speed]);

  const gameLoop = (time: number) => {
    const elapsedTimeBetweenFrames = time - prevTime;
    prevTime = time;
    lag += elapsedTimeBetweenFrames;
    let loops = 0;

    // input step
    // processInput()
    while (lag >= ms_per_update) {
      // update step
      update();
      lag -= ms_per_update;
      // sanity check
      if (++loops > 240) {
        lag = 0;
        break;
      }
    }

    // draw step
    // unnecessary to draw if there aren't updates yet
    // interpolate: lag / ms_per_update
    if (loops) draw();
    requestAnimationFrame(gameLoop);
  };

  const start = () => {};

  const stop = () => {};

  useLayoutEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => {
      rafRef.current && cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);
};

export default useGameLoop;
