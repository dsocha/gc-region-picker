import React from 'react';

import { GcRegionPicker } from 'gc-region-picker';

const App = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}
    >
      <div style={{ width: '300px' }}>
        <GcRegionPicker />
      </div>
    </div>
  );
};

export default App;
