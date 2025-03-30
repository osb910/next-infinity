'use client';

import {useCallback, useEffect, useRef} from 'react';

// Define event target types
export type Target =
  | Window
  | Document
  | HTMLElement
  | MediaQueryList
  | null
  | undefined;

// Helper type to get the correct event map based on target type
export type GetEventMap<T extends Target> = T extends Window
  ? WindowEventMap
  : T extends Document
  ? DocumentEventMap
  : T extends HTMLElement
  ? HTMLElementEventMap
  : T extends MediaQueryList
  ? MediaQueryListEventMap
  : never;

// Helper type to get event types for a target
export type EventType<T extends Target> = T extends Window
  ? keyof WindowEventMap
  : T extends Document
  ? keyof DocumentEventMap
  : T extends HTMLElement
  ? keyof HTMLElementEventMap
  : T extends MediaQueryList
  ? keyof MediaQueryListEventMap
  : string;

export interface EventListenerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

/**
 * Custom hook for handling event listeners with proper cleanup
 * @template T - Target element type (Window, Document, HTMLElement)
 * @template K - Event type
 * @param eventType - The event type to listen for
 * @param callback - The callback function to execute when the event occurs
 * @param element - The target element to attach the event listener to (default: window)
 */

const useEventListener = <
  T extends Target = Window,
  E extends EventType<T> = EventType<T>
>(
  eventType: E,
  callback: (event: GetEventMap<T>[E & keyof GetEventMap<T>]) => void,
  element?: T,
  options: EventListenerOptions = {}
): void => {
  // Memoize the callback
  const memoizedCallback = useCallback(callback, [callback]);
  const callbackRef = useRef(memoizedCallback);
  const optionsRef = useRef(options);

  // Update refs when dependencies change
  useEffect(() => {
    callbackRef.current = memoizedCallback;
    optionsRef.current = options;
  }, [memoizedCallback, options]);

  useEffect(() => {
    const targetElement = element ?? window;

    if (!targetElement?.addEventListener) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `Unable to attach event listener: ${eventType}. Target element is null or doesn't support addEventListener.`
        );
      }
      return;
    }

    // Create event listener that calls our callback current value
    const handler = (event: Event) => {
      try {
        callbackRef.current(event as GetEventMap<T>[E & keyof GetEventMap<T>]);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error in event listener callback:', error);
        }
      }
    };

    // Add event listener with options
    targetElement.addEventListener(eventType, handler, {
      ...optionsRef.current,
    });

    // Cleanup function
    return () => {
      targetElement.removeEventListener(eventType, handler, {
        ...optionsRef.current,
      });
    };
  }, [eventType, element]);
};

// Type guard
export const isEventTarget = (element: any): element is EventTarget => {
  return element && typeof element.addEventListener === 'function';
};

export default useEventListener;
