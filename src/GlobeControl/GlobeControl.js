import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StylesWrapper from './GlobeControl.styles';
import { VscChromeClose } from 'react-icons/vsc';

const GlobeControl = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize, false);

    loadScene();

    return () => {
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);

  const onWindowResize = () => {
    // TODO
  };

  const loadScene = () => {
    // TODO
  };

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
          <div className='canvas' ref={canvasRef}></div>
        </div>
      </div>
    </StylesWrapper>
  );
};

GlobeControl.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default GlobeControl;
