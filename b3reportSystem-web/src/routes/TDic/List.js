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
//const routerUrl = cache.keysMenu.TDic;
const routerUrl = '/TDic';
const url = 'TDic';
const rowKey = 'dic_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class TDicList extends Component {
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
          filename: '数据字典.xls',
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
      { title: '字典主键', dataIndex: 'dic_id', width: 150, sorter: false },
      { title: '字典类型', dataIndex: 'dic_type', width: 150, sorter: false },
      { title: '字典代码', dataIndex: 'dic_code', width: 150, sorter: false },
      { title: '字典值', dataIndex: 'dic_value', width: 150, sorter: false },
      { title: '字典描述', dataIndex: 'dic_desc', width: 150, sorter: false },
      { title: '是否可用', dataIndex: 'is_used', width: 150, sorter: false },
      { title: '排序', dataIndex: 'order_no', width: 150, sorter: false },
      { title: '父字典编码', dataIndex: 'parent_id', width: 150, sorter: false },
      { title: '拼音缩写', dataIndex: 'pysx', width: 150, sorter: false },
      { title: '预留字段1', dataIndex: 'dic_data1', width: 150, sorter: false },
      { title: '预留字段2', dataIndex: 'dic_data2', width: 150, sorter: false },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false },
    ];

    const listConfig = {
      url: '/api/TDic/queryTDicList', // 必填,请求url
      scroll: { x: 1800, y: this.state.scrollY }, // 可选配置,同antd table
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
                <FormItem {...formItemLayout} label="字典主键">
                  {getFieldDecorator('dic_id', { initialValue: this.props.list.queryMap.dic_id })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="字典类型">
                  {getFieldDecorator('dic_type', {
                    initialValue: this.props.list.queryMap.dic_type,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="字典代码">
                  {getFieldDecorator('dic_code', {
                    initialValue: this.props.list.queryMap.dic_code,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="字典值">
                  {getFieldDecorator('dic_value', {
                    initialValue: this.props.list.queryMap.dic_value,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="字典描述">
                  {getFieldDecorator('dic_desc', {
                    initialValue: this.props.list.queryMap.dic_desc,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否可用(起始)">
                  {getFieldDecorator('start_is_used', {
                    initialValue: this.props.list.queryMap.start_is_used
                      ? moment(this.props.list.queryMap.start_is_used)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="是否可用(结束)">
                  {getFieldDecorator('end_is_used', {
                    initialValue: this.props.list.queryMap.end_is_used
                      ? moment(this.props.list.queryMap.end_is_used)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="排序(起始)">
                  {getFieldDecorator('start_order_no', {
                    initialValue: this.props.list.queryMap.start_order_no
                      ? moment(this.props.list.queryMap.start_order_no)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="排序(结束)">
                  {getFieldDecorator('end_order_no', {
                    initialValue: this.props.list.queryMap.end_order_no
                      ? moment(this.props.list.queryMap.end_order_no)
                      : null,
                  })(<InputNumber placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="父字典编码">
                  {getFieldDecorator('parent_id', {
                    initialValue: this.props.list.queryMap.parent_id,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="拼音缩写">
                  {getFieldDecorator('pysx', { initialValue: this.props.list.queryMap.pysx })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="预留字段1">
                  {getFieldDecorator('dic_data1', {
                    initialValue: this.props.list.queryMap.dic_data1,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="预留字段2">
                  {getFieldDecorator('dic_data2', {
                    initialValue: this.props.list.queryMap.dic_data2,
                  })(<Input placeholder="请输入" />)}{' '}
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
