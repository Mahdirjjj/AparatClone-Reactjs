import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextField, MenuItem } from '@material-ui/core';

const Wrapper = styled.div`
  & .formControl {
    width: 100%;
  }
`;

function SelectBox({ options, value, onChange, ...props }) {
  return (
    <Wrapper>
      <TextField
        select
        {...props}
        value={value || ''}
        dispatch={null}
        onChange={(e, val) => onChange(val.props.value, val.props.children)}
      >
        {Object.keys(options).map(key => (
          <MenuItem key={key} value={key}>
            {options[key]}
          </MenuItem>
        ))}
      </TextField>
    </Wrapper>
  );
}

SelectBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
};

SelectBox.defaultProps = {
  value: '',
};

export default memo(SelectBox);
