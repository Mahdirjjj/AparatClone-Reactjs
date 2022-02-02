/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Alert
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledAlert = styled.div`
  border: 1px solid #444;
  border-radius: 2px;
  background: #fff;
  padding: 0.2rem;
  margin: 2px 0;
  position: relative;

  & p {
    padding: 0;
    margin: 0;
    font-weight: bold;
    color: #444;
  }

  & span {
    font-size: 1rem;
    color: #444;
    position: absolute;
    left: 5px;
    top: 2px;
    cursor: pointer;
  }

  & span:hover {
    transform: scale(1.2, 1.2);
  }

  &.info {
    border-color: #5588f5 !important;

    p,
    span {
      color: #5588f5;
    }
  }

  &.success {
    border-color: #00f557;

    p,
    span {
      color: #00f557;
    }
  }

  &.error {
    border-color: #f50057;

    p,
    span {
      color: #f50057;
    }
  }
`;

function Alert({ show, message, type, onClose }) {
  const [showAlert, setShowAlert] = useState(show);

  if (showAlert || show) {
    return (
      <StyledAlert className={type}>
        <p>{message}</p>
        <span
          onClick={() => {
            setShowAlert(false);
            onClose();
          }}
        >
          x
        </span>
      </StyledAlert>
    );
  }

  return null;
}

Alert.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.oneOf(['info', 'success', 'default', 'error']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  show: true,
  type: 'default',
};

export default Alert;
