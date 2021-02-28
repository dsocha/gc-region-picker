import styled from 'styled-components'

const StylesWrapper = styled.section`
  .dropdown-control {
    max-width: 400px;
    display: flex;
  }

  .dropdown-wrapper {
    flex: 1;
  }

  .dropdown {
    width: 100%;
  }

  .icon-wrapper {
    margin-left: 10px;
    width: 40px;
    text-align: center;
  }

  .icon {
    line-height: 100%;
    opacity: 0.6;
    cursor: pointer;
    font-size: 1.8rem;
    height: 100%;
    color: #ff4f1f;
  }

  .icon:hover {
    opacity: 1;
    font-size: 1.85rem;
  }
`

export default StylesWrapper
