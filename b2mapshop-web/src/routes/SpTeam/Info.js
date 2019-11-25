/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:55:55 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Button, Spin, Select,DatePicker } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';

import Operate from '../../components/Oprs';

import '../../utils/utils.less';
import { isEmpty } from '../../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;
const DateFormat = 'YYYY-MM-DD';
const url = 'SpTeam';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};
const submitFormLayout = {
  wrapperCol: {
    xs: { span: 10, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

@connect(({ base, loading }) => ({
  base,
  submitting: loading.effects['base/fetch'] || loading.effects['base/fetchAdd'],
  loading: loading.effects['base/info'] || loading.effects['base/new'] || false,
}))
@Form.create()
export default class DicManagerInfo extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.base.info.id || (this.props.location.state && this.props.location.state.id)) {
      dispatch({
        type: 'base/info',
        payload: {
          id: this.props.location.state.id,
        },
        url,
      });
    } else {
      dispatch({
        type: 'base/new',
        url,
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'base/clear',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
         let temp = {};
        if (!isEmpty(values.startDate))
temp = {
  ...temp,
  startDate: values.startDate.format(DateFormat),
  };
if (!isEmpty(values.endDate))
temp = {
  ...temp,
  endDate: values.endDate.format(DateFormat),
  };
if (!isEmpty(values.validDate))
temp = {
  ...temp,
  validDate: values.validDate.format(DateFormat),
  };


        const { dispatch } = this.props;
        if (this.props.base.info.teamId) {
          dispatch({
            type: 'base/fetch',
            payload: {
              ...values,
                  ...temp,
            },
            callback: () => dispatch(routerRedux.goBack()),
            url,
          });
        } else {
          dispatch({
            type: 'base/fetchAdd',
            payload: {
              ...this.props.base.newInfo,
              ...values,
                  ...temp,
            },
            callback: () => dispatch(routerRedux.goBack()),
            url,
          });
        }
      }
    });
  };

  render() {
    const { submitting, form, loading, base } = this.props;
    const { getFieldDecorator } = form;
    
  const { info, newInfo } = base;

    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
           <FormItem {...formItemLayout} hasFeedback label="组团id">
{getFieldDecorator('teamId', {
 initialValue: info.teamId || newInfo.teamId,
  rules: [
    {
      required: true,
      message: '组团id不能缺失!',
    },
  ],
 })(<Input disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="优惠id">
{getFieldDecorator('discountId', {
 initialValue: info.discountId ||  newInfo.discountId,
  rules: [
    {
      required: true,
      message: '优惠id不能缺失!',
    },{ max: 64,message: '优惠id必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商铺ID">
{getFieldDecorator('shopId', {
 initialValue: info.shopId ||  newInfo.shopId,
  rules: [
    {
      required: true,
      message: '商铺ID不能缺失!',
    },{ max: 64,message: '商铺ID必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="优惠商品">
{getFieldDecorator('teamName', {
 initialValue: info.teamName ||  newInfo.teamName,
  rules: [
    {
      required: true,
      message: '优惠商品不能缺失!',
    },{ max: 64,message: '优惠商品必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="优惠策略">
{getFieldDecorator('discountDesc', {
 initialValue: info.discountDesc ||  newInfo.discountDesc,
  rules: [
    {
      required: true,
      message: '优惠策略不能缺失!',
    },{ max: 512,message: '优惠策略必须小于512位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="最小组团人数">
{getFieldDecorator('minUsers', {
 initialValue: info.minUsers ||  newInfo.minUsers,
  rules: [
    {
      required: true,
      message: '最小组团人数不能缺失!',
    },{ required: true,message: '最小组团人数不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="发起用户">
{getFieldDecorator('startUserid', {
 initialValue: info.startUserid ||  newInfo.startUserid,
  rules: [
    {
      required: true,
      message: '发起用户不能缺失!',
    },{ max: 64,message: '发起用户必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="发起时间">
{getFieldDecorator('startDate', {
 initialValue:moment(info.startDate) ||  moment(newInfo.startDate),
  rules: [
    {
      required: true,
      message: '发起时间不能缺失!',
    },
  ],
 })(<DatePicker format={DateFormat} placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="结束时间">
{getFieldDecorator('endDate', {
 initialValue:moment(info.endDate) ||  moment(newInfo.endDate),
  rules: [
    {
      required: true,
      message: '结束时间不能缺失!',
    },
  ],
 })(<DatePicker format={DateFormat} placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="有效截至时间">
{getFieldDecorator('validDate', {
 initialValue:moment(info.validDate) ||  moment(newInfo.validDate),
  rules: [
    {
      required: true,
      message: '有效截至时间不能缺失!',
    },
  ],
 })(<DatePicker format={DateFormat} placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="是否成团">
{getFieldDecorator('isvalided', {
 initialValue: info.isvalided ||  newInfo.isvalided,
  rules: [
    {
      required: true,
      message: '是否成团不能缺失!',
    },{ required: true,message: '是否成团不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="是否取消">
{getFieldDecorator('iscancle', {
 initialValue: info.iscancle ||  newInfo.iscancle,
  rules: [
    {
      required: true,
      message: '是否取消不能缺失!',
    },{ required: true,message: '是否取消不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="当前组队人数">
{getFieldDecorator('teamusercount', {
 initialValue: info.teamusercount ||  newInfo.teamusercount,
  rules: [
    {
      required: true,
      message: '当前组队人数不能缺失!',
    },{ required: true,message: '当前组队人数不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>

          
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button
              onClick={() => {
                this.props.dispatch(routerRedux.goBack());
              }}
            >
              返回
            </Button>
            <Operate operateName="SAVE">
              <Button
                style={{ marginLeft: 12 }}
                type="primary"
                htmlType="submit"
                loading={submitting}
              >
                保存
              </Button>
            </Operate>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}
