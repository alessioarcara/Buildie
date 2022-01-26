import { useRef, useEffect } from "react";

const ms_per_update = 1000 / 1;
let prevTime = performance.now();
let lag = 0;

const useGameLoop = (update: () => void, draw: () => void) => {
  const rafRef = useRef<number | null>(null);

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
    draw();
    requestAnimationFrame(gameLoop);
  };

  const start = () => {};

  const stop = () => {};

  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => {
      rafRef.current && cancelAnimationFrame(rafRef.current);
    };
  }, []);
};

export default useGameLoop;
