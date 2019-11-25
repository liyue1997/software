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

  handleSearch = e => {
    if (e) e.preventDefault();
    const { form, list } = this.props;
    const { setList } = list;
    form.validateFieldsAndScroll((err, values) => {
      let temp = {};
      if (!isEmpty(values.start_last_time))
        temp = {
          ...temp,
          start_last_time: values.start_last_time.format(DateFormat),
        };
      if (!isEmpty(values.end_last_time))
        temp = {
          ...temp,
          end_last_time: values.end_last_time.format(DateFormat),
        };
      if (!isEmpty(values.start_create_date))
        temp = {
          ...temp,
          start_create_date: values.start_create_date.format(DateFormat),
        };
      if (!isEmpty(values.end_create_date))
        temp = {
          ...temp,
          end_create_date: values.end_create_date.format(DateFormat),
        };

      setList({
        current: 1,
        queryMap: { ...values, ...temp },
      });
    });
  };

  handleFormReset = () => {
    const { form, list } = this.props;
    const { setList } = list;
    setList({
      current: 1,
      queryMap: {},
    });
    form.resetFields();
  };

  // 删除后调用list
  hanleDelete = info => {
    const { dispatch, list } = this.props;
    const { setList } = list;
    dispatch({
      type: 'base/delete',
      payload: {
        // 主键id
        id: info[rowKey],
      },
      url,
      callback: () => setList(),
    });
  };

  handleExport = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      const date = {};
      if (values.startDate) date.startDate = values.startDate.format(DateFormat);
      if (values.endDate) date.endDate = values.endDate.format(DateFormat);
      dispatch({
        type: `list/exportExcel`,
        payload: {
          filename: '登录用户.xls',
          queryMap: { ...values, ...date } || {},
        },
        url,
      });
    });
  };
  change = () => {
    //this.props
  };

  render() {
    const { form, base } = this.props;

    const { getFieldDecorator } = form;
    const { hanleDelete } = this;
    const showConfirm = record => {
      Modal.confirm({
        title: '确定想要删除吗?',
        okType: 'danger',
        okText: '是',
        cancelText: '否',
        onOk() {
          hanleDelete(record);
        },
      });
    };

    const columns = [
      {
        title: '操作',
        key: 'action',
        width: 160,
        align: 'center',
        render: (text, record) => (
          <Row type="flex" justify="space-around">
            <Operate operateName="UPDATE">
              <Link
                to={{
                  pathname: `${routerUrl}/info`,
                  state: { id: record[rowKey] },
                }}
              >
                <Button type="primary" icon="edit" ghost size="small">
                  编辑
                </Button>
              </Link>
            </Operate>
            <Operate operateName="DELETE">
              <Button
                type="danger"
                icon="delete"
                ghost
                size="small"
                onClick={() => showConfirm(record)}
              >
                删除
              </Button>
            </Operate>
          </Row>
        ),
      },
      { title: '用户id', dataIndex: 'user_id', width: 150, sorter: false },
      { title: '用户登录账户', dataIndex: 'user_account', width: 150, sorter: false },
      // {  title: '密码',   dataIndex: 'password',     width: 150,     sorter: false,      },
      { title: '用户名', dataIndex: 'username', width: 150, sorter: false },
      { title: '用户类型', dataIndex: 'user_type', width: 150, sorter: false },
      { title: '是否允许登录', dataIndex: 'user_status', width: 150, sorter: false },
      { title: '角色', dataIndex: 'role_id', width: 150, sorter: false },
      { title: '最后登录ip', dataIndex: 'last_ip', width: 150, sorter: false },
      { title: '最后登录系统', dataIndex: 'last_os', width: 150, sorter: false },
      { title: '最后登录时间', dataIndex: 'last_time', width: 150, sorter: false },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false },
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
                <FormItem {...formItemLayout} label="用户id">
                  {getFieldDecorator('user_id', { initialValue: this.props.list.queryMap.user_id })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="用户登录账户">
                  {getFieldDecorator('user_account', {
                    initialValue: this.props.list.queryMap.user_account,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              {/*<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='密码'>{getFieldDecorator('password',{initialValue: this.props.list.queryMap.password, })(<Input placeholder='请输入' />)} </FormItem> </Col>*/}
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="用户名">
                  {getFieldDecorator('username', {
                    initialValue: this.props.list.queryMap.username,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="用户类型">
                  {getFieldDecorator('user_type', {
                    initialValue: this.props.list.queryMap.user_type,
                  })(
                    <Select showSearch allowClear placeholder="用户类型">
                      {}
                    </Select>
                  )}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否允许登录(起始)">
                  {getFieldDecorator('start_user_status', {
                    initialValue: this.props.list.queryMap.start_user_status
                      ? moment(this.props.list.queryMap.start_user_status)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否允许登录(结束)">
                  {getFieldDecorator('end_user_status', {
                    initialValue: this.props.list.queryMap.end_user_status
                      ? moment(this.props.list.queryMap.end_user_status)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="角色">
                  {getFieldDecorator('role_id', { initialValue: this.props.list.queryMap.role_id })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="最后登录ip">
                  {getFieldDecorator('last_ip', { initialValue: this.props.list.queryMap.last_ip })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="最后登录系统">
                  {getFieldDecorator('last_os', { initialValue: this.props.list.queryMap.last_os })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="最后登录时间(起始)">
                  {getFieldDecorator('start_last_time', {
                    initialValue: this.props.list.queryMap.start_last_time
                      ? moment(this.props.list.queryMap.start_last_time)
                      : null,
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="最后登录时间(结束)">
                  {getFieldDecorator('end_last_time', {
                    initialValue: this.props.list.queryMap.end_last_time
                      ? moment(this.props.list.queryMap.end_last_time)
                      : null,
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="创建时间(起始)">
                  {getFieldDecorator('start_create_date', {
                    initialValue: this.props.list.queryMap.start_create_date
                      ? moment(this.props.list.queryMap.start_create_date)
                      : null,
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="创建时间(结束)">
                  {getFieldDecorator('end_create_date', {
                    initialValue: this.props.list.queryMap.end_create_date
                      ? moment(this.props.list.queryMap.end_create_date)
                      : null,
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
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
