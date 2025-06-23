import { useState, useCallback, useRef, useEffect } from "react";
import { useDebounce } from "./useDebounce";

interface ScrollPosition {
  scrollY: number;
  winHeight: number;
}

interface UseScrollHandlerOptions {
  onScroll: (scrollY: number, winHeight: number) => void;
  debounceMs?: number;
  threshold?: number;
}

export const useScrollHandler = ({
  onScroll,
  debounceMs = 100,
  threshold = 5,
}: UseScrollHandlerOptions) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    winHeight: window.innerHeight,
  });

  const debouncedScrollPosition = useDebounce(scrollPosition, debounceMs);
  const debouncedHandleScroll = useRef<number | null>(null);
  const lastProcessedScroll = useRef<ScrollPosition>({
    scrollY: 0,
    winHeight: 0,
  });

  const debouncedScrollHandler = useCallback(
    (scrollY: number, winHeight: number) => {
      const scrollDiff = Math.abs(
        scrollY - lastProcessedScroll.current.scrollY
      );
      const heightDiff = Math.abs(
        winHeight - lastProcessedScroll.current.winHeight
      );

      if (scrollDiff < threshold && heightDiff < threshold) {
        return;
      }

      if (debouncedHandleScroll.current) {
        clearTimeout(debouncedHandleScroll.current);
      }

      debouncedHandleScroll.current = window.setTimeout(() => {
        lastProcessedScroll.current = { scrollY, winHeight };
        onScroll(scrollY, winHeight);
      }, 50);
    },
    [onScroll, threshold]
  );

  const handleScroll = useCallback(() => {
    setScrollPosition({
      scrollY: window.scrollY,
      winHeight: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (debouncedHandleScroll.current) {
        clearTimeout(debouncedHandleScroll.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    debouncedScrollHandler(
      debouncedScrollPosition.scrollY,
      debouncedScrollPosition.winHeight
    );
  }, [debouncedScrollPosition, debouncedScrollHandler]);
};
