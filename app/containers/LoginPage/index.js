/**
 *
 * LoginPage
 *
 */

import {
  Button,
  Card,
  CardContent,
  Grid,
  InputBase,
  Paper,
} from '@material-ui/core';
import {
  ArrowForward as ArrowIcon,
  Person as PersonIcon,
  VpnKey as PasswordIcon,
} from '@material-ui/icons';
import Alert from 'components/Alert';
import Logo from 'components/Logo';
import { push } from 'connected-react-router';
import { ROUTE_HOME } from 'containers/App/routes';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { converSecondToTime } from 'utils/helpers';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  loginAction,
  loginReinitAction,
  registerUserAction,
  registerUserReinitAction,
  registerUserVerifyAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectLogin,
  makeSelectRegisterUser,
  makeSelectRegisterUserVerify,
} from './selectors';
import { LoginWrapper } from './style';

export function LoginPage({
  loginData,
  registerData,
  registerVerifyData,
  redirect,
  onLoginSubmit,
  onRegisterSubmit,
  onHideError,
  clearRegisterSubmit,
  clearLoginSubmit,
  onRegisterVerifySubmit,
}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const [registerUser, setRegisterUser] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerVerifyCode, sertRegisterVerifyCode] = useState('');
  const [messageAlert, setMessageAlert] = useState(null);
  const [verifyCounter, setVerifyCounter] = useState(0);
  let verifyTimerHandler = null;

  useEffect(
    () => () => {
      clearRegisterSubmit();
      clearLoginSubmit();
      clearVerifyTimer();
    },
    [],
  );

  useEffect(() => {
    if (registerData.data) {
      if (registerData.data.message) {
        setMessageAlert(registerData.data.message);
      }

      clearVerifyTimer();
      setVerifyCounter(59);
    }
  }, [registerData.data]);

  useEffect(() => {
    if (verifyCounter) {
      verifyTimerHandler = setTimeout(() => {
        setVerifyCounter(verifyCounter - 1);
      }, 1000);
    }

    clearVerifyTimer();
  }, [verifyCounter]);

  function clearVerifyTimer() {
    if (!verifyCounter && verifyTimerHandler) {
      clearTimeout(verifyTimerHandler);
    }
  }

  function toggleRegisterUserForm() {
    setRegisterUser(!registerUser);
    setUsername('');
    setPassword('');
  }

  function handleRegisterSubmit() {
    clearRegisterSubmit();
    clearVerifyTimer();
    onRegisterSubmit({
      [username.includes('@') ? 'email' : 'mobile']: username,
    });
  }

  function handleRegisterVerifySubmit() {
    onRegisterVerifySubmit({
      [username.includes('@') ? 'email' : 'mobile']: username,
      code: registerVerifyCode,
    });
  }

  return (
    <LoginWrapper
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Helmet>
        <title>login page</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>

      <Grid item xs={12} className="wrapper">
        <Grid item xs={12}>
          <Logo className="logo" />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            size="small"
            className="backButton"
            onClick={() => redirect(ROUTE_HOME)}
          >
            <ArrowIcon className="arrowIcon" />
            بازگشت
          </Button>

          <Alert
            show={!!loginData.error}
            message="اطلاعات وارد شده مطابقت ندارد"
            onClose={onHideError}
          />

          {messageAlert && (
            <Alert
              message={messageAlert}
              type="info"
              onClose={() => setMessageAlert(null)}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          {registerUser && (
            <Card>
              <Grid container className="actionArea">
                <Grid item xs={12} sm={8}>
                  <span className="label">
                    اگر در آپارات حساب کاربری دارید وارد شوید:
                  </span>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={toggleRegisterUserForm}
                  >
                    ورود به حساب کاربری
                  </Button>
                </Grid>
              </Grid>

              <CardContent className="actionArea">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item xs={12} sm={9}>
                    {!registerData.data && (
                      <Paper className="formInput">
                        <PersonIcon className="inputIcon" />
                        <InputBase
                          className="input"
                          placeholder="موبایل یا ایمیل خود را وارد نمایید"
                          defaultValue={username}
                          onChange={e => setUsername(e.target.value.trim())}
                        />
                      </Paper>
                    )}

                    {registerData.data && (
                      <Paper className="formInput">
                        <PersonIcon className="inputIcon" />
                        <InputBase
                          className="input"
                          placeholder="کد تایید را وارد نمایید"
                          defaultValue={registerVerifyCode}
                          onChange={e =>
                            sertRegisterVerifyCode(e.target.value.trim())
                          }
                        />
                      </Paper>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      disabled={
                        !!registerVerifyData.data ||
                        !username.trim().length ||
                        (registerData.data && !registerVerifyCode.trim().length)
                      }
                      fullWidth
                      onClick={
                        registerData.data
                          ? handleRegisterVerifySubmit
                          : handleRegisterSubmit
                      }
                    >
                      {registerData.data ? 'تایید' : 'ادامه'}
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    {registerData.data && (
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={verifyCounter !== 0}
                        fullWidth
                        onClick={handleRegisterSubmit}
                      >
                        ارسال مجدد (
                        {converSecondToTime(verifyCounter).substr(3)})
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {!registerUser && (
            <Card>
              <Grid container className="actionArea">
                <Grid item xs={12} sm={8}>
                  <span className="label">
                    اگر در آپارات حساب کاربری ندارید، ثبت نام کنید:
                  </span>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={toggleRegisterUserForm}
                  >
                    ایجاد حساب کاربری
                  </Button>
                </Grid>
              </Grid>

              <CardContent className="actionArea">
                <div className="label">
                  اگر در آپارات حساب کاربری دارید، وارد شوید:
                </div>

                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item xs={12} sm={9}>
                    <Paper className="formInput">
                      <PersonIcon className="inputIcon" />
                      <InputBase
                        className="input"
                        placeholder="موبایل یا نام کاربری یا ایمیل"
                        defaultValue={username}
                        onChange={e => setUsername(e.target.value.trim())}
                      />
                    </Paper>

                    <Paper className="formInput">
                      <PasswordIcon className="inputIcon" />
                      <InputBase
                        className="input"
                        placeholder="گذرواژه خود را وارد کنید"
                        defaultValue={password}
                        onChange={e => setPassword(e.target.value.trim())}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      disabled={
                        !username.trim().length || !password.trim().length
                      }
                      fullWidth
                      onClick={() => onLoginSubmit(username, password)}
                    >
                      ورود
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </LoginWrapper>
  );
}

LoginPage.propTypes = {
  loginData: PropTypes.object.isRequired,
  registerData: PropTypes.object.isRequired,
  registerVerifyData: PropTypes.object.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  onRegisterSubmit: PropTypes.func.isRequired,
  onRegisterVerifySubmit: PropTypes.func.isRequired,
  clearRegisterSubmit: PropTypes.func.isRequired,
  clearLoginSubmit: PropTypes.func.isRequired,
  onHideError: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginData: makeSelectLogin(),
  registerData: makeSelectRegisterUser(),
  registerVerifyData: makeSelectRegisterUserVerify(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginSubmit: (username, password) =>
      dispatch(loginAction(username, password)),
    onRegisterSubmit: data => dispatch(registerUserAction(data)),
    onRegisterVerifySubmit: data => dispatch(registerUserVerifyAction(data)),
    clearRegisterSubmit: () => dispatch(registerUserReinitAction()),
    clearLoginSubmit: () => dispatch(loginReinitAction()),
    onHideError: () => dispatch(loginReinitAction()),
    redirect: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
