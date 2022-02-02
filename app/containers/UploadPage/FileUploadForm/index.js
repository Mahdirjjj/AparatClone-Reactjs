import React from 'react';
import FileDrop from 'react-file-drop';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CloudQueue as UpCloudIcon,
  ArrowUpward as ArrowUpwardIcon,
} from '@material-ui/icons';

const Wrapper = styled.div`
  & .fileDrop {
    position: relative;
    border: 2px dashed #ddd;
    margin: 25px 0;
    padding: 25px;
    height: 190px;
  }

  & .fileDrop .MuiSvgIcon-root {
    position: absolute;
    left: 30px;
    top: -10px;
    color: #cfcfcf;
    font-size: 160px;
    height: 100%;
  }

  & .fileDrop .MuiSvgIcon-root.upArrowIcon {
    font-size: 120px;
    left: 48px;
    top: 16px;
  }

  & .fileDrop > div,
  & .fileDrop b {
    display: block;
    width: 300px;
    text-align: center;
    color: #ccc;
    font-size: 1.2rem;
  }

  & .fileDrop b {
    margin-bottom: 25px;
  }

  & .fileDrop .fileDropTitle {
    color: #6a6a6a;
  }

  & .fileDrop button {
    font-size: 0.9rem;
    font-weight: bold;
    color: #757575;
    border: 1px solid #cbcbcb;
    background: #fff;
    border-radius: 2px;
    padding: 5px 15px;
    outline: none;
  }

  & [type='file'] {
    display: none;
  }
`;

function FileUploadForm({ onSelect }) {
  let fileSelectorRef = null;

  const handleDrop = files => {
    if (files) {
      const file = files[0];
      if (file.type !== 'video/mp4') {
        // eslint-disable-next-line no-alert
        return alert('فقط فایل های ویدیوو با پسوند mp4 را انتخاب کنید');
      }

      if (file.size < 100 || file.size > 100000000) {
        // eslint-disable-next-line no-alert
        return alert('حجم ویدیو انتخاب شده مناسب نیست');
      }

      onSelect(file);
    }

    return false;
  };

  const whantToSelectFile = () => {
    fileSelectorRef.click();
  };

  const onSelectFileFromFileSelector = e => handleDrop(e.target.files);

  return (
    <Wrapper>
      <FileDrop onDrop={handleDrop} className="fileDrop">
        <div>
          <b className="fileDropTitle">فایل خود را اینجا بکشید</b>
          <b>یا</b>
          <button type="button" onClick={whantToSelectFile}>
            انتخاب فایل
          </button>
          <input
            type="file"
            ref={el => {
              fileSelectorRef = el;
            }}
            onChange={onSelectFileFromFileSelector}
          />
        </div>

        <UpCloudIcon />
        <ArrowUpwardIcon className="upArrowIcon" />
      </FileDrop>
    </Wrapper>
  );
}

FileUploadForm.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default FileUploadForm;
