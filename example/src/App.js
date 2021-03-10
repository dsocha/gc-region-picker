import React, { useState } from 'react';

import { GcRegionPicker } from 'gc-region-picker';

const App = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ width: '300px' }}>
        <div style={{ opacity: '0.3', fontSize: '2.0rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '100px' }}>GC Region Picker Demo</div>
        </div>
        <GcRegionPicker
          onSelect={(region) => {
            setSelectedRegion(region);
          }}
        />
        <div style={{ opacity: '0.3', fontSize: '0.8rem', textAlign: 'center' }}>
          <div style={{ marginTop: '100px' }}>Currently selected is:</div>
          <div style={{ marginTop: '5px' }}>{selectedRegion}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
