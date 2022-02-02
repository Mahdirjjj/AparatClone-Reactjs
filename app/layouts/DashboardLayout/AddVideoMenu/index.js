/**
 *
 * AddVideoMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { IconButton } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import { ROUTE_UPLOAD } from 'containers/App/routes';

function AddVideoMenu({ dispatch }) {
  return (
    <IconButton
      aria-label="Show 17 new notifications"
      color="inherit"
      size="small"
      onClick={() => dispatch(push(ROUTE_UPLOAD))}
    >
      <AddIcon />
    </IconButton>
  );
}

AddVideoMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddVideoMenu);
