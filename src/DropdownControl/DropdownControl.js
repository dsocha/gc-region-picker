import React, { useState, Fragment } from 'react';
import Select from 'react-select';
import { VscGlobe } from 'react-icons/vsc';
import StylesWrapper from './DropdownControl.styles';
import GlobeControl from '../GlobeControl/GlobeControl';

const options = [
  { value: 'mypurecloud.com', label: 'US East (Virginia)' },
  { value: 'usw2.pure.cloud', label: 'US West (Oregon)' },
  { value: 'cac1.pure.cloud', label: 'Canada (Central)' },
  { value: 'mypurecloud.ie', label: 'Europe (Ireland)' },
  { value: 'euw2.pure.cloud', label: 'Europe (London)' },
  { value: 'mypurecloud.de', label: 'Europe (Frankfurt)' },
  { value: 'mypurecloud.jp', label: 'Asia Pacific (Tokyo)' },
  { value: 'apne2.pure.cloud', label: 'Asia Pacific (Seoul)' },
  { value: 'mypurecloud.com.au', label: 'Asia Pacific (Sydney)' }
];

const DropdownControl = () => {
  const [showGlobeControl, setShowGlobeControl] = useState(false);

  return (
    <Fragment>
      {showGlobeControl && (
        <GlobeControl
          onClose={() => {
            setShowGlobeControl(false);
          }}
        />
      )}
      <StylesWrapper>
        <div className='dropdown-control'>
          <div className='dropdown-wrapper'>
            <Select
              className='dropdown'
              options={options}
              defaultValue={options[0]}
              isClearable={false}
            />
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
