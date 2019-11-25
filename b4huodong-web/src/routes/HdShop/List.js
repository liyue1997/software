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
//const routerUrl = cache.keysMenu.HdShop;
const routerUrl = '/HdShop';
const url = 'HdShop';
const rowKey = 'shop_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class HdShopList extends Component {
  state = {
    scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
    dichdhkspeed: [],
    dichdmdlevel: [],
    dicshopstatus: [],
    diczone: []
  };

  componentDidMount() {
    const { dispatch } = this.props;
    window.addEventListener('resize', this.resize);
    //请求汇款速度
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'hdhkspeed' },
      callback: data => {
        this.setState({
          dichdhkspeed: data.data,
        });
      },
    });
    //门店等级
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'shoplevel' },
      callback: data => {
        this.setState({
          dichdmdlevel: data.data,
        });
      },
    });
    //门店状态
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'shopstatus' },
      callback: data => {
        this.setState({
          dicshopstatus: data.data,
        });
      },
    });
    //请求区域下拉框
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'zone_code',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/HdZone/queryHdZoneList',
      },
      callback: data => {
        this.setState({
          diczone: data.data.list,
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
          filename: '门店.xls',
          queryMap: { ...values, ...date } || {},
        },
        url,
      });
    });
  };


  render() {
    const { form, base } = this.props;
    const { shopstatus } = base;
    const datadichdhkspeed = this.state.dichdhkspeed;
    const datadichdmdlevel = this.state.dichdmdlevel;
    const datadicshopstatus = this.state.dicshopstatus;
    const datadiczone = this.state.diczone;
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
      { title: '门店编码', dataIndex: 'shop_id', width: 150, sorter: false, },
      { title: '门店前缀', dataIndex: 'shop_pre', width: 150, sorter: false, },
      { title: '门店简称', dataIndex: 'shop_name', width: 150, sorter: false, },
      { title: '门店全称', dataIndex: 'shop_fullname', width: 150, sorter: false, },
      { title: '经度', dataIndex: 'shop_lon', width: 150, sorter: false, },
      { title: '纬度', dataIndex: 'shop_lat', width: 150, sorter: false, },
      {
        title: '区域',
        // dataIndex: 'zone_code',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadiczone) return <span>{record.zone_code}</span>;
          const temp = datadiczone.find(item => item.zone_code === record.zone_code);
          if (!temp) return <span>{record.zone_code}</span>;
          return <span>{temp.zone_name}</span>;
        },
      },
      { title: '门店地址', dataIndex: 'shop_address', width: 150, sorter: false, },
      { title: '合同编号', dataIndex: 'shop_hetong', width: 150, sorter: false, },
      { title: '门店电话', dataIndex: 'shop_tel', width: 150, sorter: false, },
      {
        title: '门店状态',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadicshopstatus) return <span>{record.shop_status}</span>;
          const temp = datadicshopstatus.find(item => item.dicCode === record.shop_status);
          if (!temp) return <span>{record.shop_status}</span>;
          return <span>{temp.dicValue}</span>;
        },
      },
      { title: '代理商id', dataIndex: 'dls_id', width: 150, sorter: false, },
      { title: '业务人员id', dataIndex: 'yw_user_id', width: 150, sorter: false, },
      {
        title: '汇款速度',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadichdhkspeed) return <span>{record.hk_speed}</span>;
          const temp = datadichdhkspeed.find(item => item.dicCode === record.hk_speed);
          if (!temp) return <span>{record.hk_speed}</span>;
          return <span>{temp.dicValue}</span>;
        },
      },
      {
        title: '门店等级',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadichdmdlevel) return <span>{record.shop_level}</span>;
          const temp = datadichdmdlevel.find(item => item.dicCode === record.shop_level);
          if (!temp) return <span>{record.shop_level}</span>;
          return <span>{temp.dicValue}</span>;
        },
      },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false, },
    ];

    const listConfig = {
      url: '/api/HdShop/queryHdShopList', // 必填,请求url
      scroll: { x: 2400, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch} >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='门店编码'>{getFieldDecorator('shop_id', { initialValue: this.props.list.queryMap.shop_id, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='门店前缀'>{getFieldDecorator('shop_pre', { initialValue: this.props.list.queryMap.shop_pre, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='门店简称'>{getFieldDecorator('shop_name', { initialValue: this.props.list.queryMap.shop_name, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='门店全称'>{getFieldDecorator('shop_fullname', { initialValue: this.props.list.queryMap.shop_fullname, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='经度'>{getFieldDecorator('shop_lon', { initialValue: this.props.list.queryMap.shop_lon, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='纬度'>{getFieldDecorator('shop_lat', { initialValue: this.props.list.queryMap.shop_lat, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} hasFeedback label="区域">
                  {getFieldDecorator('zone_code', {
                    initialValue:this.props.list.queryMap.zone_code,
                  })(
                    <Select showSearch allowClear placeholder="区域">
                      {datadiczone &&
                        datadiczone.map(item => {
                          return (
                            <Option value={item.zone_code}>
                              {item.zone_code}
                              {item.zone_name}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='门店地址'>{getFieldDecorator('shop_address', { initialValue: this.props.list.queryMap.shop_address, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='合同编号'>{getFieldDecorator('shop_hetong', { initialValue: this.props.list.queryMap.shop_hetong, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='门店电话'>{getFieldDecorator('shop_tel', { initialValue: this.props.list.queryMap.shop_tel, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} hasFeedback label="门店状态">
                  {getFieldDecorator('shop_status', {
                    initialValue: this.props.list.queryMap.shop_status,
                    rules: [
                      {
                        required: false,
                        message: '门店状态不能丢失!',
                      },
                      { max: 64, message: '门店状态必须小于64位!' },
                    ],
                  })(
                    <Select showSearch allowClear placeholder="门店状态">
                      {datadicshopstatus &&
                        datadicshopstatus.map(item => {
                          return <Option value={item.dicCode}>{item.dicValue}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='代理商id'>{getFieldDecorator('dls_id', { initialValue: this.props.list.queryMap.dls_id, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='业务人员id'>{getFieldDecorator('yw_user_id', { initialValue: this.props.list.queryMap.yw_user_id, })(<Input placeholder='请输入' />)} </FormItem> </Col>
              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} hasFeedback label="汇款速度">
                  {getFieldDecorator('hk_speed', {
                    initialValue: this.props.list.queryMap.hk_speed,
                    rules: [
                      {
                        required: false,
                        message: '汇款速度不能丢失!',
                      },
                      { max: 64, message: '汇款速度必须小于64位!' },
                    ],
                  })(
                    <Select showSearch allowClear placeholder="汇款速度">
                      {datadichdhkspeed &&
                        datadichdhkspeed.map(item => {
                          return <Option value={item.dicCode}>{item.dicValue}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} hasFeedback label="门店等级">
                  {getFieldDecorator('shop_level', {
                    initialValue: this.props.list.queryMap.shop_level,
                    rules: [
                      {
                        required: false,
                        message: '门店等级不能丢失!',
                      },
                      { max: 64, message: '门店等级必须小于64位!' },
                    ],
                  })(
                    <Select showSearch allowClear placeholder="门店等级">
                      {datadichdmdlevel &&
                        datadichdmdlevel.map(item => {
                          return <Option value={item.dicCode}>{item.dicValue}</Option>; ``
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
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
