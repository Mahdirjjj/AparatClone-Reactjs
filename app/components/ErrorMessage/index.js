/**
 *
 * ErrorMessage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Close as CloseIcon } from '@material-ui/icons';

const ErrorMessageWrapper = styled.div`
  position: relative;
  border: 2px solid #e59090;
  color: #961010;
  background: #faa;
  padding: 1em;
  margin: 1em;

  .closeButton {
    position: absolute;
    cursor: pointer;
    color: #961010;
    left: 0.5em;
    top: 0.6em;
  }
`;

const STATUSES = {
  404: 'آیتم مورد نظر یافت نشد',
};

function renderError(error, options, forceMessage) {
  if (forceMessage) {
    return forceMessage;
  }

  if (error.response) {
    if (options[error.response.status]) {
      return options[error.response.status];
    }

    if (STATUSES[error.response.status]) {
      return STATUSES[error.response.status];
    }
  }

  if (options.default) {
    return options.default;
  }

  return 'خطایی به وجود آمده است';
}

function ErrorMessage({ error, options, closeable, forceMessage }) {
  const [show, setShow] = useState(true);

  return show ? (
    <ErrorMessageWrapper>
      <div className="errorMessage">
        {renderError(error, options, forceMessage)}

        {closeable && (
          <CloseIcon className="closeButton" onClick={() => setShow(false)} />
        )}
      </div>
    </ErrorMessageWrapper>
  ) : null;
}

ErrorMessage.propTypes = {
  options: PropTypes.object,
  closeable: PropTypes.bool,
  forceMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  error: PropTypes.object.isRequired,
};

ErrorMessage.defaultProps = {
  options: {},
  forceMessage: null,
  closeable: true,
};

export default memo(ErrorMessage);
