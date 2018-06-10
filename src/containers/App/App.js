import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from '../../config';
import * as authActions from 'redux/modules/auth';
import { Header } from 'components';
import { message } from 'antd';

@connect(
  state => ({
    user: state.auth.user,
    msg: state.auth.msg,
    error: state.auth.error
  }),
  { ...authActions })
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    resetMsg: PropTypes.func.isRequired,
    resetError: PropTypes.func.isRequired,
    msg: PropTypes.string,
    error: PropTypes.string,
    routes: PropTypes.array,
    params: PropTypes.object
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object
  }
  constructor() {
    super();
  }
  componentWillReceiveProps(nextProps) {
    const { user, msg, error } = nextProps;
    const { router } = this.context;
    if (user && !this.props.user) {
      router.push('/');
    }
    if (!user && this.props.user) {
      router.push('/signin');
    }
    if (msg && msg !== this.props.msg) {
      message.success(msg);
      this.props.resetMsg();
    }
    if (error && error !== this.props.error) {
      message.error(error);
      this.props.resetError();
    }
  }

  validateForm = (callback) => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      callback(values);
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const { user, children, logout } = this.props;
    const styles = require('./App.scss');
    const path = location.pathname;
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        { path !== '/signin' && user ?
          <Header user={user} showDetail={this.showDetail} logout={logout} />
          : null
        }
        { path !== '/signin' && user ?
          <div className={styles.appContent} style={{ left: '240px', maxHeight: window.screen.height - 90 + 'px', overflowY: 'auto'}}>
            {children}
          </div>
          : children
        }
      </div>
    );
  }
}
