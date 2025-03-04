import { DependencyList, useEffect, useRef } from 'react';

type Delay = number | null;
type Handler = (...args: never[]) => void;

export function useInterval(callback: Handler, delay: Delay, deps?: DependencyList) {
    const savedCallbackRef = useRef<Handler>();

    useEffect(() => {
        savedCallbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        function handler() {
            savedCallbackRef.current?.();
        }

        if (delay !== null) {
            const intervalId = setInterval(handler, delay);
            return () => clearInterval(intervalId);
        }
    }, [delay, deps]);
}
