import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col, message, Card, Button, Spin } from 'antd';
import * as feeAccountActions from 'redux/modules/feeAccount';

const { string, bool, func } = PropTypes;

@connect( state => ({
  feeAccount: state.feeAccount.feeAccount,
  loading: state.feeAccount.loading,
  created: state.feeAccount.created,
  error: state.feeAccount.error,
}),
{ ...feeAccountActions })
export default class FeeAccount extends Component {
  static propTypes = {
    feeAccount: string,
    loading: bool.isRequired,
    created: bool.isRequired,
    error: string,
    resetError: func.isRequired,
    load: func.isRequired,
    createFeeAccount: func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      coinName: '',
      formCoinName: '',
      form: {
        fromAddress: '',
        feeAccount: '',
        password: '',
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (error) {
      message.error(error);
      this.props.resetError();
    }
  }

  coinNameChange = (evt) => {
    const { value } = evt.target;
    this.setState({
      coinName: value
    });
  }

  formChange = (type, evt) => {
    const { value } = evt.target;
    const _this = this;
    if (type === 'formCoinName') {
      this.setState({
        formCoinName: value
      });
    } else {
      this.setState({
        form: {
          ..._this.state.form,
          [type]: value
        }
      });
    }
  }

  load = () => {
    const { coinName } = this.state;
    this.props.load(coinName);
  }

  createFeeAccount = () => {
    const { formCoinName, form } = this.state;
    this.props.createFeeAccount(formCoinName, { ...form });
  }

  render() {
    const { loading } = this.props;
    const { coinName, formCoinName, form } = this.state;
    const { fromAddress, feeAccount, password } = form;
    return (
      <Row>
        <Spin spinning={loading}>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="手续费账户" extra={`手续费账户: ${this.props.feeAccount || '--'}`} style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={8}>
                  <Input value={coinName} onChange={this.coinNameChange} placeholder="货币名称" />
                </Col>
                <Col span={8}>
                  <Button type="primary" onClick={this.load}>查询</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="设置手续费账户" style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={4}>货币名称</Col>
                <Col span={8}>
                  <Input value={formCoinName} placeholder="货币名称" onChange={this.formChange.bind(this, 'formCoinName')} />
                </Col>
                <Col span={4}>地址</Col>
                <Col span={8}>
                  <Input value={fromAddress} placeholder="地址" onChange={this.formChange.bind(this, 'fromAddress')} />
                </Col>
                <Col span={4}>手续费账户</Col>
                <Col span={8}>
                  <Input value={feeAccount} placeholder="数量" onChange={this.formChange.bind(this, 'feeAccount')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={password} placeholder="交易密码" onChange={this.formChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.createFeeAccount}>提交</Button></Col>
              </Row>
            </Card>
          </Col>
        </Spin>
      </Row>
    );
  }
}
