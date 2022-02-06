import { useCallback, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import Soundtracks from "@constants/Soundtracks";
import { useAppSelector } from "@store/hooks";

// object pool
const useSounds = () => {
  const soundtracks = useRef<Audio.Sound[]>(
    new Array(Soundtracks.length)
  ).current;
  const currSoundtrack = useRef<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [didFinish, setDidFinish] = useState(false);
  const areSoundsEnabled = useAppSelector((state) => state.settings.sounds);

  const playMusic = (which: number) => {
    if (!areSoundsEnabled) return;
    try {
      currSoundtrack.current = soundtracks[which];
      currSoundtrack.current.setStatusAsync({
        shouldPlay: true,
        positionMillis: 0,
        volume: 0.2,
      });
      setDidFinish(false);
    } catch (err) {
      console.log(err);
    }
  };

  const stopMusic = () => {
    if (!areSoundsEnabled) return;
    currSoundtrack.current && currSoundtrack.current.stopAsync();
  };

  useEffect(() => {
    if (!areSoundsEnabled) return;
    //load soundtracks
    try {
      (async () => {
        for (let i = 0; i < soundtracks.length; i += 1) {
          const { sound: soundtrackObject } = await Audio.Sound.createAsync(
            Soundtracks[i],
            undefined,
            ({ didJustFinish }: any) => {
              if (didJustFinish) setDidFinish(true);
            }
          );
          soundtracks[i] = soundtrackObject;
        }
        setIsLoading(false);
      })();
    } catch (err) {
      console.log(err);
    }
    return () => {
      //unload soundtracks
      for (let i = 0; i < soundtracks.length; i += 1)
        soundtracks[i] && soundtracks[i].unloadAsync();
    };
  }, []);

  return [playMusic, stopMusic, { isLoading, didFinish }] as [
    (which: number) => void,
    () => void,
    {
      isLoading: boolean;
      didFinish: boolean;
    }
  ];
};

export default useSounds;
