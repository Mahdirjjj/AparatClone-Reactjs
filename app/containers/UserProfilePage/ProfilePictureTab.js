import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Photo as PhotoIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { uploadChannelBannerAction } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectChannelBannerUpload } from 'containers/App/selectors';
import ErrorMessage from 'components/ErrorMessage';

const ProfilePictureTabWrapper = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;
  padding: 2em;

  > b {
    margin-bottom: 1em;
  }

  > p {
    padding: 1em 0;
  }
`;

const AvatarSelectorWrapper = styled.div`
  border: 2px dashed #f5f5f9;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 1em;
  margin-right: 9em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1em;
  cursor: pointer;

  :hover {
    border-color: #eee;
  }

  input {
    display: none;
  }

  > svg {
    width: 50px;
    font-size: 50px;
    margin-bottom: 0.1em;
  }
`;

function ProfilePictureTab({ uploadAvatarData, handleUploadAvatar }) {
  let fileInputRef = null;
  const [file, setFile] = useState(null);
  const isValidFile = file && file.size <= 1024000;

  function handleClickAvatarSelector(e) {
    fileInputRef.click(e);
  }

  function handleFileChange() {
    setFile(fileInputRef.files[0]);
  }

  function handleUploadAvatarClick() {
    handleUploadAvatar(file);
  }

  return (
    <ProfilePictureTabWrapper>
      <b>تغییر تصویر پروفایل</b>
      <p>حداکثر حجم فایل مجاز 1 مگابایت است.</p>

      <AvatarSelectorWrapper onClick={handleClickAvatarSelector}>
        <PhotoIcon />

        <span>برای انتخاب تصویر آواتار کلیک کنید</span>

        <input
          type="file"
          accept=".png, .jpeg, .jpg"
          ref={el => {
            fileInputRef = el;
          }}
          onChange={handleFileChange}
        />
      </AvatarSelectorWrapper>

      <Button
        className="btn btn-accept"
        disabled={!isValidFile || uploadAvatarData.file}
        onClick={handleUploadAvatarClick}
      >
        {uploadAvatarData.file ? 'در حال انجام...' : 'ثبت تغییرات'}
      </Button>

      {file && !isValidFile && (
        <ErrorMessage
          error={{}}
          forceMessage="اندازه فایل انتخاب شده اشتباه میباشد"
        />
      )}

      {uploadAvatarData.error && (
        <ErrorMessage
          error={uploadAvatarData.error}
          forceMessage="در ثبت تغییرات مشکلی به وجود آمده است"
        />
      )}
    </ProfilePictureTabWrapper>
  );
}

ProfilePictureTab.propTypes = {
  uploadAvatarData: PropTypes.object.isRequired,
  handleUploadAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  uploadAvatarData: makeSelectChannelBannerUpload(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleUploadAvatar: file => dispatch(uploadChannelBannerAction(file)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(ProfilePictureTab);
