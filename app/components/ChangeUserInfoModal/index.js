/**
 *
 * ChangeUserInfoModal
 *
 */

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputBase,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  updateChannelUserInfoAction,
  updateChannelUserInfoClearAction,
  updateChannelUserInfoConfirmAction,
} from 'containers/App/actions';
import {
  makeSelectChannelUserInfoUpdate,
  makeSelectChannelUserInfoUpdateConfirm,
} from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Wrapper = styled(Dialog)`
  .MuiDialogContent-root {
    width: 500px;
    max-width: 100%;
  }

  .MuiButtonBase-root {
    margin: 0 0.25em;
  }
`;

const titles = {
  email: 'ایمیل',
  mobile: 'موبایل',
  password: 'گذرواژه',
};

function ChangeUserInfoModal({
  type,
  value,
  updateChannelUserInfoData,
  updateChannelUserInfoConfirmData,
  onClose,
  handleUpdateChannelUserInfo,
  handleClearUpdateChannelUserInfo,
  handleUpdateChannelUserInfoConfirmation,
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [oldPassword, setOldPassword] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const isPassword = type === 'password';
  const hasUpdated = !!updateChannelUserInfoData.data;
  const isLoading = !!updateChannelUserInfoData.params;
  const isLoadingLoadingConfirmCode = !!updateChannelUserInfoConfirmData.params;

  useEffect(() => {
    if (hasUpdated && isPassword) {
      handleClose();
    }
  }, [updateChannelUserInfoData.data]);

  useEffect(() => {
    if (updateChannelUserInfoConfirmData.data) {
      handleClose();
    }
  }, [updateChannelUserInfoConfirmData.data]);

  function handleClose() {
    handleClearUpdateChannelUserInfo();
    onClose();
  }

  function handleSubmitChange() {
    handleUpdateChannelUserInfo({
      [type]: currentValue,
      oldPassword,
    });
  }

  function handleSubmitConfirmCode() {
    handleUpdateChannelUserInfoConfirmation(confirmCode);
  }

  function renderUpdateContent() {
    return (
      <>
        <DialogContent>
          {!isPassword && (
            <div className="inputGroup">
              <label htmlFor="socials-input">{titles[type]} قبلی</label>

              <InputBase
                fullWidth
                readOnly
                className="input text-left"
                type={isPassword ? 'password' : 'text'}
                defaultValue={value}
              />
            </div>
          )}

          {isPassword && (
            <div className="inputGroup">
              <label htmlFor="socials-input">{titles[type]} قبلی</label>

              <InputBase
                fullWidth
                className="input"
                type={isPassword ? 'password' : 'text'}
                inputProps={{
                  placeholder: `${titles[type]} قبلی`,
                  value: oldPassword,
                  onChange: e => setOldPassword(e.currentTarget.value),
                }}
              />
            </div>
          )}

          <div className="inputGroup">
            <label htmlFor="socials-input">{titles[type]} جدید</label>

            <InputBase
              fullWidth
              className={`input ${isPassword ? '' : 'text-left'}`}
              type={isPassword ? 'password' : 'text'}
              inputProps={{
                placeholder: `${titles[type]} جدید`,
                value: currentValue,
                onChange: e => setCurrentValue(e.currentTarget.value),
              }}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            disabled={isLoading}
            onClick={handleSubmitChange}
          >
            تایید
          </Button>

          <Button
            onClick={handleClose}
            color="secondary"
            disabled={isLoading}
            autoFocus
            variant="outlined"
          >
            انصراف
          </Button>
        </DialogActions>
      </>
    );
  }

  function renderConfirmCodeContent() {
    return (
      <>
        <DialogContent>
          <div className="inputGroup">
            <label htmlFor="socials-input">کد تایید را وارد نمایید</label>

            <InputBase
              fullWidth
              className="input"
              type={isPassword ? 'password' : 'text'}
              inputProps={{
                placeholder: `کد تاییدی که به ${
                  titles[type]
                } شما ارسال شده است را وارد نمایید`,
                value: confirmCode,
                onChange: e => setConfirmCode(e.currentTarget.value),
              }}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            disabled={
              confirmCode.trim().length < 4 || isLoadingLoadingConfirmCode
            }
            onClick={handleSubmitConfirmCode}
          >
            تایید
          </Button>

          <Button
            onClick={handleSubmitChange}
            color="default"
            disabled={isLoadingLoadingConfirmCode}
            variant="outlined"
          >
            ارسال مجدد کد تایید
          </Button>

          <Button
            onClick={handleClose}
            color="secondary"
            disabled={isLoading}
            autoFocus
            variant="outlined"
          >
            انصراف
          </Button>
        </DialogActions>
      </>
    );
  }

  return (
    <Wrapper open>
      <DialogTitle id="alert-dialog-title">تغییر {titles[type]}</DialogTitle>

      {!hasUpdated && renderUpdateContent()}

      {hasUpdated && renderConfirmCodeContent()}
    </Wrapper>
  );
}

ChangeUserInfoModal.propTypes = {
  type: PropTypes.oneOf(['email', 'mobile', 'password']).isRequired,
  value: PropTypes.string,
  updateChannelUserInfoData: PropTypes.object.isRequired,
  updateChannelUserInfoConfirmData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleUpdateChannelUserInfo: PropTypes.func.isRequired,
  handleClearUpdateChannelUserInfo: PropTypes.func.isRequired,
  handleUpdateChannelUserInfoConfirmation: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  updateChannelUserInfoData: makeSelectChannelUserInfoUpdate(),
  updateChannelUserInfoConfirmData: makeSelectChannelUserInfoUpdateConfirm(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleUpdateChannelUserInfo: params =>
      dispatch(updateChannelUserInfoAction(params)),
    handleClearUpdateChannelUserInfo: () =>
      dispatch(updateChannelUserInfoClearAction()),
    handleUpdateChannelUserInfoConfirmation: code =>
      dispatch(updateChannelUserInfoConfirmAction(code)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(ChangeUserInfoModal);
