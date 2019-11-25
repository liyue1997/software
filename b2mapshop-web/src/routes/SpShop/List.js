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
//const routerUrl = cache.keysMenu.SpShop;
const routerUrl ='/SpShop';
const url = 'SpShop';
const rowKey = 'shop_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class SpShopList extends Component {
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
    if(e) e.preventDefault();
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
        filename: '商铺.xls',
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
       {  title: '商铺ID',   dataIndex: 'shop_id',     width: 150,     sorter: false,      },
 {  title: '商铺简称',   dataIndex: 'shop_name',     width: 150,     sorter: false,      },
 {  title: '商铺全称',   dataIndex: 'shop_fullname',     width: 150,     sorter: false,      },
 {  title: '商品电话',   dataIndex: 'shop_tel',     width: 150,     sorter: false,      },
 {  title: '商铺手机',   dataIndex: 'shop_phone',     width: 150,     sorter: false,      },
 {  title: '经度',   dataIndex: 'shop_lon',     width: 150,     sorter: false,      },
 {  title: '纬度',   dataIndex: 'shop_lat',     width: 150,     sorter: false,      },
 {  title: '城市',   dataIndex: 'city_name',     width: 150,     sorter: false,      },
 {  title: '区域',   dataIndex: 'area_name',     width: 150,     sorter: false,      },
 {  title: '商铺地址',   dataIndex: 'shop_address',     width: 150,     sorter: false,      },
 {  title: '商铺审核状态',   dataIndex: 'shop_status',     width: 150,     sorter: false,      },
 {  title: '商铺评分',   dataIndex: 'shop_score',     width: 150,     sorter: false,      },
 {  title: '人均消费',   dataIndex: 'shop_average',     width: 150,     sorter: false,      },
 {  title: '商铺标签',   dataIndex: 'shop_tags',     width: 150,     sorter: false,      },
 {  title: '创建时间',   dataIndex: 'create_date',     width: 150,     sorter: false,      },

    ];

    const listConfig = {
      url: '/api/SpShop/querySpShopList', // 必填,请求url
      scroll: { x: 2250, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch} >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺ID'>{getFieldDecorator('shop_id',{initialValue: this.props.list.queryMap.shop_id, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺简称'>{getFieldDecorator('shop_name',{initialValue: this.props.list.queryMap.shop_name, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺全称'>{getFieldDecorator('shop_fullname',{initialValue: this.props.list.queryMap.shop_fullname, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商品电话'>{getFieldDecorator('shop_tel',{initialValue: this.props.list.queryMap.shop_tel, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺手机'>{getFieldDecorator('shop_phone',{initialValue: this.props.list.queryMap.shop_phone, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='经度'>{getFieldDecorator('shop_lon',{initialValue: this.props.list.queryMap.shop_lon, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='纬度'>{getFieldDecorator('shop_lat',{initialValue: this.props.list.queryMap.shop_lat, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='城市'>{getFieldDecorator('city_name',{initialValue: this.props.list.queryMap.city_name, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='区域'>{getFieldDecorator('area_name',{initialValue: this.props.list.queryMap.area_name, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺地址'>{getFieldDecorator('shop_address',{initialValue: this.props.list.queryMap.shop_address, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺审核状态(起始)'>{getFieldDecorator('start_shop_status',{initialValue: this.props.list.queryMap.start_shop_status  ? moment(this.props.list.queryMap.start_shop_status): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺审核状态(结束)'>{getFieldDecorator('end_shop_status',{initialValue: this.props.list.queryMap.end_shop_status  ? moment(this.props.list.queryMap.end_shop_status): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺评分'>{getFieldDecorator('shop_score',{initialValue: this.props.list.queryMap.shop_score, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='人均消费(起始)'>{getFieldDecorator('start_shop_average',{initialValue: this.props.list.queryMap.start_shop_average  ? moment(this.props.list.queryMap.start_shop_average): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='人均消费(结束)'>{getFieldDecorator('end_shop_average',{initialValue: this.props.list.queryMap.end_shop_average  ? moment(this.props.list.queryMap.end_shop_average): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺标签'>{getFieldDecorator('shop_tags',{initialValue: this.props.list.queryMap.shop_tags, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='创建时间(起始)'>{getFieldDecorator('start_create_date',{initialValue: this.props.list.queryMap.start_create_date ? moment(this.props.list.queryMap.start_create_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='创建时间(结束)'>{getFieldDecorator('end_create_date',{initialValue: this.props.list.queryMap.end_create_date? moment(this.props.list.queryMap.end_create_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>

              
             
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
