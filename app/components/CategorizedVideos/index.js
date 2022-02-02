/**
 *
 * CategorizedVideos
 *
 */

import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { makeSelectCategorizedVideos } from 'containers/App/selectors';
import { getCategorizedVideosAction } from 'containers/App/actions';
import LoadingWithText from 'components/LoadingWithText';
import SlidableVideoList from 'components/SlidableVideoList';
import ErrorMessage from 'components/ErrorMessage';

import { CategorizedVideosWrapper } from './styles';

function CategorizedVideos({
  search,
  categorizedVideos,
  handleGetCategorizedVideos,
}) {
  const { loading, data, error } = categorizedVideos;

  useEffect(() => {
    handleGetCategorizedVideos({
      playlist: search.get('playlist'),
      tag: search.get('tag'),
      search: search.get('search'),
    });
  }, [search]);

  return (
    <CategorizedVideosWrapper>
      {loading && <LoadingWithText text="در حال بارگذاری ویدیو ها" />}

      {error && (
        <ErrorMessage
          error={error}
          forceMessage="در بارگذاری ویدیو ها مشکلی به وجود آمده است صفحه را دوباره بارگذاری کنید"
        />
      )}

      {data &&
        data.map(item => <SlidableVideoList key={item.id} category={item} />)}
    </CategorizedVideosWrapper>
  );
}

CategorizedVideos.propTypes = {
  search: PropTypes.object.isRequired,
  categorizedVideos: PropTypes.object.isRequired,
  handleGetCategorizedVideos: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  categorizedVideos: makeSelectCategorizedVideos(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetCategorizedVideos: params =>
      dispatch(getCategorizedVideosAction(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(CategorizedVideos);
