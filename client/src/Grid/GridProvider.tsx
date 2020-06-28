import React, {useCallback, useEffect, useRef, useState} from 'react';
import GridContext from './GridContext';


const useElementSize = (): [React.RefObject<HTMLDivElement>, number] => {
  const ref = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<number>(0)

  const handleResize = useCallback(() => {
    if (ref.current) {
      setSize(Math.min(ref.current.clientHeight, ref.current.clientWidth));
    }
  }, []);

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return [ref, size];
}


const GridProvider: React.FC = ({children}) => {
  const [ref, size] = useElementSize();

  return (
    <div ref={ref}>
      <GridContext.Provider value={{ pixelSize: size }}>
        {children}
      </GridContext.Provider>
    </div>
  );
}

export default GridProvider;
