import styled, { createGlobalStyle, css } from 'styled-components';

const btnStyles = css`
  .btn {
    border-radius: 15px;
    padding: 0.7em 1em;
    margin: 0 0.2em;

    &.btn-accept:not(:disabled) {
      background: #05a3e8;
      color: #fff;

      :hover {
        opacity: 0.8;
      }
    }

    &.btn-cancel:not(:disabled) {
      background: #df0f50;
      color: #fff;

      :hover {
        opacity: 0.8;
      }
    }
  }
`;

const inputStyles = css`
  .input {
    width: 100%;
    resize: none;
  }

  .inputGroup {
    margin-bottom: 1.5em;

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5em;
      color: #484b62;
    }

    &.hasAppend {
      position: relative;

      .MuiInputBase-root > input {
        padding-left: 5.2em;
      }

      .append {
        position: absolute;
        left: -3px;
        height: 3.5em;
        border-radius: 0.5em !important;
        border-bottom-right-radius: 0 !important;
        border-top-right-radius: 0 !important;
        width: 6em;
      }
    }
  }
`;

const textStyles = css`
  .text-left {
    &,
    input {
      text-align: left;
      direction: ltr;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 14px;
    color: #6f7285;
  }

  * {
    font-family: dana !important;
  }



  #app {
    background-color: #fff;
    background-size: cover;
    min-height: 100%;
    min-width: 100%;
  }

  #app, body{
    ${btnStyles}

    ${inputStyles}

    ${textStyles}

  }

  [role="presentation"] ul.MuiList-root{
    max-height: 300px;
  }

  .hidden{
    display:none;
  }
`;

export const InputWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  label {
    font-size: 0.8em;
    color: #888;
  }
`;

export const TwoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > :not(.space) {
    flex: 1;
  }

  :not(:last-of-type) {
    margin-bottom: 1.5em;
  }

  .space {
    width: 1em;
  }
`;

export default GlobalStyle;
