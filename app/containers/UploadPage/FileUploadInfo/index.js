import React, { memo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Grid,
  Tabs,
  Tab,
  TextField,
  Switch,
  FormControlLabel,
} from '@material-ui/core';

import CategorySelectBox from 'components/CategorySelectBox';
import TagSelectBox from 'components/TagSelectBox';
import PlayListSelectBox from 'components/PlayListSelectBox';

const Wrapper = styled.div`
  // flex-grow: 1;

  & .tabs {
    border-bottom: 1px solid #ddd;

    & .MuiTabs-indicator {
      background-color: #666;
      height: 1px;
    }
  }

  & .tabContent {
    padding: 1rem;
  }

  & .inputWrapper {
    margin-bottom: 1rem;

    & label {
      font-weight: bold;
      padding-bottom: 0.8rem;
      display: inline-block;
    }

    & .input {
      background: #fff;
    }
  }
`;

function FileUploadInfo({ data, onChange }) {
  const [selectedTab, setSelectedTab] = useState(0);

  function changeData(key, value) {
    const newData = { ...data, [key]: value };
    onChange(newData);
  }

  return (
    <Wrapper>
      <Tabs
        value={selectedTab}
        onChange={(e, tabIndex) => {
          setSelectedTab(tabIndex);
        }}
        indicatorColor="primary"
        textColor="primary"
        className="tabs"
      >
        <Tab label="مشخصات ویدیو" />
        <Tab label="تنظیمات پیشترفته" />
      </Tabs>

      <Grid container>
        {selectedTab === 0 && (
          <Grid container spacing={2} className="tabContent">
            <Grid item xs={12} sm={6} className="inputWrapper">
              <TextField
                fullWidth
                id="inp-title"
                className="input"
                variant="outlined"
                label="عنوان ویدیو"
                defaultValue={data.title}
                onChange={e => changeData('title', e.target.value.trim())}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <CategorySelectBox
                fullWidth
                id="inp-category"
                variant="outlined"
                className="input"
                label="دسته بندی آپارات"
                value={data.category}
                onChange={value => changeData('category', value)}
              />
            </Grid>

            <Grid item xs={12} className="inputWrapper">
              <TextField
                fullWidth
                id="inp-info"
                multiline
                rows={3}
                rowsMax={3}
                className="input"
                variant="outlined"
                label="توضیحات اضافه"
                defaultValue={data.info}
                onChange={e => changeData('info', e.target.value.trim())}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <TagSelectBox
                fullWidth
                id="inp-tag"
                variant="outlined"
                className="input"
                label="برچسپ ها"
                max={5}
                value={data.tags}
                onChange={value => changeData('tags', value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <CategorySelectBox
                fullWidth
                channel
                id="inp-category-channel"
                variant="outlined"
                className="input"
                label="دسته بندی کانال"
                value={data.channel_category}
                onChange={value => changeData('channel_category', value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <PlayListSelectBox
                fullWidth
                id="inp-playlist"
                variant="outlined"
                className="input"
                label="لیست پخش"
                value={data.playlist}
                onChange={value => changeData('playlist', value)}
              />
            </Grid>
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid item className="tabContent">
            <FormControlLabel
              control={
                <Switch
                  checked={data.enable_watermark}
                  onChange={event =>
                    changeData('enable_watermark', event.target.checked)
                  }
                  value="enable_watermark"
                  color="primary"
                />
              }
              label="افزودن واترمارک"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={data.enable_comments}
                  onChange={event =>
                    changeData('enable_comments', event.target.checked)
                  }
                  value="enable_comments"
                  color="primary"
                />
              }
              label="امکان ثبت نظرات"
            />
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
}

FileUploadInfo.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(FileUploadInfo);
