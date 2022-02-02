/**
 *
 * ReloaderMessage
 *
 */

import { Button } from '@material-ui/core';
import { RefreshOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styled from 'styled-components';

const ReloaderMessageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function ReloaderMessage({ message, reloadMessage, onReload }) {
  return (
    <ReloaderMessageWrapper>
      <p>{message}</p>
      <Button onClick={onReload}>
        <RefreshOutlined /> {reloadMessage}
      </Button>
    </ReloaderMessageWrapper>
  );
}

ReloaderMessage.propTypes = {
  message: PropTypes.string.isRequired,
  reloadMessage: PropTypes.string,
  onReload: PropTypes.func.isRequired,
};

ReloaderMessage.defaultProps = {
  reloadMessage: null,
};

export default memo(ReloaderMessage);
