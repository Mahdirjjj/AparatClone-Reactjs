import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import NoItemInList from 'components/NoItemInList';
import VideoListItem from 'components/VideoListItem';

const VideosTabWrapper = styled(Grid)`
  justify-content: center;

  .title {
    font-weigth: bold;
    font-size: 1.3em;
    color: #000;
    display: block;
    width: 100%;
  }
`;

function VideosTab({ data, title }) {
  return (
    <VideosTabWrapper container>
      {title && <div className="title">{title}</div>}

      {!(data.videos && data.videos.length) && (
        <NoItemInList title="لیست پخشی وجود ندارد" />
      )}

      {data.videos &&
        data.videos.length &&
        data.videos.map(item => (
          <VideoListItem
            key={item.slug}
            video={item}
            channelName={data.channel.name}
          />
        ))}
    </VideosTabWrapper>
  );
}

VideosTab.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default memo(VideosTab);
