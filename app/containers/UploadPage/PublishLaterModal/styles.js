import { Dialog } from '@material-ui/core';
import styled from 'styled-components';

export const PublishLaterModalWrapper = styled(Dialog)`
  h2 .MuiSvgIcon-root {
    position: absolute;
    left: 0.5em;
    top: 0.5em;
    color: #f44;
  }

  input.MuiInputBase-input.MuiInput-input {
    direction: ltr;
  }
`;
