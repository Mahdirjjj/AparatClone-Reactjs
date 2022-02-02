import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import VideoPlayer from 'components/VideoPlayer';
import { changeVideoStateAction } from 'containers/App/actions';
import { makeSelectChangeVideoState } from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  VIDEO_STATE_ACCEPTED,
  VIDEO_STATE_BLOCKED,
  VIDEO_STATE_CONVERTED,
} from 'utils/constants';
import { VideoModalWrapper } from './styles';

function VideoModal({ video, changeStateData, dispatch, onClose }) {
  const loading = !!changeStateData.params;

  function handleAcceptVideo() {
    dispatch(
      changeVideoStateAction({ slug: video.slug, state: VIDEO_STATE_ACCEPTED }),
    );
  }

  function handleBlockVideo() {
    dispatch(
      changeVideoStateAction({ slug: video.slug, state: VIDEO_STATE_BLOCKED }),
    );
  }

  return (
    <VideoModalWrapper open>
      <DialogTitle>{video.title}</DialogTitle>

      <DialogContent>
        <VideoPlayer video={video} />
      </DialogContent>

      <DialogActions className="DialogActions">
        <div>
          {(video.state === VIDEO_STATE_CONVERTED ||
            video.state === VIDEO_STATE_BLOCKED) && (
            <Button
              color="primary"
              variant="outlined"
              disabled={loading}
              onClick={handleAcceptVideo}
            >
              تایید ویدیو
            </Button>
          )}

          {video.state !== VIDEO_STATE_BLOCKED && (
            <Button
              color="secondary"
              variant="outlined"
              disabled={loading}
              onClick={handleBlockVideo}
            >
              بلاک کردن ویدیو
            </Button>
          )}
        </div>

        <Button color="secondary" disabled={loading} onClick={onClose}>
          انصراف
        </Button>
      </DialogActions>
    </VideoModalWrapper>
  );
}

VideoModal.propTypes = {
  video: PropTypes.object.isRequired,
  changeStateData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  changeStateData: makeSelectChangeVideoState(),
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
)(VideoModal);
