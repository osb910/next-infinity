import {useState, useEffect} from 'react';

const useFullscreen = (elementId: string) => {
  const element = document?.getElementById(elementId) as HTMLElement;
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    document.fullscreenElement
      ? document.exitFullscreen()
      : element?.requestFullscreen();
  };

  useEffect(() => {
    const toggleFullscreen = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', toggleFullscreen);

    return () =>
      document.removeEventListener('fullscreenchange', toggleFullscreen);
  }, []);

  return [isFullscreen, toggleFullscreen];
};

export default useFullscreen;
