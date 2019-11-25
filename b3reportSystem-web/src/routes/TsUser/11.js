/*
 * @Author: zouwendi
 * @Date: 2018-05-14 18:56:24
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:09:55
 * @Description: 用户管理列表
 */
import React, { Component } from 'react';
import { Form, Row, Col, Input, InputNumber, Button, Modal, Card, Select, DatePicker } from 'antd';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import moment from 'moment';
import ListButtonGroup from '../../components/ListButtonGroup';

import styles from '../../styles/list.less';

import List from '../../components/List';
import Operate from '../../components/Oprs';
import { isEmpty } from '../../utils/utils';
import { webConfig, formItemLayout, formItemGrid } from '../../utils/Constant';
import cache from '../../utils/cache';
import Importer from '../../components/Importer';
import { getByDicType } from '../../services/api';

const FormItem = Form.Item;
const { Option } = Select;
//const routerUrl = cache.keysMenu.TsUser;
const routerUrl = '/TsUser';
const url = 'TsUser';
const rowKey = 'user_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class TsUserList extends Component {
  state = {
    scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    const { dispatch } = this.props;
    dispatch({
      type: 'list/listsaveinfo',
      payload: {
        url: '/api/TDic/queryTDicList',
      },
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  @Bind()
  @Debounce(200)
  resize() {
    this.setState({
      scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
    });
  }

  change = () => {
    //this.props
  };

  render() {
    const { form, base, list } = this.props;

    const { getFieldDecorator } = form;

    const columns = [
      {
        title: '操作',
        key: 'action',
        width: 160,
        align: 'center',
        render: (text, record) => <Row type="flex" justify="space-around" />,
      },
      { title: '用户id', dataIndex: 'user_id', width: 150, sorter: false },
      { title: '用户登录账户', dataIndex: 'user_account', width: 150, sorter: false },
      // {  title: '密码',   dataIndex: 'password',     width: 150,     sorter: false,      },
      { title: '用户名', dataIndex: 'username', width: 150, sorter: false },
      { title: '用户类型', dataIndex: 'user_type', width: 150, sorter: false },
    ];

    const listConfig = {
      url: '/api/TsUser/queryTsUserList', // 必填,请求url
      scroll: { x: 1650, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="用户类型">
                  {getFieldDecorator('user_type', {
                    initialValue: this.props.list.queryMap.user_type,
                  })(
                    <Select allowClear showSearch dropdownMatchSelectWidth>
                      {list.queryTDicList.map((v, k) => (
                        <Option key={k} value={v.dicCode}>
                          {v.dicValue}
                        </Option>
                      ))}
                    </Select>
                  )}{' '}
                </FormItem>{' '}
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <ListButtonGroup
                  handleFormReset={this.handleFormReset}
                  routerUrl={routerUrl}
                  dispatch={this.props.dispatch}
                  handleExport={this.handleExport}
                  url={url}
                  handleSearch={this.handleSearch}
                />
              </Col>
            </Row>
          </Form>
        </Card>
        <List {...listConfig} />
      </div>
    );
  }
}
