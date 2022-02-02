import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import NoItemInList from 'components/NoItemInList';
import { PlaylistPlayOutlined as PlaylistIcon } from '@material-ui/icons';
import { ROUTE_VIDEO_VIEW } from 'containers/App/routes';
import { push } from 'connected-react-router';

const PlaylistTabWrapper = styled(Grid)`
  justify-content: center;

  .title,
  .infoItem {
    padding: 1em 0;
  }

  .title {
    font-weigth: bold;
    font-size: 1.3em;
    color: #000;
    display: block;
    width: 100%;
  }

  .infoItem {
    color: #444;
  }
`;

const BANNER_HEIGHT = 100;
const Playlist = styled.div`
  width: 180px;
  margin: 0.5em;
  display: block;
  position: relative;
  cursor: pointer;
  transition: ease 300ms;

  .videoBanner {
    height: ${BANNER_HEIGHT}px;
    width: 100%;
  }

  .rightPart {
    background: rgba(41, 42, 51, 0.8);
    color: #fff;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    height: ${BANNER_HEIGHT}px;
    overflow: hidden;
    flex-wrap: wrap;
    flex-direction: column;

    .videoCount {
      display: block;
    }

    .playlistIcon {
      font-size: 3em;
    }
  }

  .title {
    font-size: 1em;
    color: #565971;
    padding: 0.5em 0;
    margin: 0;
    text-align: right;
  }
`;

function PlaylistTab({ data, dispatch }) {
  function handleRedirectToPlaylist(e) {
    dispatch(
      push(
        `${ROUTE_VIDEO_VIEW.replace(
          ':slug',
          e.currentTarget.dataset.slug,
        )}?playlist=${e.currentTarget.dataset.playlistId}`,
      ),
    );
  }

  return (
    <PlaylistTabWrapper container>
      <div className="title">لیست های پخش</div>

      {!(data.user.playlists && data.user.playlists.length) && (
        <NoItemInList title="لیست پخشی وجود ندارد" />
      )}
      {data.user.playlists &&
        data.user.playlists.length &&
        data.user.playlists.map(item => (
          <Playlist
            key={item.id}
            data-slug={item.video.slug}
            data-playlist-id={item.id}
            onClick={handleRedirectToPlaylist}
          >
            <img
              className="videoBanner"
              src={item.video.banner_link}
              alt={item.title}
            />
            <div className="rightPart">
              <PlaylistIcon className="playlistIcon" />
              <span className="videoCount">{item.size} ویدیو</span>
            </div>

            <h3 className="title">{item.title}</h3>
          </Playlist>
        ))}
    </PlaylistTabWrapper>
  );
}

PlaylistTab.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const withStore = connect();

export default compose(
  memo,
  withStore,
)(PlaylistTab);
