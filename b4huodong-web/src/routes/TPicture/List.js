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
//const routerUrl = cache.keysMenu.TPicture;
const routerUrl = '/TPicture';
const url = 'TPicture';
const rowKey = 'picture_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class TPictureList extends Component {
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
          filename: '图片.xls',
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
      { title: '图片id', dataIndex: 'picture_id', width: 150, sorter: false },
      { title: '图片类型', dataIndex: 'picture_type', width: 150, sorter: false },
      { title: '对象id', dataIndex: 'object_id', width: 150, sorter: false },
      { title: '图片url', dataIndex: 'picture_url', width: 150, sorter: false },
      { title: '图片缩略图url', dataIndex: 'picture_surl', width: 150, sorter: false },
      { title: '图片后缀名', dataIndex: 'file_type', width: 150, sorter: false },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false },
    ];

    const listConfig = {
      url: '/api/TPicture/queryTPictureList', // 必填,请求url
      scroll: { x: 1050, y: this.state.scrollY }, // 可选配置,同antd table
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
                <FormItem {...formItemLayout} label="图片id">
                  {getFieldDecorator('picture_id', {
                    initialValue: this.props.list.queryMap.picture_id,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="图片类型">
                  {getFieldDecorator('picture_type', {
                    initialValue: this.props.list.queryMap.picture_type,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="对象id">
                  {getFieldDecorator('object_id', {
                    initialValue: this.props.list.queryMap.object_id,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="图片url">
                  {getFieldDecorator('picture_url', {
                    initialValue: this.props.list.queryMap.picture_url,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="图片缩略图url">
                  {getFieldDecorator('picture_surl', {
                    initialValue: this.props.list.queryMap.picture_surl,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="图片后缀名">
                  {getFieldDecorator('file_type', {
                    initialValue: this.props.list.queryMap.file_type,
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
