import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import {
  Add as AddCategoryIcon,
  Cancel as AddCategoryCancelIcon,
} from '@material-ui/icons';

import SelectBox from 'components/SelectBox';
import {
  makeSelectPlaylists,
  makeSelectAddPlaylist,
} from 'containers/App/selectors';
import { addPlayListAction } from 'containers/App/actions';

function PlayListSelectBox({
  value,
  playlists,
  newPlayList,
  onChange,
  addNewPlayList,
  ...props
}) {
  const [currentValue, setCurrentValue] = useState(
    value ? `00${value}` : value,
  );
  const [addNewItem, setAddNewItem] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');

  useEffect(() => {
    if (newPlayList) {
      handleAddNewItemCancel();
      addNewPlayList(null);
      handleChange(`00${newPlayList.id}`);
    }
  }, [newPlayList]);

  function getItems() {
    const items = {
      '0': 'افزودن لیست پخش جدید',
      '00': 'بدون لیست پخش',
    };

    playlists.forEach(item => {
      items[`00${item.id}`] = item.title;
    });

    return items;
  }

  function handleChange(val) {
    if (val === '0') {
      setAddNewItem(true);
    } else {
      if (val === '00') {
        onChange(null);
      } else {
        onChange(val.replace(/^00/, ''));
      }
      setCurrentValue(val);
    }
  }

  function handleAddNewItem() {
    if (newItemTitle.length >= 3) {
      addNewPlayList(newItemTitle);
    }
  }

  function handleAddNewItemCancel() {
    setAddNewItem(false);
    addNewPlayList('');
  }

  return (
    <>
      {addNewItem ? (
        <TextField
          fullWidth
          variant="outlined"
          {...props}
          dispatch={null}
          label="عنوان لیست پخش جدید"
          value={newItemTitle}
          onChange={e => setNewItemTitle(e.target.value.trim())}
          onKeyDown={e => e.which === 13 && handleAddNewItem()}
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  edge="end"
                  disabled={newItemTitle.length < 3}
                  onClick={handleAddNewItem}
                >
                  <AddCategoryIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  edge="end"
                  onClick={handleAddNewItemCancel}
                >
                  <AddCategoryCancelIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <SelectBox
          fullWidth
          variant="outlined"
          {...props}
          options={getItems()}
          value={currentValue}
          onChange={handleChange}
        />
      )}
    </>
  );
}

PlayListSelectBox.propTypes = {
  playlists: PropTypes.array.isRequired,
  newPlayList: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  addNewPlayList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  playlists: makeSelectPlaylists(),
  newPlayList: makeSelectAddPlaylist(),
});

function mapDispatchToProps(dispatch) {
  return {
    addNewPlayList: title => dispatch(addPlayListAction(title)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(PlayListSelectBox);
