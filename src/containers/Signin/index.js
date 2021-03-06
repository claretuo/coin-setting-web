import React, { Component, PropTypes } from 'react';
import { SigninForm } from 'components';
import { Card, message, Spin } from 'antd';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    logining: state.auth.logining,
    msg: state.auth.msg,
    error: state.auth.error,
    user: state.auth.user
  }),
  { ...authActions })
export default class Signin extends Component {
  static propTypes = {
    logining: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    msg: PropTypes.string,
    error: PropTypes.string,
    user: PropTypes.object,
    history: PropTypes.object
  }
  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object
  }
  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {
    const { msg, error } = nextProps;
    if (msg && msg !== this.props.msg) {
      message.success(msg);
    }
    if (error && error !== this.props.error) {
      message.error(error);
    }
  }
  validateForm = (which, callback) => {
    const form = this.form[which];
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      callback(values);
    });
  }
  signin = () => {
    this.validateForm('normal', (values) => {
      this.props.logout().then(() => this.props.login(values.identifer, values.pass));
    });
  }
  saveFormRef = (which, form) => {
    this.form = this.form || {};
    this.form[which] = form;
  }
  render() {
    const { logining } = this.props;
    const loading = logining || false;
    const styles = require('./signin.scss');
    return (
      <div className={styles.container}>
        <Helmet title="登录"/>
        <Spin size="large" spinning={loading} style={{width: '100%', height: '100%'}}>
          <Card title={<h1 className={styles.title}><i className={styles.icon}></i>USC管理后台</h1>} className={styles.signForm}>
            <SigninForm ref={this.saveFormRef.bind(this, 'normal')} forgotPass={this.forgotPass} onCreate={this.signin}/>
          </Card>
        </Spin>
      </div>
    );
  }
}
