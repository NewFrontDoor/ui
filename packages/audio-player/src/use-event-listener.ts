import {SyntheticEvent, useRef, useEffect} from 'react';

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: Event) => void,
  element?: Window | Document
): void;

export function useEventListener<
  K extends keyof HTMLMediaElementEventMap,
  T extends HTMLMediaElement
>(
  eventName: K,
  handler: (event: SyntheticEvent<T>) => void,
  element?: HTMLMediaElement
): void;

export function useEventListener(
  eventName: string,
  handler: (event: any) => void,
  element: EventTarget = window
): void {
  const savedHandler = useRef<typeof handler>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element?.addEventListener;
    if (!isSupported) {
      return;
    }

    const eventListener = (event: Event): void => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    element.addEventListener(eventName, eventListener, false);
    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}
