import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SentimentDissatisfied as EmptyIcon } from '@material-ui/icons';
import { Grid } from '@material-ui/core';

import BoxImage from './box.png';

const NoItemInListWrapper = styled(Grid)`
  text-align: center;
  margin: auto;
  margin-top: 2.5em;
  position: relative;

  .EmptyIcon {
    font-size: 3em;
    position: absolute;
    top: 20%;
    left: 37%;
    color: #7b5b1a;
  }

  img {
    width: 128px;
    height: 128px;
  }

  p {
    color: #444;
  }
`;

function NoItemInList({ title }) {
  return (
    <NoItemInListWrapper className="NoItemInList">
      {typeof title === 'string' && (
        <>
          <EmptyIcon className="EmptyIcon" />
          <img src={BoxImage} alt={title} />
        </>
      )}

      <p>{title}</p>
    </NoItemInListWrapper>
  );
}

NoItemInList.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default memo(NoItemInList);
