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
  makeSelectCategories,
  makeSelectAddCategory,
} from 'containers/App/selectors';
import { addCategoryAction } from 'containers/App/actions';

function CategorySelectBox({
  channel,
  value,
  categories,
  newCategory,
  onChange,
  addNewCategory,
  ...props
}) {
  const [currentValue, setCurrentValue] = useState(
    value ? `00${value}` : value,
  );
  const [addNewItem, setAddNewItem] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');

  useEffect(() => {
    if (newCategory) {
      handleAddNewItemCancel();
      addNewCategory(null);
      handleChange(`00${newCategory.id}`);
    }
  }, [newCategory]);

  function getItems() {
    const items = {
      '0': 'افزودن دسته بندی جدید',
      '00': 'بدون دسته بندی',
    };

    categories.forEach(item => {
      if (!!channel === !!item.user_id) {
        items[`00${item.id}`] = item.title;
      }
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
      addNewCategory(newItemTitle);
    }
  }

  function handleAddNewItemCancel() {
    setAddNewItem(false);
    addNewCategory(null);
  }

  return (
    <>
      {addNewItem ? (
        <TextField
          fullWidth
          variant="outlined"
          {...props}
          dispatch={null}
          label="عنوان دسته بندی جدید"
          value={newItemTitle}
          onChange={e => setNewItemTitle(e.target.value.trim())}
          onKeyDown={e => {
            if (e.which === 13) {
              handleAddNewItem();
            }
          }}
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

CategorySelectBox.propTypes = {
  channel: PropTypes.bool,
  categories: PropTypes.array.isRequired,
  newCategory: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  addNewCategory: PropTypes.func.isRequired,
};

CategorySelectBox.defaultProps = {
  channel: false,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  newCategory: makeSelectAddCategory(),
});

function mapDispatchToProps(dispatch) {
  return {
    addNewCategory: title => dispatch(addCategoryAction(title)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(CategorySelectBox);
