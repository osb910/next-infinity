import {useState, useEffect} from 'react';
import {TIME} from '@/constants/numbers';

export type FullscreenOptions = {
  id?: string;
  useMaximize?: boolean;
  delay?: number;
};

const useFullscreen = ({
  id,
  useMaximize = false,
  delay = TIME.goldenSec / 4,
}: FullscreenOptions) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const toggleFullscreen = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
      if (useMaximize && !isFull) {
        setTimeout(() => setIsMaximized(isFull), delay);
      }
    };
    document.addEventListener('fullscreenchange', toggleFullscreen);

    return () =>
      document.removeEventListener('fullscreenchange', toggleFullscreen);
  }, [useMaximize, delay]);

  if (!document)
    return {
      isFullscreen: false,
      isMaximized: false,
      toggleFullscreen: () => {
        return;
      },
    };

  const element = id ? document.getElementById(id) : document.body;

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (useMaximize) {
        setIsMaximized(true);
        setTimeout(() => element?.requestFullscreen(), delay);
      } else {
        element?.requestFullscreen();
      }
    }
  };

  return {isFullscreen, isMaximized, toggleFullscreen};
};

export default useFullscreen;
