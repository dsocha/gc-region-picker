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
    top: 50px;
    right: 50px;
    bottom: 50px;
    left: 50px;
    z-index: 1000001;
  }

  .globe-control-inner {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: gray;
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
`;

export default StylesWrapper;
