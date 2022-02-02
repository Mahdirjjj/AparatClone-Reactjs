import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getMyCategoriesAction,
  addCategoryAction,
  editCategoryAction,
} from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectMyCategories,
  makeSelectAddCategory,
  makeSelectEditCategory,
  makeSelectUserMe,
} from 'containers/App/selectors';
import ErrorMessage from 'components/ErrorMessage';
import NoItemInList from 'components/NoItemInList';
import { Button, InputBase } from '@material-ui/core';
import { AddOutlined, EditOutlined, CloseOutlined } from '@material-ui/icons';

const CategoriesTabWrapper = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;
  padding: 2em;
  padding-top: 0;

  > .topBar {
    border-bottom: 1px solid #eee;
    padding: 0.5em 0;
    margin-bottom: 2.5em;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > .userAvatar {
      width: 36px;
      height: 36px;
      border: 1px solid #ccc;
      background: white;
      padding: 2px;
      border-radius: 100%;
      margin-left: 1em;
    }

    > .channelName {
      > span {
        color: #888;
        font-weight: 500;
      }
    }

    > .addButton {
      border-radius: 15px;
      position: absolute;
      left: 2em;

      .icon {
        font-size: 1.2em;
        margin-left: 0.1em;
        color: #888;
      }
    }
  }

  .addCategoryBox {
    background: #f5f5f9;
    padding: 1em;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 200ms ease;
    height: 110px;

    &.hide {
      height: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    label {
      font-weight: bold;
    }
  }

  .editCategoryBox {
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: all 300ms ease;

    &.hide {
      opacity: 0;
      right: 50%;
      transform: scale(0, 0);
    }
  }

  .buttonWrapper {
    margin-top: 0.5em;
  }
`;

const CategoryWrapper = styled.div`
  background: #fff;
  color: #000;
  padding: 1.5em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  position: relative;

  :hover {
    background: #eee;
  }

  > .categoryTitle {
    margin: 0;
    padding: 0;
    font-size: 1em;
  }

  > .videoCount {
    margin-right: 0.8em;
    font-size: 0.9em;
    color: #555;
  }

  .editBtn {
    border: 1px solid #ece9e9;
    border-radius: 100%;
    position: absolute;
    left: 1em;
    width: 30px;
    height: 30px;
    padding: 3px;
    background: #fff;
    color: #268bf3;

    :hover {
      border-color: #ccc;
    }
  }
`;

function CategoriesTab({
  categoriesData,
  addCategory,
  editCategory,
  userData,
  handleGetMyCategories,
  handleAddCategory,
  handleEditCategory,
}) {
  const userInfo = userData.data;
  let addCategoryBoxRef = null;
  let addCategoryInput = null;

  useEffect(() => {
    handleGetMyCategories();
  }, []);

  useEffect(() => {
    if (addCategory.data) {
      addCategoryBoxRef.classList.toggle('hide');
      addCategoryInput.value = '';
    }
  }, [addCategory.data]);

  function handleAddCategoryButtonClick() {
    addCategoryBoxRef.classList.toggle('hide');
  }

  function handleAddCategorySubmitButtonClick() {
    handleAddCategory(addCategoryInput.value);
  }

  function handleShowEditCategoryBox(e) {
    e.currentTarget.nextElementSibling.classList.remove('hide');
  }

  function handleHideEditCategoryBox(e) {
    e.currentTarget.parentElement.classList.add('hide');
  }

  function handleEditCategorySubmitButtonClick(e) {
    const id = +e.currentTarget.dataset.categoryId;
    const title = e.currentTarget.parentElement.querySelector('.input input')
      .value;

    handleEditCategory(id, title);
  }

  return (
    <CategoriesTabWrapper>
      <div className="topBar">
        <img className="userAvatar" src={userInfo.avatar} alt="تصویر کاربر" />
        <h4 className="channelName">
          {userInfo.channel.name} / <span>دسته بندی ها</span>
        </h4>

        <Button
          className="addButton"
          variant="outlined"
          onClick={handleAddCategoryButtonClick}
          disabled={!!addCategory.title}
        >
          <AddOutlined className="icon" />
          افزودن
        </Button>
      </div>

      <div
        className="addCategoryBox hide"
        ref={el => {
          addCategoryBoxRef = el;
        }}
      >
        <label htmlFor="category-add-input">
          نام دسته‌بندی جدید را وارد کنید
        </label>

        <InputBase
          className="input"
          id="category-add-input"
          fullWidth
          inputProps={{
            ref: el => {
              addCategoryInput = el;
            },
          }}
        />

        <div className="buttonWrapper">
          <Button
            className="btn btn-cancel"
            onClick={handleAddCategoryButtonClick}
          >
            انصراف
          </Button>
          <Button
            className="btn btn-accept"
            disabled={!!addCategory.title}
            onClick={handleAddCategorySubmitButtonClick}
          >
            افزودن
          </Button>
        </div>
      </div>

      {categoriesData.data &&
        categoriesData.data.length &&
        categoriesData.data.map(category => (
          <CategoryWrapper key={category.id}>
            <h5 className="categoryTitle">{category.title}</h5>
            <div className="videoCount">
              تعداد ویدیو ها ({category.videoCount || 0})
            </div>

            <EditOutlined
              className="editBtn"
              onClick={handleShowEditCategoryBox}
            />

            <div className="editCategoryBox hide">
              <CloseOutlined onClick={handleHideEditCategoryBox} />

              <InputBase className="input" defaultValue={category.title} />

              <Button
                className="btn btn-accept"
                data-category-id={category.id}
                disabled={!!editCategory.id}
                onClick={handleEditCategorySubmitButtonClick}
              >
                ویرایش
              </Button>
            </div>
          </CategoryWrapper>
        ))}

      {!(categoriesData.data && categoriesData.data.length) && (
        <NoItemInList title="هیچ لیستی برای شما وجود ندارد" />
      )}

      {categoriesData.error && (
        <ErrorMessage
          error={categoriesData.error}
          forceMessage="در دریافت لیست دسته بندی ها خطایی به وجود آمده است"
        />
      )}
    </CategoriesTabWrapper>
  );
}

CategoriesTab.propTypes = {
  categoriesData: PropTypes.object.isRequired,
  addCategory: PropTypes.object.isRequired,
  editCategory: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  handleGetMyCategories: PropTypes.func.isRequired,
  handleAddCategory: PropTypes.func.isRequired,
  handleEditCategory: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  categoriesData: makeSelectMyCategories(),
  addCategory: makeSelectAddCategory(),
  editCategory: makeSelectEditCategory(),
  userData: makeSelectUserMe(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetMyCategories: withVideoCount =>
      dispatch(getMyCategoriesAction(withVideoCount)),
    handleAddCategory: title => dispatch(addCategoryAction(title)),
    handleEditCategory: (id, title) => dispatch(editCategoryAction(id, title)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(CategoriesTab);
