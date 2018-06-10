import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col, message, Card, Button, Spin, InputNumber } from 'antd';
import * as maxTransferNumActions from 'redux/modules/maxTransferNum';

const { string, bool, func } = PropTypes;

@connect( state => ({
  maxTransferNum: state.maxTransferNum.maxTransferNum,
  loading: state.maxTransferNum.loading,
  created: state.maxTransferNum.created,
  error: state.maxTransferNum.error,
}),
{ ...maxTransferNumActions })
export default class MaxTransferNum extends Component {
  static propTypes = {
    maxTransferNum: string,
    loading: bool.isRequired,
    created: bool.isRequired,
    error: string,
    resetError: func.isRequired,
    load: func.isRequired,
    createMaxTransferNum: func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      coinName: '',
      formCoinName: '',
      form: {
        fromAddress: '',
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

  createMaxTransferNum = () => {
    const { formCoinName, form } = this.state;
    this.props.createMaxTransferNum(formCoinName, { ...form });
  }

  render() {
    const { maxTransferNum, loading } = this.props;
    const { coinName, formCoinName, form } = this.state;
    const { fromAddress, value, password } = form;
    return (
      <Row>
        <Spin spinning={loading}>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="单笔交易最大限额" extra={`单笔交易最大限额: ${maxTransferNum || '--'}`} style={{borderRadius: '5px'}}>
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
            <Card title="设置单笔交易最大限额" style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={4}>货币名称</Col>
                <Col span={8}>
                  <Input value={formCoinName} placeholder="货币名称" onChange={this.formChange.bind(this, 'formCoinName')} />
                </Col>
                <Col span={4}>地址</Col>
                <Col span={8}>
                  <Input value={fromAddress} placeholder="地址" onChange={this.formChange.bind(this, 'fromAddress')} />
                </Col>
                <Col span={4}>数量</Col>
                <Col span={8}>
                  <InputNumber value={value} placeholder="数量" onChange={this.formChange.bind(this, 'value')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={password} placeholder="交易密码" onChange={this.formChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.createMaxTransferNum}>提交</Button></Col>
              </Row>
            </Card>
          </Col>
        </Spin>
      </Row>
    );
  }
}
