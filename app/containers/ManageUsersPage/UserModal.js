import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core';
import {
  updateUserAction,
  resetUserPasswordAction,
  deleteUserAction,
} from 'containers/App/actions';
import {
  makeSelectUpdateUser,
  makeSelectResetUserPassword,
  makeSelectDeleteUser,
} from 'containers/App/selectors';
import { InputWithLabel, TwoColumn } from 'global-styles';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { USER_TYPE_ADMIN, USER_TYPE_USER } from 'utils/constants';
import { UserModalWrapper } from './styles';

function UserModal({
  user,
  updateData,
  resetPasswordData,
  deleteUserData,
  dispatch,
  onClose,
}) {
  const [userData, setUserData] = useState(user);
  const loading = !!(
    updateData.params ||
    resetPasswordData.params ||
    deleteUserData.params
  );
  const isUpdated =
    user.name !== userData.name ||
    user.type !== userData.type ||
    user.email !== userData.email ||
    user.mobile !== userData.mobile ||
    user.website !== userData.website;

  function handleUpdateUserData() {
    dispatch(updateUserAction(userData));
  }

  function handleResetPassword() {
    dispatch(resetUserPasswordAction({ id: user.id }));
  }

  function handleDeleteUser() {
    dispatch(deleteUserAction({ id: user.id }));
  }

  function handleChangeData(e) {
    let key = e.currentTarget.id.replace('user-', '');
    let { value } = e.currentTarget;

    if ('value' in e.target) {
      key = key || e.target.name;
      // eslint-disable-next-line prefer-destructuring
      value = e.target.value;
    }

    setUserData({ ...userData, [key]: value });
  }

  return (
    <UserModalWrapper open>
      <DialogTitle>اطلاعات کاربری</DialogTitle>

      <DialogContent>
        <TwoColumn>
          <InputWithLabel>
            <label htmlFor="user-name">نام کاربر</label>
            <Input
              id="user-name"
              value={userData.name || ''}
              disabled={loading}
              onChange={handleChangeData}
            />
          </InputWithLabel>

          <span className="space" />

          <InputWithLabel>
            <label htmlFor="user-type">نوع کاربری</label>
            <Select
              id="user-type"
              name="type"
              value={userData.type}
              disabled={loading}
              onChange={handleChangeData}
            >
              <MenuItem value={USER_TYPE_ADMIN}>مدیر</MenuItem>
              <MenuItem value={USER_TYPE_USER}>کاربر</MenuItem>
            </Select>
          </InputWithLabel>
        </TwoColumn>

        <TwoColumn>
          <InputWithLabel>
            <label htmlFor="user-mobile">شماره موبایل</label>
            <Input
              id="user-mobile"
              value={userData.mobile || ''}
              disabled={loading}
              dir="ltr"
              onChange={handleChangeData}
            />
          </InputWithLabel>

          <span className="space" />

          <InputWithLabel>
            <label htmlFor="user-email">ایمیل</label>
            <Input
              id="user-email"
              value={userData.email || ''}
              disabled={loading}
              dir="ltr"
              onChange={handleChangeData}
            />
          </InputWithLabel>
        </TwoColumn>

        <TwoColumn>
          <InputWithLabel>
            <label htmlFor="user-website">آدرس وبسایت</label>
            <Input
              id="user-website"
              value={userData.website || ''}
              disabled={loading}
              dir="ltr"
              onChange={handleChangeData}
            />
          </InputWithLabel>
        </TwoColumn>
      </DialogContent>

      <DialogActions className="DialogActions">
        <div>
          <Button
            variant="outlined"
            disabled={!isUpdated || loading}
            onClick={handleUpdateUserData}
          >
            ویرایش اطلاعات
          </Button>

          <Button
            variant="outlined"
            disabled={loading}
            onClick={handleResetPassword}
          >
            بازنشانی گذرواژه
          </Button>

          {user.type !== USER_TYPE_ADMIN && (
            <Button
              color="secondary"
              variant="outlined"
              disabled={loading}
              onClick={handleDeleteUser}
            >
              حذف کاربر
            </Button>
          )}
        </div>

        <Button color="secondary" disabled={loading} onClick={onClose}>
          انصراف
        </Button>
      </DialogActions>
    </UserModalWrapper>
  );
}

UserModal.propTypes = {
  user: PropTypes.object.isRequired,
  updateData: PropTypes.object.isRequired,
  resetPasswordData: PropTypes.object.isRequired,
  deleteUserData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  updateData: makeSelectUpdateUser(),
  resetPasswordData: makeSelectResetUserPassword(),
  deleteUserData: makeSelectDeleteUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(UserModal);
