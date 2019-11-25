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

const FormItem = Form.Item;
const { Option } = Select;
//const routerUrl = cache.keysMenu.HdUser;
const routerUrl = '/HdUser';
const url = 'HdUser';
const rowKey = 'user_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class HdUserList extends Component {
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
          filename: '门店用户.xls',
          queryMap: { ...values, ...date } || {},
        },
        url,
      });
    });
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
      { title: '用户id', dataIndex: 'user_id', width: 150, sorter: false, },
      { title: '用户姓名', dataIndex: 'user_name', width: 150, sorter: false, },
      { title: '车牌号', dataIndex: 'user_car', width: 150, sorter: false, },
      { title: '用户手机号', dataIndex: 'user_phone', width: 150, sorter: false, },
      { title: '用户等级', dataIndex: 'user_level', width: 150, sorter: false, },
      { title: '区域编码', dataIndex: 'zone_code', width: 150, sorter: false, },
      { title: '用户电话', dataIndex: 'user_tel', width: 150, sorter: false, },
      { title: '用户微信id', dataIndex: 'user_weixinid', width: 150, sorter: false, },
      { title: '用户昵称', dataIndex: 'user_nick', width: 150, sorter: false, },
      { title: '用户车型', dataIndex: 'user_cartype', width: 150, sorter: false, },
      {
        title: '是否锁定',
        // dataIndex: 'is_active',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (record.is_active === 1) {
            return <span>是</span>;
          } else {
            return <span>否</span>;
          }
        },
      },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false, },

    ];

    const listConfig = {
      url: '/api/HdUser/queryHdUserList', // 必填,请求url
      scroll: { x: 1800, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch} >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户id'>{getFieldDecorator('user_id', { initialValue: this.props.list.queryMap.user_id, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户姓名'>{getFieldDecorator('user_name', { initialValue: this.props.list.queryMap.user_name, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='车牌号'>{getFieldDecorator('user_car', { initialValue: this.props.list.queryMap.user_car, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户手机号'>{getFieldDecorator('user_phone', { initialValue: this.props.list.queryMap.user_phone, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户等级'>{getFieldDecorator('user_level', { initialValue: this.props.list.queryMap.user_level, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='区域编码'>{getFieldDecorator('zone_code', { initialValue: this.props.list.queryMap.zone_code, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户电话'>{getFieldDecorator('user_tel', { initialValue: this.props.list.queryMap.user_tel, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户微信id'>{getFieldDecorator('user_weixinid', { initialValue: this.props.list.queryMap.user_weixinid, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户昵称'>{getFieldDecorator('user_nick', { initialValue: this.props.list.queryMap.user_nick, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户车型'>{getFieldDecorator('user_cartype', { initialValue: this.props.list.queryMap.user_cartype, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='是否锁定(起始)'>{getFieldDecorator('start_is_active', { initialValue: this.props.list.queryMap.start_is_active ? moment(this.props.list.queryMap.start_is_active) : null, })
                (<InputNumber placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='是否锁定(结束)'>{getFieldDecorator('end_is_active', { initialValue: this.props.list.queryMap.end_is_active ? moment(this.props.list.queryMap.end_is_active) : null, })
                (<InputNumber placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='创建时间(起始)'>{getFieldDecorator('start_create_date', { initialValue: this.props.list.queryMap.start_create_date ? moment(this.props.list.queryMap.start_create_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='创建时间(结束)'>{getFieldDecorator('end_create_date', { initialValue: this.props.list.queryMap.end_create_date ? moment(this.props.list.queryMap.end_create_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>



            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <ListButtonGroup handleFormReset={this.handleFormReset} routerUrl={routerUrl} dispatch={this.props.dispatch} handleExport={this.handleExport} url={url} handleSearch={this.handleSearch} />
              </Col>
            </Row>

          </Form>
        </Card>
        <List {...listConfig} />
      </div>
    );
  }
}
