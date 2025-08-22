import { useState, useEffect, useCallback } from 'react';

interface WindowDimensions {
    width: number;
    height: number;
}

function getWindowDimensions(): WindowDimensions {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

// Optimized hook for window dimensions with debounce
export const useWindowDimensions = (debounceMs: number = 100) => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleResize = useCallback(() => {
        // Clear previous timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set new timeout for debouncing
        const newTimeoutId = setTimeout(() => {
            setWindowDimensions(getWindowDimensions());
        }, debounceMs);

        setTimeoutId(newTimeoutId);
    }, [debounceMs, timeoutId]);

    useEffect(() => {
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [handleResize, timeoutId]);

    return windowDimensions;
};

export default useWindowDimensions;
