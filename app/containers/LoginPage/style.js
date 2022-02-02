import { Grid } from '@material-ui/core';
import bgImage from 'images/bg.jpg';
import styled from 'styled-components';

export const LoginWrapper = styled(Grid)`
  background-image: url(${bgImage});
  display: flex;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  margin: auto;

  .wrapper {
    max-width: 400px;
  }

  .actionArea {
    border-bottom: 1px solid #eee;
    padding: 25px 16px;
  }

  .label {
    height: 30px;
    line-height: 30px;
  }

  .logo {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .backButton {
    margin-bottom: 16px;
    display: inline-block;
    padding-right: 20px;
  }

  .arrowIcon {
    font-size: 14px;
    margin-left: 10px;
    display: inline-block;
    height: 20px;
    position: absolute;
    right: 5px;
  }

  .formInput {
    padding: 0 2px;
    display: flex;
    min-width: 100%;
    align-items: center;
    height: 28px;
    margin-top: 8px;
  }

  input: {
    margin-left: 8px;
    flex: 1;
  }

  .divider {
    width: 1px;
    height: 20px;
    margin: 4px;
  }

  .link {
    cursor: pointer;
  }

  .inputIcon {
    color: #ccc;
    margin-left: 8px;
  }
`;
