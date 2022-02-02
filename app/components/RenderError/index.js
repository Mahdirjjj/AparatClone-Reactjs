/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * RenderError
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { errorClearAction } from 'containers/App/actions';
import { makeSelectError } from 'containers/App/selectors';

const StyledErrorContainer = styled.div`
  position: fixed;
  z-index: 1000;
  border-bottom: 2px solid #f50057;
  background: #f6d3dc;
  color: #000;
  padding: 5px;
  left: 0;
  right: 0;
  text-align: center;

  & span {
    font-size: 1rem;
    color: #f50057;
    position: absolute;
    left: 5px;
    top: 2px;
    cursor: pointer;
  }

  & span:hover {
    transform: scale(1.2, 1.2);
  }
`;

function RenderError({ error, hideError }) {
  if (!error) return null;

  console.log(error);

  setTimeout(hideError, 5000);

  return (
    <StyledErrorContainer>
      <div>{error.toString()}</div>
      <span onClick={hideError}>x</span>
    </StyledErrorContainer>
  );
}

RenderError.propTypes = {
  error: PropTypes.object,
  hideError: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    hideError: () => dispatch(errorClearAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(RenderError);
