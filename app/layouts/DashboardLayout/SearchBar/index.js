/**
 *
 * SearchBar
 *
 */

import { IconButton } from '@material-ui/core';
import { Clear as ClearIcon, Search as SearchIcon } from '@material-ui/icons';
import { push } from 'connected-react-router';
import { ROUTE_HOME } from 'containers/App/routes';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  border-radius: 35px;
  background: #f6f6f6;
  color: #6f7285;
  min-width: 150px;
  padding: 2px;
  position: relative;
  transition: all 500ms ease;
  max-width: 600px;
  margin: auto;

  &:hover,
  &.active {
    box-shadow: 0 0 2px 1px #e4e0e0;
    background: #fff;
  }

  & > input {
    border: none;
    outline: none;
    width: 100%;
    padding: 5px;
    padding-left: 45px;
    background: transparent;
    color: inherit;
  }

  & .clearIcon {
    position: absolute;
    left: 30px;
    top: 9px;
    font-size: 15px;
    cursor: pointer;
    color: #8e3e6d !important;
  }

  & button {
    position: absolute;
    left: 2px;
    top: 5px;
  }

  & button:hover .MuiSvgIcon-root,
  & .clearIcon:hover {
    color: #05a3e8 !important;
  }
`;

function SearchBar({ dispatch }) {
  const [active, setActive] = useState(false);
  const [searchText, setsearchText] = useState('');

  function handleSearch() {
    dispatch(push(`${ROUTE_HOME}?search=${searchText.trim()}`));
  }

  return (
    <StyledWrapper className={active ? 'active' : ''}>
      <input
        type="text"
        value={searchText}
        maxLength={70}
        placeholder="جستجوی ویدیو ها و کانال ها..."
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={e => setsearchText(e.target.value.trim())}
        onKeyDown={e => {
          if (e.keyCode === 13) handleSearch();
        }}
      />

      {searchText && (
        <ClearIcon className="clearIcon" onClick={() => setsearchText('')} />
      )}

      <IconButton size="small" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </StyledWrapper>
  );
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withStore = connect(
  undefined,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(SearchBar);
