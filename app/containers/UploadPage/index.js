/**
 *
 * UploadPage
 *
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { Grid, Typography, Button } from '@material-ui/core';
import { CloudUpload as UploadIcon } from '@material-ui/icons';

import { ROUTE_MY_VIDEOS } from 'containers/App/routes';
import {
  fileUploadAction,
  createVideoAction,
  uploadBannerAction,
  createVideoClearAction,
} from 'containers/App/actions';
import {
  makeSelectFileUpload,
  makeSelectCreateVideo,
  makeSelectBannerUpload,
} from 'containers/App/selectors';
import Loading from 'components/Loading';

import DashboardLayout from 'layouts/DashboardLayout';

import { BASE_URL } from 'utils/constants';
import FileUploadForm from './FileUploadForm';
import FileUploadProgress from './FileUploadProgress';
import FileUploadInfo from './FileUploadInfo';
import PublishLaterModal from './PublishLaterModal';

const UploadedWrapper = styled(Grid)`
  max-width: 700px;
  margin: 30px auto;

  .videoDetail {
    background: #f2f2f2;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 3px 3px #e2e2e2;

    .videoDetailBox {
      border: 2px dashed #ccc;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;

      img {
        width: 200px;
        height: 110px;
        margin-left: 10px;
      }

      button {
        margin: 5px;
        width: 100px;
        padding: 10px;
      }

      b {
        font-size: 1.2em;
        margin-bottom: 20px;
      }
    }
  }

  .withMarginTop {
    margin-top: 40px;
  }
`;

const UploadWrapper = styled(Grid)`
  max-width: 700px;
  margin: auto;

  & .topTitleBar {
    border-bottom: 1px solid #ddd;
    height: 30px;
    line-height: 30px;
  }

  & .topTitleBar > span {
    border-bottom: 1px solid #666;
    display: inline-block;
    height: 100%;
    margin-top: 1px;
    padding-left: 35px;
  }

  & .topTitleBar .MuiSvgIcon-root,
  & .topTitleBar .MuiTypography-root {
    height: 100%;
    display: inline-block;
    float: right;
  }

  & .topTitleBar .MuiTypography-root {
    line-height: 30px;
    font-weight: bold;
    font-size: 0.8rem;
  }

  & .topTitleBar .MuiSvgIcon-root {
    margin: 0 5px;
  }

  & .videoUploadInfoWrapper {
    background: #f7f7f7;
    border-radius: 3px;
    box-shadow: 0 0 3px #dadada;
    padding: 1rem;
  }

  & .btn-wrapper {
    text-align: left;

    & .btn {
      margin: 3px;

      &.btn-publish-later {
        background: #bbb;
        color: #fff;

        &:hover {
          background: #f50057;
          color: initial;
        }
      }
    }
  }
`;

export function UploadPage({
  fileUpload,
  bannerUpload,
  createVideo,
  dispatch,
  clearCreateVideoData,
  onSelectFile,
  onSelectBanner,
  onPublishVideo,
}) {
  const [videoData, setVideoData] = useState({
    video_id: fileUpload && fileUpload.data ? fileUpload.data.video : null,
    title: 'عنوان ویدیو',
    category: 1,
    info: 'این توضیحان هستش',
    tags: [],
    channel_category: null,
    playlist: null,
    enable_comments: true,
    enable_watermark: false,
    banner: null,
  });
  const [showPublishLaterModal, setShowPublishLaterModal] = useState(false);

  useEffect(() => {
    if (fileUpload && fileUpload.data && !videoData.video_id) {
      setVideoData({ ...videoData, video_id: fileUpload.data.video });
    }

    if (bannerUpload && bannerUpload.data && !videoData.banner) {
      setVideoData({ ...videoData, banner: bannerUpload.data.banner });
    }
  }, [fileUpload.data, bannerUpload.data, videoData]);

  useEffect(() => clearCreateVideoData, []);

  function handlePublish() {
    onPublishVideo(videoData);
  }

  function handlePublishLater(date) {
    togglePublishLaterModal(false);
    onPublishVideo({ ...videoData, publish_at: date });
  }

  function togglePublishLaterModal(value = undefined) {
    setShowPublishLaterModal(
      value === undefined ? !showPublishLaterModal : value,
    );
  }

  function handleSelectBannerImage(file) {
    onSelectBanner(file);
  }

  return (
    <DashboardLayout showSidebar={false}>
      {bannerUpload.file && <Loading />}

      <Helmet>
        <title>بارگذاری ویدیو</title>
        <meta name="description" content="بارگذاری ویدیو" />
      </Helmet>

      {!createVideo.data && (
        <UploadWrapper container>
          <Grid item xs={12}>
            <div className="topTitleBar">
              <span>
                <UploadIcon />
                <Typography variant="caption">بارگذاری ویدیو</Typography>
              </span>
            </div>
          </Grid>

          {fileUpload.file ? (
            <Grid item xs={12} className="videoUploadInfoWrapper">
              <FileUploadProgress
                value={fileUpload.percent}
                banner={
                  videoData.banner
                    ? `${BASE_URL}videos/tmp/${videoData.banner}`
                    : null
                }
                onSelectBanner={handleSelectBannerImage}
              />
              <FileUploadInfo
                data={videoData}
                onChange={data => setVideoData(data)}
              />

              <Grid item className="btn-wrapper">
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  className="btn btn-publish-later"
                  onClick={togglePublishLaterModal}
                >
                  ذخیره بعدا منتشر میکنم
                </Button>

                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  className="btn btn-publish"
                  onClick={handlePublish}
                >
                  انتشار ویدیو
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <FileUploadForm onSelect={onSelectFile} />
            </Grid>
          )}
        </UploadWrapper>
      )}

      {createVideo.data && (
        <UploadedWrapper container>
          <Grid item xs={12}>
            <div className="videoDetail">
              <div className="videoDetailBox">
                <img src={createVideo.data.banner_link} alt="بنر ویدیو" />
                <div>
                  <b>ویدیو شما با موفقیت بارگذاری شد</b>
                  <p>
                    ویدیوی شما پس از پردازشی کوتاه بر روی آپارات به نمایش
                    درخواهد آمد
                  </p>
                </div>
                <Button
                  variant="outlined"
                  // eslint-disable-next-line no-alert
                  onClick={() => alert('انجام نشده هنوز')}
                >
                  مشاهده ویدیو
                </Button>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} className="withMarginTop">
            <Button
              color="secondary"
              variant="contained"
              size="large"
              className="btn btn-publish"
              onClick={() => dispatch(push(ROUTE_MY_VIDEOS))}
            >
              مدیریت ویدیو ها
            </Button>
          </Grid>
        </UploadedWrapper>
      )}

      {showPublishLaterModal && (
        <PublishLaterModal
          onClose={() => togglePublishLaterModal(false)}
          onOk={handlePublishLater}
        />
      )}
    </DashboardLayout>
  );
}

UploadPage.propTypes = {
  fileUpload: PropTypes.object.isRequired,
  bannerUpload: PropTypes.object.isRequired,
  createVideo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  clearCreateVideoData: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  onSelectBanner: PropTypes.func.isRequired,
  onPublishVideo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fileUpload: makeSelectFileUpload(),
  bannerUpload: makeSelectBannerUpload(),
  createVideo: makeSelectCreateVideo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectFile: file => dispatch(fileUploadAction(file)),
    onSelectBanner: file => dispatch(uploadBannerAction(file)),
    onPublishVideo: data => dispatch(createVideoAction(data)),
    clearCreateVideoData: () => dispatch(createVideoClearAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UploadPage);
