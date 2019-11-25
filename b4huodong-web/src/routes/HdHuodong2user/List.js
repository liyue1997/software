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
//const routerUrl = cache.keysMenu.HdHuodong2user;
const routerUrl = '/HdHuodong2user';
const url = 'HdHuodong2user';
const rowKey = 'huodonguser_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class HdHuodong2userList extends Component {
  state = {
    scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
    hdhuodong: [],
    hdshop: [],
    paystatus: [],
    infostatus: []
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    const { dispatch } = this.props;

    //支付状态
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'paystatus' },
      callback: data => {
        console.log(data)
        this.setState({
          paystatus: data.data,
        });
      },
    });
    //报名状态
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'infostatus' },
      callback: data => {
        console.log(data)
        this.setState({
          infostatus: data.data,
        });
      },
    });
    //请求活动下拉框
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'zone_code',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/HdHuodong/queryHdHuodongList',
      },
      callback: data => {
        this.setState({
          hdhuodong: data.data.list,
        });
      },
    });

    //请求门店下拉框
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'zone_code',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/HdShop/queryHdShopList',
      },
      callback: data => {
        this.setState({
          hdshop: data.data.list,
        });
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

  handleSearch = e => {
    if (e) e.preventDefault();
    const { form, list } = this.props;
    const { setList } = list;
    form.validateFieldsAndScroll((err, values) => {
      let temp = {};
      if (!isEmpty(values.start_pay_time))
        temp = {
          ...temp,
          start_pay_time: values.start_pay_time.format(DateFormat),
        };
      if (!isEmpty(values.end_pay_time))
        temp = {
          ...temp,
          end_pay_time: values.end_pay_time.format(DateFormat),
        };
      if (!isEmpty(values.start_hx_time))
        temp = {
          ...temp,
          start_hx_time: values.start_hx_time.format(DateFormat),
        };
      if (!isEmpty(values.end_hx_time))
        temp = {
          ...temp,
          end_hx_time: values.end_hx_time.format(DateFormat),
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
          filename: '活动用户.xls',
          queryMap: { ...values, ...date } || {},
        },
        url,
      });
    });
  };


  render() {
    const { form, base } = this.props;
    const { infostatus, paystatus } = base;
    const datahdhuodong = this.state.hdhuodong;
    const datahdshop = this.state.hdshop;
    const datapaystatus = this.state.paystatus;
    const datainfostatus = this.state.infostatus;
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
      { title: '参与标识', dataIndex: 'huodonguser_id', width: 150, sorter: false, },
      {
        title: '活动',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datahdhuodong) return <span>{record.huodong_id}</span>;
          const temp = datahdhuodong.find(item => item.huodong_id === record.huodong_id);
          if (!temp) return <span>{record.huodong_id}</span>;
          return <span>{temp.huodong_name}</span>;
        },
      },
      {
        title: '门店',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datahdshop) return <span>{record.shop_id}</span>;
          const temp = datahdshop.find(item => item.shop_id === record.shop_id);
          if (!temp) return <span>{record.shop_id}</span>;
          return <span>{temp.shop_name}</span>;
        },
      },
      { title: '用户姓名', dataIndex: 'user_name', width: 150, sorter: false, },
      { title: '支付金额', dataIndex: 'pay_money', width: 150, sorter: false, },
      { title: '支付费用', dataIndex: 'pay_fee', width: 150, sorter: false, },
      { title: '车牌号', dataIndex: 'user_car', width: 150, sorter: false, },
      { title: '用户手机号', dataIndex: 'user_phone', width: 150, sorter: false, },
      { title: '用户车型', dataIndex: 'user_cartype', width: 150, sorter: false, },
      {
        title: '报名状态',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datainfostatus) return <span>{record.info_status}</span>;
          const temp = datainfostatus.find(item => item.dicCode === record.info_status);
          if (!temp) return <span>{record.info_status}</span>;
          return <span>{temp.dicValue}</span>;
        },
      },
      {
        title: '支付状态',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datapaystatus) return <span>{record.pay_status}</span>;
          const temp = datapaystatus.find(item => item.dicCode === record.pay_status);
          if (!temp) return <span>{record.pay_status}</span>;
          return <span>{temp.dicValue}</span>;
        },
      },
      { title: '支付单据号', dataIndex: 'pay_order', width: 150, sorter: false, },
      { title: '支付方式', dataIndex: 'pay_type', width: 150, sorter: false, },
      { title: '支付时间', dataIndex: 'pay_time', width: 150, sorter: false, },
      { title: '备注', dataIndex: 'user_demo', width: 150, sorter: false, },
      { title: '核销时间', dataIndex: 'hx_time', width: 150, sorter: false, },
      { title: '核销人员', dataIndex: 'hx_user', width: 150, sorter: false, },
      { title: '结账单号', dataIndex: 'jz_order', width: 150, sorter: false, },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false, },

    ];

    const listConfig = {
      url: '/api/HdHuodong2user/queryHdHuodong2userList', // 必填,请求url
      scroll: { x: 2550, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch} >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              {/* <Col {...formItemGrid}>  
              <FormItem {...formItemLayout} label='参与标识'>
              {getFieldDecorator('huodonguser_id', { initialValue: this.props.list.queryMap.huodonguser_id, })
              (<Input placeholder='请输入' />)} 
              </FormItem> 
              </Col> */}
              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} hasFeedback label="活动">
                  {getFieldDecorator('huodong_id', {
                    initialValue: this.props.list.queryMap.huodong_id,
                  })(
                    <Select showSearch allowClear placeholder="活动">
                      {datahdhuodong &&
                        datahdhuodong.map(item => {
                          return (
                            <Option value={item.huodong_id}>
                              {item.huodong_name}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              {/* <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户姓名'>
              {getFieldDecorator('username', { initialValue: this.props.list.queryMap.username, })(<Input placeholder='请输入' />)} 
              </FormItem> </Col> */}
              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} hasFeedback label="门店">
                  {getFieldDecorator('shop_id', {
                    initialValue: this.props.list.queryMap.shop_id,
                  })(
                    <Select showSearch allowClear placeholder="门店">
                      {datahdshop &&
                        datahdshop.map(item => {
                          return (
                            <Option value={item.shop_id}>
                              {item.shop_name}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='车牌号'>{getFieldDecorator('user_car', { initialValue: this.props.list.queryMap.user_car, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户手机号'>{getFieldDecorator('user_phone', { initialValue: this.props.list.queryMap.user_phone, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='用户车型'>{getFieldDecorator('user_cartype', { initialValue: this.props.list.queryMap.user_cartype, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              {/* <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='报名状态'> {getFieldDecorator('info_status', { initialValue: this.props.list.queryMap.info_status,})(
<Select showSearch allowClear  placeholder='报名状态' optionFilterProp='children' filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 } >
 {Array.isArray(infostatus) ? infostatus.map(item => ( <Option key={item.dic_code} value={item.dic_code}>  {`${item.dic_name}(${item.dic_code})`} </Option> )) : null} </Select>
)} </FormItem> </Col> */}
              {/* <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='支付状态'> {getFieldDecorator('pay_status', { initialValue: this.props.list.queryMap.pay_status,})(
<Select showSearch allowClear  placeholder='支付状态' optionFilterProp='children' filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 } >
 {Array.isArray(paystatus) ? paystatus.map(item => ( <Option key={item.dic_code} value={item.dic_code}>  {`${item.dic_name}(${item.dic_code})`} </Option> )) : null} </Select>
)} </FormItem> </Col> */}
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='支付单据号'>{getFieldDecorator('pay_order', { initialValue: this.props.list.queryMap.pay_order, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              {/* <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='支付方式'>{getFieldDecorator('pay_type', { initialValue: this.props.list.queryMap.pay_type, })(<Input placeholder='请输入' />)} </FormItem> </Col> */}
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='支付时间(起始)'>{getFieldDecorator('start_pay_time', { initialValue: this.props.list.queryMap.start_pay_time ? moment(this.props.list.queryMap.start_pay_time) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='支付时间(结束)'>{getFieldDecorator('end_pay_time', { initialValue: this.props.list.queryMap.end_pay_time ? moment(this.props.list.queryMap.end_pay_time) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
              {/* <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='备注'>{getFieldDecorator('user_demo', { initialValue: this.props.list.queryMap.user_demo, })(<Input placeholder='请输入' />)} </FormItem> </Col> */}
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='核销时间(起始)'>{getFieldDecorator('start_hx_time', { initialValue: this.props.list.queryMap.start_hx_time ? moment(this.props.list.queryMap.start_hx_time) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='核销时间(结束)'>{getFieldDecorator('end_hx_time', { initialValue: this.props.list.queryMap.end_hx_time ? moment(this.props.list.queryMap.end_hx_time) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='核销人员'>{getFieldDecorator('hx_user', { initialValue: this.props.list.queryMap.hx_user, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='结账单号'>{getFieldDecorator('jz_order', { initialValue: this.props.list.queryMap.jz_order, })(<Input placeholder='请输入' />)} </FormItem> </Col>
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
