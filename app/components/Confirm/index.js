import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmWrapper = styled(Dialog)`
  .btn {
    margin: 0.2em;
  }
`;

function Confirm({
  children,
  title,
  open,
  okTitle,
  cancelTitle,
  onOk,
  onCancel,
}) {
  return (
    <ConfirmWrapper
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="btn" onClick={onCancel} color="secondary" autoFocus>
          {cancelTitle}
        </Button>
        <Button
          className="btn"
          onClick={onOk}
          color="primary"
          variant="outlined"
        >
          {okTitle}
        </Button>
      </DialogActions>
    </ConfirmWrapper>
  );
}

Confirm.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  okTitle: PropTypes.string,
  cancelTitle: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

Confirm.defaultProps = {
  okTitle: 'تایید',
  cancelTitle: 'انصراف',
};

export default memo(Confirm);
