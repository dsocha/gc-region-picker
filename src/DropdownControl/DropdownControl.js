import React, { useState, Fragment } from 'react';
import Select from 'react-select';
import { VscGlobe } from 'react-icons/vsc';
import StylesWrapper from './DropdownControl.styles';
import GlobeControl from '../GlobeControl/GlobeControl';

const regionList = [
  { value: 'mypurecloud.com', label: 'US East (Virginia)', lat: 37.926868, lon: -78.024902 },
  { value: 'usw2.pure.cloud', label: 'US West (Oregon)', lat: 44.0, lon: -120.5 },
  { value: 'cac1.pure.cloud', label: 'Canada (Central)', lat: 45.508888, lon: -73.561668 },
  { value: 'mypurecloud.ie', label: 'Europe (Ireland)', lat: 53.35014, lon: -6.266155 },
  { value: 'euw2.pure.cloud', label: 'Europe (London)', lat: 51.509865, lon: -0.118092 },
  { value: 'mypurecloud.de', label: 'Europe (Frankfurt)', lat: 50.110924, lon: 8.682127 },
  { value: 'mypurecloud.jp', label: 'Asia Pacific (Tokyo)', lat: 35.652832, lon: 139.839478 },
  { value: 'apne2.pure.cloud', label: 'Asia Pacific (Seoul)', lat: 37.5326, lon: 127.024612 },
  { value: 'mypurecloud.com.au', label: 'Asia Pacific (Sydney)', lat: -33.865143, lon: 151.2099 }
];

const DropdownControl = () => {
  const [showGlobeControl, setShowGlobeControl] = useState(false);

  return (
    <Fragment>
      {showGlobeControl && (
        <GlobeControl
          regionList={regionList}
          onClose={() => {
            setShowGlobeControl(false);
          }}
        />
      )}
      <StylesWrapper>
        <div className='dropdown-control'>
          <div className='dropdown-wrapper'>
            <Select className='dropdown' options={regionList} defaultValue={regionList[0]} isClearable={false} />
          </div>
          <div className='icon-wrapper'>
            <VscGlobe
              className='icon'
              onClick={() => {
                setShowGlobeControl(true);
              }}
            />
          </div>
        </div>
      </StylesWrapper>
    </Fragment>
  );
};

export default DropdownControl;
