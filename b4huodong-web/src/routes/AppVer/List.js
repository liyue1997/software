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
//const routerUrl = cache.keysMenu.AppVer;
const routerUrl = '/AppVer';
const url = 'AppVer';
const rowKey = 'ver_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class AppVerList extends Component {
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
          filename: '手机端版本.xls',
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
      { title: '主键', dataIndex: 'ver_id', width: 150, sorter: false },
      { title: '用户类型', dataIndex: 't_usertype', width: 150, sorter: false },
      { title: '版本号', dataIndex: 't_ver', width: 150, sorter: false },
      { title: '购买前提示信息', dataIndex: 'infoBeforePaid', width: 150, sorter: false },
      { title: '使用前提示信息', dataIndex: 'infoBeforeUse', width: 150, sorter: false },
      { title: '是否显示微信支付', dataIndex: 'isWeixinpay', width: 150, sorter: false },
      { title: '是否显示微信网页支付', dataIndex: 'isweixinwappay', width: 150, sorter: false },
      { title: '是否显示支付宝支付', dataIndex: 'iszfbpay', width: 150, sorter: false },
      { title: '是否显示支付宝网页支付', dataIndex: 'iszfbpaywap', width: 150, sorter: false },
      { title: '最低充值金额', dataIndex: 'strPrice', width: 150, sorter: false },
      { title: '演示链接', dataIndex: 'demolink', width: 150, sorter: false },
      { title: '免责链接', dataIndex: 'lawlink', width: 150, sorter: false },
      { title: '下载链接', dataIndex: 'downloadlink', width: 150, sorter: false },
      { title: '购买', dataIndex: 'paid', width: 150, sorter: false },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false },
    ];

    const listConfig = {
      url: '/api/AppVer/queryAppVerList', // 必填,请求url
      scroll: { x: 2250, y: this.state.scrollY }, // 可选配置,同antd table
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
                <FormItem {...formItemLayout} label="主键(起始)">
                  {getFieldDecorator('start_ver_id', {
                    initialValue: this.props.list.queryMap.start_ver_id
                      ? moment(this.props.list.queryMap.start_ver_id)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="主键(结束)">
                  {getFieldDecorator('end_ver_id', {
                    initialValue: this.props.list.queryMap.end_ver_id
                      ? moment(this.props.list.queryMap.end_ver_id)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="用户类型(起始)">
                  {getFieldDecorator('start_t_usertype', {
                    initialValue: this.props.list.queryMap.start_t_usertype
                      ? moment(this.props.list.queryMap.start_t_usertype)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="用户类型(结束)">
                  {getFieldDecorator('end_t_usertype', {
                    initialValue: this.props.list.queryMap.end_t_usertype
                      ? moment(this.props.list.queryMap.end_t_usertype)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="版本号">
                  {getFieldDecorator('t_ver', { initialValue: this.props.list.queryMap.t_ver })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="购买前提示信息">
                  {getFieldDecorator('infoBeforePaid', {
                    initialValue: this.props.list.queryMap.infoBeforePaid,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="使用前提示信息">
                  {getFieldDecorator('infoBeforeUse', {
                    initialValue: this.props.list.queryMap.infoBeforeUse,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否显示微信支付(起始)">
                  {getFieldDecorator('start_isWeixinpay', {
                    initialValue: this.props.list.queryMap.start_isWeixinpay
                      ? moment(this.props.list.queryMap.start_isWeixinpay)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否显示微信支付(结束)">
                  {getFieldDecorator('end_isWeixinpay', {
                    initialValue: this.props.list.queryMap.end_isWeixinpay
                      ? moment(this.props.list.queryMap.end_isWeixinpay)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否显示微信网页支付(起始)">
                  {getFieldDecorator('start_isweixinwappay', {
                    initialValue: this.props.list.queryMap.start_isweixinwappay
                      ? moment(this.props.list.queryMap.start_isweixinwappay)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否显示微信网页支付(结束)">
                  {getFieldDecorator('end_isweixinwappay', {
                    initialValue: this.props.list.queryMap.end_isweixinwappay
                      ? moment(this.props.list.queryMap.end_isweixinwappay)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否显示支付宝支付(起始)">
                  {getFieldDecorator('start_iszfbpay', {
                    initialValue: this.props.list.queryMap.start_iszfbpay
                      ? moment(this.props.list.queryMap.start_iszfbpay)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否显示支付宝支付(结束)">
                  {getFieldDecorator('end_iszfbpay', {
                    initialValue: this.props.list.queryMap.end_iszfbpay
                      ? moment(this.props.list.queryMap.end_iszfbpay)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否显示支付宝网页支付(起始)">
                  {getFieldDecorator('start_iszfbpaywap', {
                    initialValue: this.props.list.queryMap.start_iszfbpaywap
                      ? moment(this.props.list.queryMap.start_iszfbpaywap)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否显示支付宝网页支付(结束)">
                  {getFieldDecorator('end_iszfbpaywap', {
                    initialValue: this.props.list.queryMap.end_iszfbpaywap
                      ? moment(this.props.list.queryMap.end_iszfbpaywap)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="最低充值金额">
                  {getFieldDecorator('strPrice', {
                    initialValue: this.props.list.queryMap.strPrice,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="演示链接">
                  {getFieldDecorator('demolink', {
                    initialValue: this.props.list.queryMap.demolink,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="免责链接">
                  {getFieldDecorator('lawlink', { initialValue: this.props.list.queryMap.lawlink })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="下载链接">
                  {getFieldDecorator('downloadlink', {
                    initialValue: this.props.list.queryMap.downloadlink,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="购买">
                  {getFieldDecorator('paid', { initialValue: this.props.list.queryMap.paid })(
                    <Input placeholder="请输入" />
                  )}{' '}
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
