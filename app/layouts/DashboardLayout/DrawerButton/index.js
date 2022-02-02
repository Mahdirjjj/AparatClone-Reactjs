/**
 *
 * DrawerButton
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { drawerToggleAction } from 'containers/App/actions';

const StyledButton = styled.div`
  & .MuiIconButton-root {
    padding: 7px;
  }

  & .MuiSvgIcon-root {
    color: #6f7285 !important;
  }
`;

function DrawerButton({ toggleSidebar }) {
  return (
    <StyledButton>
      <IconButton onClick={() => toggleSidebar()}>
        <MenuIcon />
      </IconButton>
    </StyledButton>
  );
}

DrawerButton.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: show => dispatch(drawerToggleAction(show)),
  };
}

const withConnect = connect(
  undefined,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(DrawerButton);
