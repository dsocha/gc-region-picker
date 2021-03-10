# gc-region-picker for ReactJS

> Pick your Genesys Cloud region from a 3D globe.

[![NPM](https://img.shields.io/npm/v/gc-region-picker.svg)](https://www.npmjs.com/package/gc-region-picker)

## Install

```bash
yarn add gc-region-picker
```

```bash
npm install --save gc-region-picker
```

## Usage

```jsx
import React, { useState } from 'react';
import { GcRegionPicker } from 'gc-region-picker';

const App = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  return (
    <div style={{ padding: '15px' }}>
      <GcRegionPicker
        onSelect={(region) => {
          setSelectedRegion(region);
        }}
      />
      <div style={{ marginTop: '15px' }}>{selectedRegion}</div>
    </div>
  );
};

export default App;
```

## License

MIT © [dsocha](https://github.com/dsocha)
