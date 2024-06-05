declare module 'use-sound' {
  // Define a basic interface for Howl or import it if you have types from 'howler.js'
  interface Howl {
    play: (spriteOrId?: string | number) => number;
    pause: (id?: number) => void;
    stop: (id?: number) => void;
    mute: (muted: boolean, id?: number) => void;
    volume: (volume?: number, id?: number) => number | void;
    // You can extend this with more methods from howler.js as needed
  }

  // Basic configuration and playback options for useSound
  interface UseSoundOptions {
    volume?: number;
    playbackRate?: number;
    interrupt?: boolean;
    soundEnabled?: boolean;
    sprite?: Record<string, [number, number]>;
    loop?: boolean;
    onend?: () => void;
    onload?: () => void;
    onstop?: () => void;
    onplay?: () => void;
    onpause?: () => void;
    onloaderror?: (id: string, error: Error) => void;
    onplayerror?: (id: string, error: Error) => void;
    html5?: boolean;
    format?: string | string[];
    xhr?: {
      method?: string;
      headers?: Record<string, string>;
      withCredentials?: boolean;
    };
  }

  // The return type of useSound hook, providing handlers and properties
  interface SoundReturned {
    sound: Howl | null; // 'Howl' is the sound object from Howler.js library
    stop: () => void;
    pause: () => void;
    play: () => void;
    isPlaying: boolean;
    duration: number | null; // Duration of the sound in seconds
  }

  // The useSound hook itself
  // Returns a tuple with play function and other control functions/properties
  export default function useSound(
    url: string,
    options?: UseSoundOptions
  ): [() => void, SoundReturned];
}
