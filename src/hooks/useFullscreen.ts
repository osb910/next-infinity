import {useState, useEffect} from 'react';

const useFullscreen = (elementId: string) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const toggleFullscreen = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', toggleFullscreen);

    return () =>
      document.removeEventListener('fullscreenchange', toggleFullscreen);
  }, []);

  if (!document) return [false, () => {}];

  const element = document?.getElementById(elementId) as HTMLElement;

  const toggleFullscreen = () => {
    document.fullscreenElement
      ? document.exitFullscreen()
      : element?.requestFullscreen();
  };

  return [isFullscreen, toggleFullscreen];
};

export default useFullscreen;
