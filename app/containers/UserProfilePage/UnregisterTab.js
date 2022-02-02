import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { WarningOutlined as WarningIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { unregisterUserAction } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectUnregisterUser } from 'containers/App/selectors';
import Confirm from 'components/Confirm';
import ErrorMessage from 'components/ErrorMessage';

const UnregisterTabWrapper = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;
  padding: 2em;

  > .warningMessage {
    background: #eee;
    padding: 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > .warningIcon {
      font-size: 5em;
      padding: 0.2em;
    }
  }

  > .unregisterBtn {
    border-radius: 15px;
    padding: 0.7em 2em;
    margin: 0.2em;
  }

  > p {
    padding: 1em 0;
  }
`;

function UnregisterTab({ unregisterData, handleUnregisterUser }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <UnregisterTabWrapper>
      <div className="warningMessage">
        <WarningIcon className="warningIcon" />
        باغیر فعالسازی عضویت ، تمامی ویدیوهای شما،از دسترس خارج خواهند شد. پس از
        غیر فعالسازی عضویت ،تنها با یک بار لاگین در سایت ،عضویت شما در سایت
        مجدداً فعال خواهد شد.
      </div>

      <p>
        لطفاً، پس از مطالعه موارد فوق چنانچه برای غیر فعالسازی عضویت از سایت،
        موافق هستید دکمه زیر را کلیک کنید
      </p>

      <Button
        className="unregisterBtn"
        variant="contained"
        color="secondary"
        disabled={unregisterData.loading}
        onClick={() => setShowDeleteModal(true)}
      >
        {unregisterData.loading ? 'در حال انجام لغو عضویت' : 'لغو عضویت'}
      </Button>

      {unregisterData.error && (
        <ErrorMessage
          error={unregisterData.error}
          forceMessage="در حذف حساب کاربری خطایی به وجود آمده است"
        />
      )}

      <Confirm
        title="حذف حساب کاربری"
        open={showDeleteModal}
        okTitle="بله، حذف شود"
        onOk={() => {
          setShowDeleteModal(false);
          handleUnregisterUser();
        }}
        onCancel={() => setShowDeleteModal(false)}
      >
        آیا مطمئن هستید که می خواهید حساب کاربری خود را غیر فعال کنید؟
      </Confirm>
    </UnregisterTabWrapper>
  );
}

UnregisterTab.propTypes = {
  unregisterData: PropTypes.object.isRequired,
  handleUnregisterUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  unregisterData: makeSelectUnregisterUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleUnregisterUser: () => dispatch(unregisterUserAction()),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(UnregisterTab);
