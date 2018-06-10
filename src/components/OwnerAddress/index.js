import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col, message, Card, Button, Spin } from 'antd';
import * as ownerAddressActions from 'redux/modules/ownerAddress';

const { string, bool, func } = PropTypes;

@connect( state => ({
  ownerAddress: state.ownerAddress.ownerAddress,
  loading: state.ownerAddress.loading,
  created: state.ownerAddress.created,
  error: state.ownerAddress.error,
}),
{ ...ownerAddressActions })
export default class OwnerAddress extends Component {
  static propTypes = {
    ownerAddress: string,
    loading: bool.isRequired,
    created: bool.isRequired,
    error: string,
    resetError: func.isRequired,
    load: func.isRequired,
    createOwnerAddress: func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      coinName: '',
      address: '',
      formCoinName: '',
      form: {
        fromAddress: '',
        newOwnerAddress: '',
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

  createOwnerAddress = () => {
    const { formCoinName, form } = this.state;
    this.props.createOwnerAddress(formCoinName, { ...form});
  }

  render() {
    const { ownerAddress, loading } = this.props;
    const { coinName, address, formCoinName, form } = this.state;
    const { fromAddress, newOwnerAddress, password } = form;
    return (
      <Row>
        <Spin spinning={loading}>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="管理员账号" extra={`管理员账号: ${ownerAddress || '--'}`} style={{borderRadius: '5px'}}>
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
            <Card title="设置管理员账号" style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={4}>货币名称</Col>
                <Col span={8}>
                  <Input value={formCoinName} placeholder="货币名称" onChange={this.formChange.bind(this, 'formCoinName')} />
                </Col>
                <Col span={4}>当前地址</Col>
                <Col span={8}>
                  <Input value={fromAddress} placeholder="当前地址" onChange={this.formChange.bind(this, 'fromAddress')} />
                </Col>
                <Col span={4}>新地址</Col>
                <Col span={8}>
                  <Input value={newOwnerAddress} placeholder="新地址" onChange={this.formChange.bind(this, 'newOwnerAddress')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={password} placeholder="交易密码" onChange={this.formChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.createOwnerAddress}>提交</Button></Col>
              </Row>
            </Card>
          </Col>
        </Spin>
      </Row>
    );
  }
}
