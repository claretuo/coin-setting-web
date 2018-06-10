import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col, message, Card, Button, Spin } from 'antd';
import * as frozenAccountActions from 'redux/modules/frozenAccount';

const { string, bool, func } = PropTypes;

@connect( state => ({
  frozenAccount: state.frozenAccount.frozenAccount,
  loading: state.frozenAccount.loading,
  created: state.frozenAccount.created,
  error: state.frozenAccount.error,
}),
{ ...frozenAccountActions })
export default class FrozenAccount extends Component {
  static propTypes = {
    frozenAccount: string,
    loading: bool.isRequired,
    created: bool.isRequired,
    error: string,
    resetError: func.isRequired,
    load: func.isRequired,
    createFrozenAccount: func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      coinName: '',
      address: '',
      formCoinName: '',
      form: {
        fromAddress: '',
        toAddress: '',
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

  addressChange = (evt) => {
    const { value } = evt.target;
    this.setState({
      address: value
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
    const { coinName, address } = this.state;
    this.props.load(coinName, address);
  }

  createFrozenAccount = () => {
    const { formCoinName, form } = this.state;
    this.props.createFrozenAccount(formCoinName, { ...form, isFrozen: true});
  }

  render() {
    const { frozenAccount, loading } = this.props;
    const { coinName, address, formCoinName, form } = this.state;
    const { fromAddress, toAddress, password } = form;
    return (
      <Row>
        <Spin spinning={loading}>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="已冻结账号" extra={`已冻结账号: ${frozenAccount || '--'}`} style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={8}>
                  <Input value={coinName} onChange={this.coinNameChange} placeholder="货币名称" />
                </Col>
                <Col span={8}>
                  <Input value={address} onChange={this.addressChange} placeholder="地址" />
                </Col>
                <Col span={8}>
                  <Button type="primary" onClick={this.load}>查询</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="冻结账户" style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={4}>货币名称</Col>
                <Col span={8}>
                  <Input value={formCoinName} placeholder="货币名称" onChange={this.formChange.bind(this, 'formCoinName')} />
                </Col>
                <Col span={4}>来源地址</Col>
                <Col span={8}>
                  <Input value={fromAddress} placeholder="来源地址" onChange={this.formChange.bind(this, 'fromAddress')} />
                </Col>
                <Col span={4}>目标地址</Col>
                <Col span={8}>
                  <Input value={toAddress} placeholder="目标地址" onChange={this.formChange.bind(this, 'toAddress')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={password} placeholder="交易密码" onChange={this.formChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.createFrozenAccount}>冻结账户</Button></Col>
              </Row>
            </Card>
          </Col>
        </Spin>
      </Row>
    );
  }
}
