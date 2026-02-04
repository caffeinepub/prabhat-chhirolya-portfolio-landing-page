import { useEffect, useState } from 'react';

/**
 * Hook that triggers a re-measure tick on window resize and element size changes.
 * Returns a counter that increments on each layout change, allowing dependent
 * calculations to re-run without affecting existing transitions/animations.
 */
export function useModeSelectorRemeasure(
  elementRefs: Array<React.RefObject<HTMLElement | null>>
): number {
  const [remeasureTick, setRemeasureTick] = useState(0);

  useEffect(() => {
    // Trigger re-measure on window resize
    const handleResize = () => {
      setRemeasureTick((prev) => prev + 1);
    };

    window.addEventListener('resize', handleResize);

    // Set up ResizeObserver for each element ref
    const observers: ResizeObserver[] = [];
    
    elementRefs.forEach((ref) => {
      if (ref.current) {
        const observer = new ResizeObserver(() => {
          setRemeasureTick((prev) => prev + 1);
        });
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [elementRefs]);

  return remeasureTick;
}
