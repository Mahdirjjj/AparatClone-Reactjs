import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';

const Wrapper = styled.div`
  background: #fff;
  border: 2px dashed #ddd;
  padding: 8px;

  & .imageContainer {
    width: 90px;

    & .image {
      width: 100%;
      height: 100%;
    }

    & .imageUploader {
      background-color: #efefef;
      padding: 5px 0;
      text-align: center;
      font-weight: bold;
      border: 1px solid #ccc;
      cursor: pointer;

      &:hover {
        border-color: #3babd0;
        background-color: #f5f5f5;
        color: #3babd0;
      }
    }
  }

  & .uploadDetail {
    padding-right: 20px;
    width: 100%;

    & b {
      font-size: 1.1rem;
      margin-top: 15px;
    }

    & .progressBar {
      width: 100%;
      margin-top: 25px;
      height: 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
      position: relative;
      overflow: hidden;

      & .progressBarPercentage {
        position: absolute;
        background: #3babd0;
        left: 50%;
        right: 0;
      }
    }
  }
`;

function FileUploadProgress({ value, banner, onSelectBanner }) {
  let imageSelectorRef = null;

  function handleSelectImage() {
    if (imageSelectorRef.files && imageSelectorRef.files[0]) {
      onSelectBanner(imageSelectorRef.files[0]);
    }
  }

  return (
    <Wrapper>
      <Grid container wrap="nowrap">
        <Grid className="imageContainer">
          {banner ? (
            <img src={banner} className="image" alt="تصویر ویدیو" />
          ) : (
            <>
              <Button
                type="button"
                className="image imageUploader"
                onClick={() => {
                  imageSelectorRef.click();
                }}
              >
                تصویر را انتخاب کنید
              </Button>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                ref={el => {
                  imageSelectorRef = el;
                }}
                onChange={handleSelectImage}
              />
            </>
          )}
        </Grid>
        <Grid className="uploadDetail">
          {value <= 99 ? (
            <b>در حال آپلود ویدیو (%{value})</b>
          ) : (
            <b>ویدیو شما با موفقیت بارگزاری شد</b>
          )}
          <div className="progressBar">
            <div
              className="progressBarPercentage"
              style={{ left: `${100 - value}%` }}
            >
              &nbsp;
            </div>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

FileUploadProgress.propTypes = {
  value: PropTypes.number.isRequired,
  banner: PropTypes.string,
  onSelectBanner: PropTypes.func.isRequired,
};

export default memo(FileUploadProgress);
