import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Progress() {
  
  return (
    <div
      style={{ position: 'absolute',
      width: '999999999px',
      height: '999999999px',
      overflowX: 'hidden',
      overflowY: 'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      zIndex: 9999, 
      pointerEvents: 'auto', }}
    >
      <LinearProgress variant="indeterminate" color="info"/>
    </div>
  );
}
