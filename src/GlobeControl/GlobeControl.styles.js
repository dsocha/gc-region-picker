import styled from 'styled-components';

const StylesWrapper = styled.section`
  padding: 0;
  margin: 0;
  .globe-control-background {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: white;
    opacity: 0.5;
    z-index: 1000000;
  }

  .globe-control-outer {
    position: absolute;
    top: 30px;
    right: 30px;
    bottom: 30px;
    left: 30px;
    z-index: 1000001;
  }

  .globe-control-inner {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: gray;
    border: 4px solid #ff4f1f;
    border-radius: 20px;
    overflow: hidden;
  }

  .icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0.6;
    cursor: pointer;
    font-size: 2rem;
    color: #ffffff;
  }

  .icon-close:hover {
    opacity: 1;
    font-size: 2.05rem;
  }

  .canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export default StylesWrapper;
