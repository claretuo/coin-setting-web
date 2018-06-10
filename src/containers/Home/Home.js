import React, { Component } from 'react';
import { Col, Row, Tabs, Radio } from 'antd';
import Helmet from 'react-helmet';
import { Balance, FrozenAccount, Allowance, MaxTransferNum, Fee, FeeAccount, OwnerAddress } from 'components';

const TabPane = Tabs.TabPane;
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'top',
    };
  }
  handleModeChange = (evt) => {
    const mode = evt.target.value;
    this.setState({ mode });
  }
  render() {
    const styles = require('./Home.scss');
    const { mode } = this.state;
    return (
      <div className={styles.homePage}>
        <Helmet title="首页"/>
        <Row>
          <Col span="24" className={styles.tipTitle}>
            <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
              <Radio.Button value="top">横向布局</Radio.Button>
              <Radio.Button value="left">纵向布局</Radio.Button>
            </Radio.Group>
            <Tabs
              defaultActiveKey="1"
              tabPosition={mode}
            >
              <TabPane tab="基本信息" key="1">
                <Balance />
              </TabPane>
              <TabPane tab="限额" key="2">
                <Allowance />
              </TabPane>
              <TabPane tab="冻结账户" key="3">
                <FrozenAccount />
              </TabPane>
              <TabPane tab="单笔交易最大限额" key="4">
                <MaxTransferNum />
              </TabPane>
              <TabPane tab="手续费" key="5"><Fee /></TabPane>
              <TabPane tab="手续费账户" key="6"><FeeAccount /></TabPane>
              <TabPane tab="管理员账号" key="7"><OwnerAddress /></TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
