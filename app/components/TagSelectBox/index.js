import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import {
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Checkbox,
  ListItemText,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { Add as AddNewTagIcon } from '@material-ui/icons';
import { makeSelectTags, makeSelectAddTag } from 'containers/App/selectors';
import { addTagAction } from 'containers/App/actions';

const Wrapper = styled.div`
  & .formControl {
    width: 100%;
  }

  & label + .MuiInput-formControl {
    margin-top: 0;
  }

  & .MuiInput-underline:after,
  & .MuiInput-underline:before {
    display: none;
  }

  & .MuiSelect-selectMenu {
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    background: #fff;
    padding: 12px;
  }

  & .chips {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
  }

  & .chip {
    width: auto;
    background: #df1051;
    margin: 2px;

    & .MuiChip-deleteIcon {
      margin: 0;
      margin-left: 5px;
      color: #fff;
    }
  }

  & .chip-empty {
    width: auto;
    font-weight: bold;
    padding: 6px;
    display: inline-block;
  }

  & .searchTag {
    background: red;
  }
`;

const StyledAddTagButton = styled(Button)`
  margin: 0 !important;
  margin-top: -10px !important;
  margin-left: -8px !important;
  min-width: 30px !important;
  background: #fff !important;
  overflow: hidden !important;
  border: 1px solid #949494 !important;
`;

// eslint-disable-next-line no-unused-vars
function SelectBox({ value, label, max, data, newTag, onChange, onAddNewTag }) {
  const { data: options } = data;
  const [selectedItems, setSelectedItems] = useState(value);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (newTag) {
      const selects = options
        .filter(item => item.isNew || value.indexOf(item.id) !== -1)
        .map(item => item.id);

      setSelectedItems(selects);
      onChange(selects);

      setSearchText('');
      onAddNewTag(null);
    }
  }, [newTag]);

  function handleAddTag() {
    onAddNewTag(searchText);
  }

  function handleChange(e) {
    const val = e.target.value.filter(item => item !== undefined);
    if (val) {
      setSelectedItems(val);
      onChange(val);
    }
  }

  function handleDeleteItem(val) {
    const newItems = selectedItems.filter(item => item !== val);
    setSelectedItems(newItems);
    onChange(newItems);
  }

  function getOptionLabel(id) {
    const filtered = id && options.filter(item => item.id === id);
    return filtered.length ? filtered[0].title : '';
  }

  function renderItems() {
    const filtered = options.filter(
      item => !item.isNew && item.title.lastIndexOf(searchText) >= 0,
    );

    const filteredNews = options.filter(item => item.isNew);

    return [
      <MenuItem key="searchTag">
        <Input
          className="searchTag"
          fullWidth
          value={searchText}
          endAdornment={
            filtered.length ? null : (
              <InputAdornment position="end">
                <StyledAddTagButton onClick={handleAddTag}>
                  <AddNewTagIcon />
                </StyledAddTagButton>
              </InputAdornment>
            )
          }
          onChange={e => setSearchText(e.target.value.trim())}
        />
      </MenuItem>,
      [...filteredNews, ...filtered].map(item => (
        <MenuItem key={item.id} value={item.id}>
          <Checkbox checked={selectedItems.indexOf(item.id) > -1} />
          <ListItemText primary={`#${item.title}`} />
        </MenuItem>
      )),
    ];
  }

  return (
    <Wrapper>
      <FormControl className="formControl">
        {label && (
          <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
        )}
        <Select
          multiple
          displayEmpty
          value={selectedItems}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className="chips">
              {!selected.length ? (
                <span className="chip-empty">
                  یک یا چند مورد را انتخاب کنید
                </span>
              ) : (
                selected.map(val => (
                  <Chip
                    key={val}
                    className="chip"
                    label={getOptionLabel(val)}
                    onDelete={() => handleDeleteItem(val)}
                  />
                ))
              )}
            </div>
          )}
          onChange={handleChange}
        >
          {selectedItems.length >= max ? (
            <MenuItem>شما تنها قادر به انتخاب {max} مورد هستید</MenuItem>
          ) : (
            renderItems()
          )}
        </Select>
      </FormControl>
    </Wrapper>
  );
}

SelectBox.propTypes = {
  data: PropTypes.object.isRequired,
  value: PropTypes.array,
  newTag: PropTypes.object,
  max: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onAddNewTag: PropTypes.func.isRequired,
};

SelectBox.defaultProps = {
  max: 5,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectTags(),
  newTag: makeSelectAddTag(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddNewTag: tag => dispatch(addTagAction(tag)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(SelectBox);
