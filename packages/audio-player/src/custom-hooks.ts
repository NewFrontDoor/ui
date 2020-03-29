import {SyntheticEvent, useRef, useEffect} from 'react';

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: Event) => void,
  element?: Window
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

    const eventListener = (event: Event): void =>
      savedHandler.current && savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}

export function useInterval(callback: () => void, delay: number): void {
  const savedCallback = useRef<typeof callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (savedCallback.current && delay !== null) {
      const id = setInterval(savedCallback.current, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
