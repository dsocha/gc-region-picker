import React from 'react';
import PropTypes from 'prop-types';
import StylesWrapper from './GlobeControl.styles';
import { VscChromeClose } from 'react-icons/vsc';

const GlobeControl = (props) => {
  return (
    <StylesWrapper>
      <div className='globe-control-background' />
      <div className='globe-control-outer'>
        <div className='globe-control-inner'>
          <VscChromeClose
            className='icon-close'
            onClick={() => {
              if (props.onClose) props.onClose();
            }}
          />
          Hello
        </div>
      </div>
    </StylesWrapper>
  );
};

GlobeControl.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default GlobeControl;
