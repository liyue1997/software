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
import db from '../../utils/db';

const FormItem = Form.Item;
const { Option } = Select;
//const routerUrl = cache.keysMenu.HdDz;
const routerUrl = '/HdDz';
const url = 'HdDz';
const rowKey = 'jz_order_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class HdDzList extends Component {
  state = {
    scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
    hdhuodong:[],
    hdshop:[]
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    const {dispatch} = this.props;
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
          filename: '对账单.xls',
          queryMap: { ...values, ...date } || {},
        },
        url,
      });
    });
  };


  render() {
    const { form, base } = this.props;
    const datahdhuodong = this.state.hdhuodong;
    const datahdshop = this.state.hdshop;

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
      { title: '结账单号', dataIndex: 'jz_order_id', width: 150, sorter: false, },
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

      // { title: '门店编码', dataIndex: 'shop_id', width: 150, sorter: false, },
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
      { title: '人员数量', dataIndex: 'user_count', width: 150, sorter: false, },
      { title: '支付金额', dataIndex: 'pay_money', width: 150, sorter: false, },
      { title: '支付费用', dataIndex: 'pay_fee', width: 150, sorter: false, },
      { title: '应付金额', dataIndex: 'pay_needmoney', width: 150, sorter: false, },
      { title: '实付金额', dataIndex: 'pay_realmoney', width: 150, sorter: false, },
      { title: '付款时间', dataIndex: 'pay_time', width: 150, sorter: false, },
      { title: '付款人员', dataIndex: 'pay_user', width: 150, sorter: false, },
      { title: '付款单据号', dataIndex: 'pay_order', width: 150, sorter: false, },
      { title: '付款方式', dataIndex: 'pay_type', width: 150, sorter: false, },
      { title: '备注', dataIndex: 'payr_demo', width: 150, sorter: false, },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false, },

    ];
    var usertoken= db.get('currentUser'); 
    var userstatus = null;
    if (!usertoken.extendInfo)
       return (<div>你已经退出</div>);
    if(usertoken.extendInfo.userType === 'shop'){
      columns.shift();
      userstatus = false
     } else {
      userstatus = true
     }
 
    const listConfig = {
      url: '/api/HdDz/queryHdDzList', // 必填,请求url
      scroll: { x: 2100, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch} >
            {userstatus?
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='结账单号'>{getFieldDecorator('jz_order_id', { initialValue: this.props.list.queryMap.jz_order_id, })(<Input placeholder='请输入' />)} </FormItem> </Col>
            <Col {...formItemGrid}>  
            <FormItem {...formItemLayout} hasFeedback label="活动">
                {getFieldDecorator('huodong_id', {
                  initialValue:this.props.list.queryMap.huodong_id,
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
            <Col 
            {...formItemGrid}>  
            {/* <FormItem {...formItemLayout} label='门店编码'>
            {getFieldDecorator('shop_id', { initialValue: this.props.list.queryMap.shop_id, })
            (<Input placeholder='请输入' />)} 
            </FormItem>  */}
            <FormItem {...formItemLayout} hasFeedback label="门店">
                {getFieldDecorator('shop_id', {
                  initialValue:this.props.list.queryMap.shop_id,
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
         
            <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='付款时间(起始)'>{getFieldDecorator('start_pay_time', { initialValue: this.props.list.queryMap.start_pay_time ? moment(this.props.list.queryMap.start_pay_time) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
            <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='付款时间(结束)'>{getFieldDecorator('end_pay_time', { initialValue: this.props.list.queryMap.end_pay_time ? moment(this.props.list.queryMap.end_pay_time) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
            <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='付款单据号'>{getFieldDecorator('pay_order', { initialValue: this.props.list.queryMap.pay_order, })(<Input placeholder='请输入' />)} </FormItem> </Col>
                       </Row>:''}
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
