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
const url = 'SpTeamuser';

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


        const { dispatch } = this.props;
        if (this.props.base.info.userId) {
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
           <FormItem {...formItemLayout} hasFeedback label="">
{getFieldDecorator('teamId', {
 initialValue: info.teamId || newInfo.teamId,
  rules: [
    {
      required: true,
      message: '不能缺失!',
    },
  ],
 })(<Input disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="用户id">
{getFieldDecorator('userId', {
 initialValue: info.userId || newInfo.userId,
  rules: [
    {
      required: true,
      message: '用户id不能缺失!',
    },
  ],
 })(<Input disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="参与时间">
{getFieldDecorator('startDate', {
 initialValue:moment(info.startDate) ||  moment(newInfo.startDate),
  rules: [
    {
      required: true,
      message: '参与时间不能缺失!',
    },
  ],
 })(<DatePicker format={DateFormat} placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="是否关注">
{getFieldDecorator('iscare', {
 initialValue: info.iscare ||  newInfo.iscare,
  rules: [
    {
      required: true,
      message: '是否关注不能缺失!',
    },{ required: true,message: '是否关注不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="是否参与">
{getFieldDecorator('isteamer', {
 initialValue: info.isteamer ||  newInfo.isteamer,
  rules: [
    {
      required: true,
      message: '是否参与不能缺失!',
    },{ required: true,message: '是否参与不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商户对用户评分">
{getFieldDecorator('userCredits', {
 initialValue: info.userCredits ||  newInfo.userCredits,
  rules: [
    {
      required: true,
      message: '商户对用户评分不能缺失!',
    },{ required: true,message: '商户对用户评分不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商户对用户评论">
{getFieldDecorator('userCreditsDesc', {
 initialValue: info.userCreditsDesc ||  newInfo.userCreditsDesc,
  rules: [
    {
      required: true,
      message: '商户对用户评论不能缺失!',
    },{ max: 512,message: '商户对用户评论必须小于512位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="用户评分">
{getFieldDecorator('shopCredits', {
 initialValue: info.shopCredits ||  newInfo.shopCredits,
  rules: [
    {
      required: true,
      message: '用户评分不能缺失!',
    },{ required: true,message: '用户评分不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="用户评论">
{getFieldDecorator('shopCreditsDesc', {
 initialValue: info.shopCreditsDesc ||  newInfo.shopCreditsDesc,
  rules: [
    {
      required: true,
      message: '用户评论不能缺失!',
    },{ max: 512,message: '用户评论必须小于512位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="是否付款">
{getFieldDecorator('ispayed', {
 initialValue: info.ispayed ||  newInfo.ispayed,
  rules: [
    {
      required: true,
      message: '是否付款不能缺失!',
    },{ required: true,message: '是否付款不能缺失!', },
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
