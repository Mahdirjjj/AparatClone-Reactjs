/**
 *
 * CountingTextArea
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

const CountingTextAreaWrapper = styled.div`
  text-align: left;
  margin: 0.5em;

  > .btn {
    border-radius: 15px;
    padding: 0.3em 0;
    margin: 0 0.2em;

    &.btn-ok:not(:disabled) {
      background: #05a3e8;
      color: #fff;

      :hover {
        opacity: 0.8;
      }
    }
  }

  > .textCounter {
    float: right;
    color: #444;
    font-size: 0.8em;
    padding-rigth: 0.8em;
  }
`;

function CountingTextArea({
  defaultValue,
  maxLength,
  cancelable,
  placeholder,
  onChange,
}) {
  const [value, setValue] = useState(defaultValue);

  const remainLength = maxLength - value.length;

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleOnOk() {
    onChange(value);
  }

  function handleOnCancel() {
    onChange(null);
  }

  return (
    <CountingTextAreaWrapper className="CountingTextArea">
      <TextField
        fullWidth
        multiline
        rows="4"
        margin="normal"
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />

      <span className="textCounter">
        {remainLength > -1
          ? `کاراکتر باقیمانده ${remainLength}`
          : 'طول ورودی قابل قبول نیست'}
      </span>

      <Button
        disabled={!value.length || value.length > maxLength}
        className="btn btn-ok"
        onClick={handleOnOk}
      >
        تایید
      </Button>

      {cancelable && (
        <Button className="btn" onClick={handleOnCancel}>
          انصراف
        </Button>
      )}
    </CountingTextAreaWrapper>
  );
}

CountingTextArea.propTypes = {
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
  cancelable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

CountingTextArea.defaultProps = {
  defaultValue: '',
  placeholder: '',
  cancelable: true,
};

export default memo(CountingTextArea);
