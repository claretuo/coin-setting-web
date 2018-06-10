import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col, message, Card, Button, Spin, InputNumber } from 'antd';
import * as allowanceActions from 'redux/modules/allowance';

const { string, bool, func } = PropTypes;

@connect( state => ({
  allowance: state.allowance.allowance,
  loading: state.allowance.loading,
  created: state.allowance.created,
  error: state.allowance.error,
}),
{ ...allowanceActions })
export default class Allowance extends Component {
  static propTypes = {
    allowance: string,
    loading: bool.isRequired,
    created: bool.isRequired,
    error: string,
    resetError: func.isRequired,
    load: func.isRequired,
    createAllowance: func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      coinName: '',
      queryFromAddress: '',
      queryParentAddress: '',
      queryAddress: '',
      formCoinName: '',
      form: {
        fromAddress: '',
        address: '',
        parentAddress: '',
        value: undefined,
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
      queryAddress: value
    });
  }
  fromAddressChange = (evt) => {
    const { value } = evt.target;
    this.setState({
      queryFromAddress: value
    });
  }
  parentAddressChange = (evt) => {
    const { value } = evt.target;
    this.setState({
      queryParentAddress: value
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
    const { coinName, queryAddress, queryFromAddress, queryParentAddress } = this.state;
    this.props.load(coinName, {
      address: queryAddress,
      fromAddress: queryFromAddress,
      parentAddress: queryParentAddress
    });
  }

  createAllowance = () => {
    const { formCoinName, form } = this.state;
    this.props.createAllowance(formCoinName, { ...form });
  }

  render() {
    const { allowance, loading } = this.props;
    const { coinName, queryAddress, formCoinName, form, queryFromAddress, queryParentAddress } = this.state;
    const { fromAddress, parentAddress, address, value, password } = form;
    return (
      <Row>
        <Spin spinning={loading}>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="限额" extra={`限额: ${allowance || '--'}`} style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={8}>
                  <Input value={coinName} onChange={this.coinNameChange} placeholder="货币名称" />
                </Col>
                <Col span={8}>
                  <Input value={queryAddress} onChange={this.addressChange} placeholder="地址" />
                </Col>
                <Col span={8}>
                  <Input value={queryFromAddress} onChange={this.fromAddressChange} placeholder="来源地址" />
                </Col>
                <Col span={8}>
                  <Input value={queryParentAddress} onChange={this.parentAddressChange} placeholder="上级地址" />
                </Col>
                <Col span={8}>
                  <Button type="primary" onClick={this.load}>查询</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="设置限额" style={{borderRadius: '5px'}}>
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
                  <Input value={address} placeholder="目标地址" onChange={this.formChange.bind(this, 'address')} />
                </Col>
                <Col span={4}>上级地址</Col>
                <Col span={8}>
                  <Input value={parentAddress} placeholder="上级地址" onChange={this.formChange.bind(this, 'parentAddress')} />
                </Col>
                <Col span={4}>数量</Col>
                <Col span={8}>
                  <InputNumber value={value} placeholder="数量" onChange={this.formChange.bind(this, 'value')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={password} placeholder="交易密码" onChange={this.formChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.createAllowance}>设置限额</Button></Col>
              </Row>
            </Card>
          </Col>
        </Spin>
      </Row>
    );
  }
}
