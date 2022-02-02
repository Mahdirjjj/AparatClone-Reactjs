/**
 *
 * ManageUsersPage
 *
 */

import ErrorMessage from 'components/ErrorMessage';
import LoadingWithText from 'components/LoadingWithText';
import ReloaderMessage from 'components/ReloaderMessage';
import { getUsersAction } from 'containers/App/actions';
import { makeSelectUsers } from 'containers/App/selectors';
import DashboardLayout from 'layouts/DashboardLayout';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import UserModal from './UserModal';
import UsersTable from './UsersTable';

export function ManageUsersPage({ users, dispatch }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const emptyList =
    !users.params && (users.data && users.data.data && !users.data.data.length);

  useEffect(getUsersFromServer, [page, pageSize]);

  function getUsersFromServer() {
    dispatch(getUsersAction({ page, size: pageSize }));
  }

  function handlePageChange(p, s) {
    setPage(p);
    setPageSize(s);
  }

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>مدیریت کاربران</title>
        <meta name="description" content="مدیریت کاربران" />
      </Helmet>

      {!!(users.data && users.data.data && users.data.data.length) && (
        <UsersTable
          users={users.data.data}
          page={page}
          size={pageSize}
          total={users.data.total}
          onChangePage={handlePageChange}
          onRowClick={setSelectedUser}
        />
      )}

      {emptyList && (
        <ReloaderMessage
          message="هیچ کاربری ای یافت نشد"
          reloadMessage="بارگذاری مجدد"
          onReload={getUsersFromServer}
        />
      )}

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {users.params && <LoadingWithText text="در حال دریافت لیست کاربران" />}

      {users.error && (
        <ErrorMessage
          error={users.error}
          closeable={false}
          forceMessage={
            <ReloaderMessage
              message="در دریافت اطلاعات کاربران خطایی به وجود آمده است"
              reloadMessage="بارگذاری مجدد"
              onReload={getUsersFromServer}
            />
          }
        />
      )}
    </DashboardLayout>
  );
}

ManageUsersPage.propTypes = {
  users: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManageUsersPage);
