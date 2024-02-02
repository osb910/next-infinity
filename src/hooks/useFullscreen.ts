import {useState, useEffect} from 'react';

const useFullscreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const toggleFullScreen = () =>
      setIsFullScreen(!!document.fullscreenElement);

    document.addEventListener('fullscreenchange', toggleFullScreen);

    return () =>
      document.removeEventListener('fullscreenchange', toggleFullScreen);
  }, []);

  return isFullScreen;
};

export default useFullscreen;
