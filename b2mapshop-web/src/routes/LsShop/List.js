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
//const routerUrl = cache.keysMenu.LsShop;
const routerUrl = '/LsShop';
const url = 'LsShop';
const rowKey = 'shop_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class LsShopList extends Component {
  state = {
    scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
    shopstatus: []
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    //请求用户类型下拉框
    const { dispatch } = this.props
    const { dicDesc } = this.state
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'shopstatus' },
      callback: data => {
        // console.log(data)
        this.setState({
          shopstatus: data
        })

      },
    })
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
          filename: '商户信息.xls',
          queryMap: { ...values, ...date } || {},
        },
        url,
      });
    });
  };


  render() {
    const { form, base } = this.props;
    const {shopstatus} = this.state;
    const shopstatusdata = this.state.shopstatus.data

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
      { title: '商户编号', dataIndex: 'shop_id', width: 150, sorter: false, },
      { title: '商户简称', dataIndex: 'shop_name', width: 150, sorter: false, },
      { title: '商户全称', dataIndex: 'shop_fullname', width: 150, sorter: false, },
      { title: '电话', dataIndex: 'shop_tel', width: 150, sorter: false, },
      { title: '手机号', dataIndex: 'shop_phone', width: 150, sorter: false, },
      { title: '合同编号', dataIndex: 'shop_hetong', width: 150, sorter: false, },
      { title: '维度', dataIndex: 'shop_lat', width: 150, sorter: false, },
      { title: '介绍连接', dataIndex: 'shop_link', width: 150, sorter: false, },
      { title: '城市名称', dataIndex: 'city_name', width: 150, sorter: false, },
      { title: '区域名称', dataIndex: 'area_name', width: 150, sorter: false, },
      { title: '地址', dataIndex: 'shop_address', width: 150, sorter: false, },
      { title: '交通指引', dataIndex: 'shop_route', width: 150, sorter: false, },
      { title: '备注', dataIndex: 'shop_des', width: 150, sorter: false, },
      { title: '经度', dataIndex: 'shop_lon', width: 150, sorter: false, },
      {
        title: '审核状态', dataIndex: 'shop_status', width: 150, sorter: false, render: text => {
          if (Array.isArray(shopstatus)) {
            const temp = shopstatus.find(item => item.dic_code === text);
            if (temp) return `${temp.dic_name}(${text})`;
            return text;
          }
        },
      },
      { title: '评分', dataIndex: 'shop_score', width: 150, sorter: false, },
      { title: '评分说明', dataIndex: 'shop_scoredes', width: 150, sorter: false, },
      { title: '人均消费', dataIndex: 'shop_average', width: 150, sorter: false, },
      { title: '商户标签', dataIndex: 'shop_tags', width: 150, sorter: false, },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false, },

    ];

    const listConfig = {
      url: '/api/LsShop/queryLsShopList', // 必填,请求url
      scroll: { x: 3000, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='商户编号'>{getFieldDecorator('shop_id', { initialValue: this.props.list.queryMap.shop_id, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='商户简称'>{getFieldDecorator('shop_name', { initialValue: this.props.list.queryMap.shop_name, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='商户全称'>{getFieldDecorator('shop_fullname', { initialValue: this.props.list.queryMap.shop_fullname, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='电话'>{getFieldDecorator('shop_tel', { initialValue: this.props.list.queryMap.shop_tel, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='手机号'>{getFieldDecorator('shop_phone', { initialValue: this.props.list.queryMap.shop_phone, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='合同编号'>{getFieldDecorator('shop_hetong', { initialValue: this.props.list.queryMap.shop_hetong, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='维度'>{getFieldDecorator('shop_lat', { initialValue: this.props.list.queryMap.shop_lat, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='介绍连接'>{getFieldDecorator('shop_link', { initialValue: this.props.list.queryMap.shop_link, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='城市名称'>{getFieldDecorator('city_name', { initialValue: this.props.list.queryMap.city_name, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='区域名称'>{getFieldDecorator('area_name', { initialValue: this.props.list.queryMap.area_name, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='地址'>{getFieldDecorator('shop_address', { initialValue: this.props.list.queryMap.shop_address, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='交通指引'>{getFieldDecorator('shop_route', { initialValue: this.props.list.queryMap.shop_route, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='备注'>{getFieldDecorator('shop_des', { initialValue: this.props.list.queryMap.shop_des, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='经度'>{getFieldDecorator('shop_lon', { initialValue: this.props.list.queryMap.shop_lon, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>
                <FormItem {...formItemLayout}
                  label='审核状态'> 
                  {getFieldDecorator('shop_status', { initialValue: this.props.list.queryMap.shop_status, })(
                    <Select showSearch allowClear placeholder='审核状态' optionFilterProp='children'
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {shopstatusdata ? shopstatusdata.map(item => 
                        (<Option key={item.dicCode} value={item.dicCode}>  {item.dicValue} </Option>)) : null}
                    </Select>
                  )} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='评分'>{getFieldDecorator('shop_score', { initialValue: this.props.list.queryMap.shop_score, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='评分说明'>{getFieldDecorator('shop_scoredes', { initialValue: this.props.list.queryMap.shop_scoredes, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='人均消费'>{getFieldDecorator('shop_average', { initialValue: this.props.list.queryMap.shop_average, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='商户标签'>{getFieldDecorator('shop_tags', { initialValue: this.props.list.queryMap.shop_tags, })(
                  <Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='创建时间(起始)'>{getFieldDecorator('start_create_date', { initialValue: this.props.list.queryMap.start_create_date ? moment(this.props.list.queryMap.start_create_date) : null, })(
                  <DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}> <FormItem {...formItemLayout}
                label='创建时间(结束)'>{getFieldDecorator('end_create_date', { initialValue: this.props.list.queryMap.end_create_date ? moment(this.props.list.queryMap.end_create_date) : null, })(
                  <DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>


            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <ListButtonGroup handleFormReset={this.handleFormReset} routerUrl={routerUrl}
                  dispatch={this.props.dispatch} handleExport={this.handleExport} url={url}
                  handleSearch={this.handleSearch} />
              </Col>
            </Row>

          </Form>
        </Card>
        <List {...listConfig} />
      </div>
    );
  }
}
