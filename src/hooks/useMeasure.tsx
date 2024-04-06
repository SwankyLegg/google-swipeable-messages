import { useState, useRef, useLayoutEffect } from 'react';

function useMeasure() {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ height: 0 });

  const [ro] = useState(() => new ResizeObserver(([entry]) => {
      setBounds(entry.contentRect);
  }));

  useLayoutEffect(() => {
      if (ref.current) ro.observe(ref.current);
      return () => ro.disconnect();
  }, [ro]);

  return [{ ref }, bounds.height];
}

export default useMeasure;