import React from 'react';

interface GridState {
  pixelSize: number;
}

const GridContext = React.createContext<GridState>({pixelSize: 400});

if (process.env.NODE_ENV !== 'production') {
  GridContext.displayName = 'GridContext';
}

export default GridContext;
