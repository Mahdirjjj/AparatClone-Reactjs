/**
 *
 * FollowList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import NoItemInList from 'components/NoItemInList';
import FollowItem from 'components/FollowItem';

const FollowListWrapper = styled(Grid)`
  display: flex;
  align-content: space-around;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

function FollowList({ channels }) {
  return (
    <FollowListWrapper>
      {!!channels &&
        !!channels.length &&
        channels.map(channel => (
          <FollowItem
            key={channel.id + channel.name + channel.type}
            item={channel}
          />
        ))}

      {!(channels && channels.length) && (
        <NoItemInList title="هیچ موردی یافت نشد" />
      )}
    </FollowListWrapper>
  );
}

FollowList.propTypes = {
  channels: PropTypes.array,
};

export default memo(FollowList);
