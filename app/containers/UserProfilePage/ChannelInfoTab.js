import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputBase, Button } from '@material-ui/core';

import {
  updateChannelInfoAction,
  updateChannelSocialsAction,
} from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectUserMe,
  makeSelectChannelInfoUpdate,
  makeSelectChannelSocialsUpdate,
} from 'containers/App/selectors';
import ChangeUserInfoModal from 'components/ChangeUserInfoModal';

const ChannelInfoTabWrapper = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;
  padding: 2em;

  .sepratedPart {
    border-bottom: 1px solid #aaa;
    padding-bottom: 2em;
    margin-bottom: 2em;
  }

  .social-input {
    margin: 0.5em 0;
  }
`;

function ChannelInfoTab({
  userData,
  updateChannelInfoData,
  updateChannelSocialsData,
  handleUpdateChannelInfo,
  handleUpdateChannelSocials,
}) {
  const [data, setData] = useState(null);

  const [showChangeUserInfoModal, setShowChangeUserInfoModal] = useState(null);

  useEffect(() => {
    setData({
      channelName: userData.data.channel.name,
      channelInfo: userData.data.channel.info,
      website: userData.data.website,

      socials: userData.data.channel.socials || {
        cloob: '',
        lenzor: '',
        facebook: '',
        twitter: '',
        telegram: '',
      },

      username: userData.data.name,
      email: userData.data.email,
      mobile: userData.data.mobile,
      password: '',
    });
  }, [userData]);

  function handleChangeData(e) {
    const { value } = e.currentTarget;
    const key = e.currentTarget.id.replace('-input', '').split('-');

    if (key[1]) {
      setData({
        ...data,
        [key[0]]: { ...data[key[0]], [key[1]]: value },
      });
    } else {
      setData({
        ...data,
        [key[0]]: value,
      });
    }
  }

  function handleSaveChangesChannelInfo() {
    const params = {
      name: data.channelName,
      info: data.channelInfo,
      website: data.website,
    };

    handleUpdateChannelInfo(params);
  }

  function handleSaveChangesSocials() {
    handleUpdateChannelSocials(data.socials);
  }

  function handleChangeFieldViaModal(e) {
    setShowChangeUserInfoModal(e.currentTarget.dataset.field);
  }

  if (!data) {
    return null;
  }

  return (
    <ChannelInfoTabWrapper>
      <div className="sepratedPart">
        <div className="inputGroup">
          <label htmlFor="channelName-input">نام کانال</label>
          <InputBase
            className="input"
            id="channelName-input"
            fullWidth
            inputProps={{
              value: data.channelName,
              onChange: handleChangeData,
            }}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="channelInfo-input">درباره کانال</label>
          <textarea
            className="input"
            id="channelInfo-input"
            rows={5}
            value={data.channelInfo}
            onChange={handleChangeData}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="website-input">آدرس اینترنتی</label>
          <InputBase
            className="input text-left"
            id="website-input"
            fullWidth
            inputProps={{
              value: data.website,
              onChange: handleChangeData,
            }}
          />
        </div>

        <Button
          className="btn btn-accept"
          disabled={!!updateChannelInfoData.params}
          onClick={handleSaveChangesChannelInfo}
        >
          {updateChannelInfoData.params ? 'لطفا صبر کنید...' : 'ثبت تغییرات'}
        </Button>
      </div>

      <div className="sepratedPart">
        <div className="inputGroup">
          <label htmlFor="socials-input">شبکه های اجتماعی</label>
          <p>
            میتوانید آی‌دی کانال خود را در شبکه های اجتماعی برای کاربران به
            نمایش بگذارید
          </p>
          {Object.keys(data.socials).map(key => (
            <InputBase
              key={key}
              className="input social-input text-left"
              fullWidth
              id={`socials-${key}-input`}
              inputProps={{
                placeholder: key,
                value: data.socials[key],
                onChange: handleChangeData,
              }}
            />
          ))}
        </div>

        <Button
          className="btn btn-accept"
          disabled={!!updateChannelSocialsData.params}
          onClick={handleSaveChangesSocials}
        >
          {updateChannelSocialsData.params
            ? 'لطفا صبر کنید...'
            : 'ثبت شبکه های اجتماعی'}
        </Button>
      </div>

      <div className="inputGroup">
        <label htmlFor="username-input">نام کاربری</label>
        <InputBase
          className="input"
          id="username-input"
          fullWidth
          readOnly
          value={data.username}
        />
      </div>

      <div className="inputGroup hasAppend">
        <label htmlFor="email-input">ایمیل</label>
        <InputBase
          className="input text-left"
          id="email-input"
          fullWidth
          readOnly
          value={data.email}
        />

        <Button
          className="btn btn-accept append"
          data-field="email"
          onClick={handleChangeFieldViaModal}
        >
          تغییر
        </Button>
      </div>

      <div className="inputGroup hasAppend">
        <label htmlFor="mobile-input">موبایل</label>
        <InputBase
          className="input text-left"
          id="mobile-input"
          fullWidth
          readOnly
          value={data.mobile}
        />

        <Button
          className="btn btn-accept append"
          data-field="mobile"
          onClick={handleChangeFieldViaModal}
        >
          تغییر
        </Button>
      </div>

      <div className="inputGroup hasAppend">
        <label htmlFor="password-input">گذرواژه</label>
        <InputBase
          className="input"
          id="password-input"
          fullWidth
          readOnly
          placeholder="برای تغییر گذرواژه روی دکمه تغییر کلیک کنید"
        />

        <Button
          className="btn btn-accept append"
          data-field="password"
          onClick={handleChangeFieldViaModal}
        >
          تغییر
        </Button>
      </div>

      {showChangeUserInfoModal && (
        <ChangeUserInfoModal
          type={showChangeUserInfoModal}
          value={data[showChangeUserInfoModal]}
          onClose={() => setShowChangeUserInfoModal(null)}
        />
      )}
    </ChannelInfoTabWrapper>
  );
}

ChannelInfoTab.propTypes = {
  userData: PropTypes.object.isRequired,
  updateChannelInfoData: PropTypes.object.isRequired,
  updateChannelSocialsData: PropTypes.object.isRequired,
  handleUpdateChannelInfo: PropTypes.func.isRequired,
  handleUpdateChannelSocials: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserMe(),
  updateChannelInfoData: makeSelectChannelInfoUpdate(),
  updateChannelSocialsData: makeSelectChannelSocialsUpdate(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleUpdateChannelInfo: params =>
      dispatch(updateChannelInfoAction(params)),
    handleUpdateChannelSocials: params =>
      dispatch(updateChannelSocialsAction(params)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(ChannelInfoTab);
