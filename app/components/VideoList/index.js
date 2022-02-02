/**
 *
 * VideoList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import VideoItem from 'components/VideoItem';
import NoItemInList from 'components/NoItemInList';

const VideoListWrapper = styled(Grid)`
  display: flex;
  align-content: space-around;
  justify-content: space-around;
  flex-wrap: wrap;
`;

function VideoList({ videos }) {
  return (
    <VideoListWrapper>
      {!!videos &&
        !!videos.length &&
        videos.map(video => <VideoItem key={video.id} video={video} />)}

      {!(videos && videos.length) && (
        <NoItemInList title="هیچ موردی یافت نشد" />
      )}
    </VideoListWrapper>
  );
}

VideoList.propTypes = {
  videos: PropTypes.array,
};

export default memo(VideoList);
