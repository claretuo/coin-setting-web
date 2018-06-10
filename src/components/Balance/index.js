import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col, message, Card, Button, Spin, InputNumber } from 'antd';
import * as balanceActions from 'redux/modules/balance';

const { string, bool, func } = PropTypes;

@connect( state => ({
  balance: state.balance.balance,
  loading: state.balance.loading,
  created: state.balance.created,
  error: state.balance.error,
}),
{ ...balanceActions })
export default class Balance extends Component {
  static propTypes = {
    balance: string,
    loading: bool.isRequired,
    created: bool.isRequired,
    error: string,
    resetError: func.isRequired,
    load: func.isRequired,
    createTransfer: func.isRequired,
    mintToken: func.isRequired,
    burn: func.isRequired,
    burnFrom: func.isRequired,
    registerTokenERC20: func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      coinName: '',
      address: '',
      transferCoinName: '',
      mintCoinName: '',
      burnCoinName: '',
      burnFromCoinName: '',
      regCoinName: '',
      transferForm: {
        fromAddress: '',
        toAddress: '',
        value: undefined,
        password: '',
      },
      mintForm: {
        fromAddress: '',
        toAddress: '',
        value: undefined,
        password: '',
      },
      burnForm: {
        fromAddress: '',
        value: undefined,
        password: '',
      },
      burnFromForm: {
        fromAddress: '',
        toAddress: '',
        value: undefined,
        password: '',
      },
      regForm: {
        fromAddress: '',
        contractAddress: '',
        key: '',
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

  transferFormChange = (type, evt) => {
    const { value } = evt.target;
    const _this = this;
    switch (type) {
      case 'fromAddress':
        this.setState({
          transferForm: {
            ..._this.state.transferForm,
            fromAddress: value
          }
        });
        break;
      case 'transferCoinName':
        this.setState({
          transferCoinName: value
        });
        break;
      case 'toAddress':
        this.setState({
          transferForm: {
            ..._this.state.transferForm,
            toAddress: value
          }
        });
        break;
      case 'value':
        this.setState({
          transferForm: {
            ..._this.state.transferForm,
            value
          }
        });
        break;
      case 'password':
        this.setState({
          transferForm: {
            ..._this.state.transferForm,
            password: value
          }
        });
        break;
      default:
        message.warn('类型错误');
    }
  }

  mintFormChange = (type, evt) => {
    const { value } = evt.target;
    const _this = this;
    switch (type) {
      case 'fromAddress':
        this.setState({
          mintForm: {
            ..._this.state.mintForm,
            fromAddress: value
          }
        });
        break;
      case 'mintCoinName':
        this.setState({
          mintCoinName: value
        });
        break;
      case 'toAddress':
        this.setState({
          mintForm: {
            ..._this.state.mintForm,
            toAddress: value
          }
        });
        break;
      case 'value':
        this.setState({
          mintForm: {
            ..._this.state.mintForm,
            value
          }
        });
        break;
      case 'password':
        this.setState({
          mintForm: {
            ..._this.state.mintForm,
            password: value
          }
        });
        break;
      default:
        message.warn('类型错误');
    }
  }

  burnFormChange = (type, evt) => {
    const { value } = evt.target;
    const _this = this;
    switch (type) {
      case 'fromAddress':
        this.setState({
          burnForm: {
            ..._this.state.burnForm,
            fromAddress: value
          }
        });
        break;
      case 'burnCoinName':
        this.setState({
          burnCoinName: value
        });
        break;
      case 'value':
        this.setState({
          burnForm: {
            ..._this.state.burnForm,
            value
          }
        });
        break;
      case 'password':
        this.setState({
          burnForm: {
            ..._this.state.burnForm,
            password: value
          }
        });
        break;
      default:
        message.warn('类型错误');
    }
  }

  burnFromFormChange = (type, evt) => {
    const { value } = evt.target;
    const _this = this;
    switch (type) {
      case 'fromAddress':
        this.setState({
          burnFromForm: {
            ..._this.state.burnFromForm,
            fromAddress: value
          }
        });
        break;
      case 'toAddress':
        this.setState({
          burnFromForm: {
            ..._this.state.burnFromForm,
            toAddress: value
          }
        });
        break;
      case 'burnFromCoinName':
        this.setState({
          burnFromCoinName: value
        });
        break;
      case 'value':
        this.setState({
          burnFromForm: {
            ..._this.state.burnFromForm,
            value
          }
        });
        break;
      case 'password':
        this.setState({
          burnFromForm: {
            ..._this.state.burnFromForm,
            password: value
          }
        });
        break;
      default:
        message.warn('类型错误');
    }
  }

  regFormChange = (type, evt) => {
    const { value } = evt.target;
    const _this = this;
    if (type === 'regCoinName') {
      this.setState({
        regCoinName: value
      });
    } else {
      this.setState({
        regForm: {
          ..._this.state.regForm,
          [type]: value
        }
      });
    }
  }

  loadBalance = () => {
    const { coinName, address } = this.state;
    this.props.load(coinName, address);
  }

  createTransfer = () => {
    const { transferCoinName, transferForm } = this.state;
    this.props.createTransfer(transferCoinName, transferForm);
  }

  createMintToken = () => {
    const { mintCoinName, mintForm } = this.state;
    this.props.mintToken(mintCoinName, mintForm);
  }

  burn = () => {
    const { burnCoinName, burnForm } = this.state;
    this.props.burn(burnCoinName, burnForm);
  }

  burnFrom = () => {
    const { burnFromCoinName, burnFromForm } = this.state;
    this.props.burnFrom(burnFromCoinName, burnFromForm);
  }

  register = () => {
    const { regCoinName, regForm } = this.state;
    this.props.registerTokenERC20(regCoinName, regForm);
  }

  render() {
    const { balance, loading } = this.props;
    const { coinName, address, transferForm, transferCoinName, mintCoinName, mintForm, burnCoinName, burnForm, burnFromCoinName, burnFromForm, regCoinName, regForm } = this.state;
    const { fromAddress, toAddress, value, password } = transferForm;
    return (
      <Row>
        <Spin spinning={loading}>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="余额" extra={`当前余额: ${balance || '--'}`} style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={8}>
                  <Input value={coinName} onChange={this.coinNameChange} placeholder="货币名称" />
                </Col>
                <Col span={8}>
                  <Input value={address} onChange={this.addressChange} placeholder="地址" />
                </Col>
                <Col span={8}>
                  <Button type="primary" onClick={this.loadBalance}>查询</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="转账" style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={4}>货币名称</Col>
                <Col span={8}>
                  <Input value={transferCoinName} placeholder="货币名称" onChange={this.transferFormChange.bind(this, 'transferCoinName')} />
                </Col>
                <Col span={4}>来源地址</Col>
                <Col span={8}>
                  <Input value={fromAddress} placeholder="来源地址" onChange={this.transferFormChange.bind(this, 'fromAddress')} />
                </Col>
                <Col span={4}>目标地址</Col>
                <Col span={8}>
                  <Input value={toAddress} placeholder="目标地址" onChange={this.transferFormChange.bind(this, 'toAddress')} />
                </Col>
                <Col span={4}>转账金额</Col>
                <Col span={8}>
                  <InputNumber value={value} placeholder="转账金额" onChange={this.transferFormChange.bind(this, 'value')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={password} placeholder="交易密码" onChange={this.transferFormChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.createTransfer}>转账</Button></Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="铸币" style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={4}>货币名称</Col>
                <Col span={8}>
                  <Input value={mintCoinName} placeholder="货币名称" onChange={this.mintFormChange.bind(this, 'mintCoinName')} />
                </Col>
                <Col span={4}>来源地址</Col>
                <Col span={8}>
                  <Input value={mintForm.fromAddress} placeholder="来源地址" onChange={this.mintFormChange.bind(this, 'fromAddress')} />
                </Col>
                <Col span={4}>目标地址</Col>
                <Col span={8}>
                  <Input value={mintForm.toAddress} placeholder="目标地址" onChange={this.mintFormChange.bind(this, 'toAddress')} />
                </Col>
                <Col span={4}>数量</Col>
                <Col span={8}>
                  <InputNumber value={mintForm.value} placeholder="数量" onChange={this.mintFormChange.bind(this, 'value')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={mintForm.password} placeholder="交易密码" onChange={this.mintFormChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.createMintToken}>铸币</Button></Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="销毁令牌" style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={4}>货币名称</Col>
                <Col span={8}>
                  <Input value={burnCoinName} placeholder="货币名称" onChange={this.burnFormChange.bind(this, 'burnCoinName')} />
                </Col>
                <Col span={4}>令牌地址</Col>
                <Col span={8}>
                  <Input value={burnForm.fromAddress} placeholder="来源地址" onChange={this.burnFormChange.bind(this, 'fromAddress')} />
                </Col>
                <Col span={4}>数量</Col>
                <Col span={8}>
                  <Input value={burnForm.value} placeholder="数量" onChange={this.burnFormChange.bind(this, 'value')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={burnForm.password} placeholder="交易密码" onChange={this.burnFormChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.burn}>销毁令牌</Button></Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="销毁其他地址令牌" style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={4}>货币名称</Col>
                <Col span={8}>
                  <Input value={burnFromCoinName} placeholder="货币名称" onChange={this.burnFromFormChange.bind(this, 'burnFromCoinName')} />
                </Col>
                <Col span={4}>令牌地址</Col>
                <Col span={8}>
                  <Input value={burnFromForm.fromAddress} placeholder="来源地址" onChange={this.burnFromFormChange.bind(this, 'fromAddress')} />
                </Col>
                <Col span={4}>目标地址</Col>
                <Col span={8}>
                  <Input value={burnFromForm.toAddress} placeholder="目标地址" onChange={this.burnFromFormChange.bind(this, 'toAddress')} />
                </Col>
                <Col span={4}>数量</Col>
                <Col span={8}>
                  <Input value={burnFromForm.value} placeholder="数量" onChange={this.burnFromFormChange.bind(this, 'value')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={burnFromForm.password} placeholder="交易密码" onChange={this.burnFromFormChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.burnFrom}>销毁令牌</Button></Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{padding: '10px'}}>
            <Card title="设置合约新地址" style={{borderRadius: '5px'}}>
              <Row gutter={12}>
                <Col span={4}>货币名称</Col>
                <Col span={8}>
                  <Input value={regCoinName} placeholder="货币名称" onChange={this.regFormChange.bind(this, 'regCoinName')} />
                </Col>
                <Col span={4}>来源地址</Col>
                <Col span={8}>
                  <Input value={regForm.fromAddress} placeholder="来源地址" onChange={this.regFormChange.bind(this, 'fromAddress')} />
                </Col>
                <Col span={4}>合约地址</Col>
                <Col span={8}>
                  <Input value={regForm.contractAddress} placeholder="合约地址" onChange={this.regFormChange.bind(this, 'contractAddress')} />
                </Col>
                <Col span={4}>关键字</Col>
                <Col span={8}>
                  <Input value={regForm.key} placeholder="关键字" onChange={this.regFormChange.bind(this, 'key')} />
                </Col>
                <Col span={4}>交易密码</Col>
                <Col span={8}>
                  <Input value={regForm.password} placeholder="交易密码" onChange={this.regFormChange.bind(this, 'password')} />
                </Col>
                <Col span={6}><Button type="primary" onClick={this.register}>设置</Button></Col>
              </Row>
            </Card>
          </Col>
        </Spin>
      </Row>
    );
  }
}
