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
//const routerUrl = cache.keysMenu.SpTeam;
const routerUrl ='/SpTeam';
const url = 'SpTeam';
const rowKey = 'team_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class SpTeamList extends Component {
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
      if (!isEmpty(values.start_start_date))
temp = {
  ...temp,
  start_start_date: values.start_start_date.format(DateFormat),
 };
if (!isEmpty(values.end_start_date))
temp = {
  ...temp,
  end_start_date: values.end_start_date.format(DateFormat),
 };
if (!isEmpty(values.start_end_date))
temp = {
  ...temp,
  start_end_date: values.start_end_date.format(DateFormat),
 };
if (!isEmpty(values.end_end_date))
temp = {
  ...temp,
  end_end_date: values.end_end_date.format(DateFormat),
 };
if (!isEmpty(values.start_valid_date))
temp = {
  ...temp,
  start_valid_date: values.start_valid_date.format(DateFormat),
 };
if (!isEmpty(values.end_valid_date))
temp = {
  ...temp,
  end_valid_date: values.end_valid_date.format(DateFormat),
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
        filename: '组团.xls',
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
       {  title: '组团id',   dataIndex: 'team_id',     width: 150,     sorter: false,      },
 {  title: '优惠id',   dataIndex: 'discount_id',     width: 150,     sorter: false,      },
 {  title: '商铺ID',   dataIndex: 'shop_id',     width: 150,     sorter: false,      },
 {  title: '优惠商品',   dataIndex: 'team_name',     width: 150,     sorter: false,      },
 {  title: '优惠策略',   dataIndex: 'discount_desc',     width: 150,     sorter: false,      },
 {  title: '最小组团人数',   dataIndex: 'min_users',     width: 150,     sorter: false,      },
 {  title: '发起用户',   dataIndex: 'start_userid',     width: 150,     sorter: false,      },
 {  title: '发起时间',   dataIndex: 'start_date',     width: 150,     sorter: false,      },
 {  title: '结束时间',   dataIndex: 'end_date',     width: 150,     sorter: false,      },
 {  title: '有效截至时间',   dataIndex: 'valid_date',     width: 150,     sorter: false,      },
 {  title: '是否成团',   dataIndex: 'isvalided',     width: 150,     sorter: false,      },
 {  title: '是否取消',   dataIndex: 'iscancle',     width: 150,     sorter: false,      },
 {  title: '当前组队人数',   dataIndex: 'teamusercount',     width: 150,     sorter: false,      },
 {  title: '创建时间',   dataIndex: 'create_date',     width: 150,     sorter: false,      },

    ];

    const listConfig = {
      url: '/api/SpTeam/querySpTeamList', // 必填,请求url
      scroll: { x: 2100, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch} >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col {...formItemGrid}>  <FormItem {...formItemLayout} label='组团id'>{getFieldDecorator('team_id',{initialValue: this.props.list.queryMap.team_id, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='优惠id'>{getFieldDecorator('discount_id',{initialValue: this.props.list.queryMap.discount_id, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='商铺ID'>{getFieldDecorator('shop_id',{initialValue: this.props.list.queryMap.shop_id, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='优惠商品'>{getFieldDecorator('team_name',{initialValue: this.props.list.queryMap.team_name, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='优惠策略'>{getFieldDecorator('discount_desc',{initialValue: this.props.list.queryMap.discount_desc, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='最小组团人数(起始)'>{getFieldDecorator('start_min_users',{initialValue: this.props.list.queryMap.start_min_users  ? moment(this.props.list.queryMap.start_min_users): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='最小组团人数(结束)'>{getFieldDecorator('end_min_users',{initialValue: this.props.list.queryMap.end_min_users  ? moment(this.props.list.queryMap.end_min_users): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='发起用户'>{getFieldDecorator('start_userid',{initialValue: this.props.list.queryMap.start_userid, })(<Input placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='发起时间(起始)'>{getFieldDecorator('start_start_date',{initialValue: this.props.list.queryMap.start_start_date ? moment(this.props.list.queryMap.start_start_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='发起时间(结束)'>{getFieldDecorator('end_start_date',{initialValue: this.props.list.queryMap.end_start_date? moment(this.props.list.queryMap.end_start_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='结束时间(起始)'>{getFieldDecorator('start_end_date',{initialValue: this.props.list.queryMap.start_end_date ? moment(this.props.list.queryMap.start_end_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='结束时间(结束)'>{getFieldDecorator('end_end_date',{initialValue: this.props.list.queryMap.end_end_date? moment(this.props.list.queryMap.end_end_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='有效截至时间(起始)'>{getFieldDecorator('start_valid_date',{initialValue: this.props.list.queryMap.start_valid_date ? moment(this.props.list.queryMap.start_valid_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='有效截至时间(结束)'>{getFieldDecorator('end_valid_date',{initialValue: this.props.list.queryMap.end_valid_date? moment(this.props.list.queryMap.end_valid_date) : null, })(<DatePicker format={DateFormat} placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='是否成团(起始)'>{getFieldDecorator('start_isvalided',{initialValue: this.props.list.queryMap.start_isvalided  ? moment(this.props.list.queryMap.start_isvalided): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='是否成团(结束)'>{getFieldDecorator('end_isvalided',{initialValue: this.props.list.queryMap.end_isvalided  ? moment(this.props.list.queryMap.end_isvalided): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='是否取消(起始)'>{getFieldDecorator('start_iscancle',{initialValue: this.props.list.queryMap.start_iscancle  ? moment(this.props.list.queryMap.start_iscancle): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='是否取消(结束)'>{getFieldDecorator('end_iscancle',{initialValue: this.props.list.queryMap.end_iscancle  ? moment(this.props.list.queryMap.end_iscancle): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='当前组队人数(起始)'>{getFieldDecorator('start_teamusercount',{initialValue: this.props.list.queryMap.start_teamusercount  ? moment(this.props.list.queryMap.start_teamusercount): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
<Col {...formItemGrid}>  <FormItem {...formItemLayout} label='当前组队人数(结束)'>{getFieldDecorator('end_teamusercount',{initialValue: this.props.list.queryMap.end_teamusercount  ? moment(this.props.list.queryMap.end_teamusercount): null, })
 (<InputNumber  placeholder='请输入' />)} </FormItem> </Col>
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
