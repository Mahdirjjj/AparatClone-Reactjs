import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PorpTypes from 'prop-types';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import {
  Grid,
  TextField,
  Button,
  Tooltip,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import {
  OpenInNewOutlined as LinkIcon,
  FileCopyOutlined as CopyAddressIcon,
} from '@material-ui/icons';

import TagSelectBox from 'components/TagSelectBox';
import CategorySelectBox from 'components/CategorySelectBox';
import {
  makeSelectBannerUpload,
  makeSelectUpdateVideo,
} from 'containers/App/selectors';
import { uploadBannerAction, updateVideoAction } from 'containers/App/actions';
import { ROUTE_VIDEO_SHOW } from 'containers/App/routes';
import { BASE_URL } from 'utils/constants';
import ErrorMessage from 'components/ErrorMessage';

const UpdateVideoFormWrapper = styled(Grid)`
  background: #fff;
  box-shadow: 0 0 1px 1px #f5f4f4;
  flex-grow: 1;
  max-width: 800px;
  margin: auto;

  .tabContent {
    padding: 1rem;
  }

  .inputWrapper {
    width: 100%;
    margin-bottom: 1rem;

    label {
      font-weight: bold;
      padding-bottom: 0.8rem;
      display: inline-block;
    }

    .input {
      background: #fff;
    }

    .bannerImage {
      width: 100%;
      height: 200px;
    }
  }

  .videoLinkWrapper {
    position: relative;
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 5px;
    box-shadow: 0 0 3px 0px #efe1e1;

    .label {
      font-weight: bold;
      margin-bottom: 1em;
      display: block;
    }

    .link {
      margin-top: 1.2em;
      text-align: left;
    }

    .copyAddressIcon {
      position: absolute;
      left: 0.5em;
      top: 0.5em;
      cursor: pointer;

      :hover,
      :focus {
        color: #000;
      }
    }
  }

  .btn-wrapper {
    .btn {
      margin-top: 0.2em;

      .MuiSvgIcon-root {
        padding: 0 0 0 2px;
        color: #717070;
      }
    }
  }

  [type='file'] {
    display: none;
  }
`;

function UpdateVideoForm({
  video: InputVideo,
  banner,
  updateVideo,
  dispatch,
  onSelectBanner,
  onVideoUpdate,
}) {
  const [video, setVideo] = useState(InputVideo);
  let uploadBannerRef = null;
  let linkElementRef = null;

  useEffect(() => {
    if (updateVideo.data) {
      handleRedirectToShowVideoPage();
    }
  }, [updateVideo.data]);

  function changeData(key, value) {
    const newData = { ...video, [key]: value };
    setVideo(newData);
  }

  function handleRedirectToShowVideoPage() {
    dispatch(push(ROUTE_VIDEO_SHOW.replace(':slug', video.slug)));
  }

  function handleBannerFileChange() {
    onSelectBanner(uploadBannerRef.files[0]);
  }

  function handleShowVideo() {
    dispatch(push(ROUTE_VIDEO_SHOW.replace(':slug', video.slug)));
  }

  function handleUpdateVideo() {
    const changes = {};

    Object.entries(video).forEach(([key, value]) => {
      if (InputVideo[key] !== value) {
        changes[key] = value;
      }
    });

    if (banner.data && banner.data.banner) {
      changes.banner = banner.data.banner;
    }

    onVideoUpdate(video.slug, changes);
  }

  function handleCopyAddress() {
    const range = document.createRange();
    range.selectNode(linkElementRef);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }

  function bannerFile() {
    if (banner.data) {
      return `${BASE_URL}videos/tmp/${banner.data.banner}`;
    }

    return video.banner_link;
  }

  return (
    <UpdateVideoFormWrapper container>
      <Grid item xs={12} md={7} className="tabContent">
        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-title">عنوان ویدیو</label>

          <TextField
            fullWidth
            id="inp-title"
            className="input"
            variant="outlined"
            defaultValue={video.title}
            onChange={e => changeData('title', e.target.value.trim())}
          />

          <p>
            عنوان ویدیو معرف ویدیو شماست. انتخاب عنوان خوب در جذب کاربران بسیار
            موثر است.
          </p>
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-info">توضیحات اضافه</label>

          <TextField
            fullWidth
            id="inp-info"
            multiline
            rows={3}
            rowsMax={3}
            className="input"
            variant="outlined"
            defaultValue={video.info}
            onChange={e => changeData('info', e.target.value.trim())}
          />

          <p>
            در توضیحات اضافه میتوانید محل وقوع حادثه، تاریخ رخ دادن آن یا هر
            نکته دیگری که مربوط به ویدیو میشود را وارد کنید.
          </p>
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-tag">برچسپ ها</label>

          <TagSelectBox
            fullWidth
            id="inp-tag"
            variant="outlined"
            className="input"
            max={5}
            value={video.tags}
            onChange={value => changeData('tags', value)}
          />

          <p>
            برچسب ها ، عبارات کلیدی ویدیو شما می باشند که با انتخاب درست آنها
            میتوانید رابطه بین ویدیو خود و ویدیو های مشابه را قوی تر کنید.
          </p>
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-category">دسته بندی آپارات</label>

          <CategorySelectBox
            fullWidth
            id="inp-category"
            variant="outlined"
            className="input"
            value={video.category_id}
            onChange={value => changeData('category', value)}
          />
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-category-channel">دسته بندی کانال</label>
          <CategorySelectBox
            fullWidth
            channel
            id="inp-category-channel"
            variant="outlined"
            className="input"
            value={video.channel_category_id}
            onChange={value => changeData('channel_category', value)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={5} className="tabContent">
        <Grid item xs={12} className="inputWrapper">
          <img className="bannerImage" src={bannerFile()} alt={video.title} />
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <input
            type="file"
            accept="image/*"
            ref={el => {
              uploadBannerRef = el;
            }}
            onChange={handleBannerFileChange}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={e => uploadBannerRef.click(e)}
            disabled={!!banner.file}
          >
            بارگذاری تصویر
          </Button>

          {banner.error && (
            <ErrorMessage
              error={banner.error}
              forceMessage="در بارگذاری تصویر خطایی به وجود آمده است"
            />
          )}

          {updateVideo.error && <ErrorMessage error={updateVideo.error} />}
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <FormControlLabel
            control={
              <Switch
                checked={!!video.enable_comments}
                onChange={event =>
                  changeData('enable_comments', Number(event.target.checked))
                }
                value="enable_comments"
                color="primary"
              />
            }
            label="امکان ثبت نظرات"
          />
        </Grid>

        <Grid item xs={12} className="videoLinkWrapper">
          <span className="label">آدرس ویدیو</span>
          <Tooltip disableFocusListener title="کپی کردن آدرس ویدیو">
            <CopyAddressIcon
              className="copyAddressIcon"
              onClick={handleCopyAddress}
            />
          </Tooltip>
          <div
            className="link"
            ref={el => {
              linkElementRef = el;
            }}
          >
            {window.location.origin}
            {ROUTE_VIDEO_SHOW.replace(':slug', video.slug)}
          </div>
        </Grid>

        <Grid item xs={12} className="btn-wrapper">
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            size="large"
            className="btn btn-publish"
            disabled={
              banner.data
                ? false
                : JSON.stringify(InputVideo) === JSON.stringify(video)
            }
            onClick={handleUpdateVideo}
          >
            به روز رسانی
          </Button>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            className="btn btn-redirect"
            disabled={!!banner.file}
            onClick={handleShowVideo}
          >
            <LinkIcon /> مشاهده ویدیو
          </Button>
        </Grid>
      </Grid>
    </UpdateVideoFormWrapper>
  );
}

UpdateVideoForm.propTypes = {
  video: PorpTypes.object.isRequired,
  banner: PorpTypes.object.isRequired,
  updateVideo: PorpTypes.object.isRequired,
  dispatch: PorpTypes.func.isRequired,
  onSelectBanner: PorpTypes.func.isRequired,
  onVideoUpdate: PorpTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  banner: makeSelectBannerUpload(),
  updateVideo: makeSelectUpdateVideo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectBanner: file => dispatch(uploadBannerAction(file)),
    onVideoUpdate: (slug, data) => dispatch(updateVideoAction(slug, data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(UpdateVideoForm);
