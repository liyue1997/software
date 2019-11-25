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
const url = 'AppVer';

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
        

        const { dispatch } = this.props;
        if (this.props.base.info.verId) {
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
           <FormItem {...formItemLayout} hasFeedback label="主键">
{getFieldDecorator('verId', {
 initialValue: info.verId || newInfo.verId,
  rules: [
    {
      required: true,
      message: '主键不能缺失!',
    },
  ],
 })(<Input disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="用户类型">
{getFieldDecorator('tUsertype', {
 initialValue: info.tUsertype ||  newInfo.tUsertype,
  rules: [
    {
      required: true,
      message: '用户类型不能缺失!',
    },{ required: true,message: '用户类型不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="版本号">
{getFieldDecorator('tVer', {
 initialValue: info.tVer ||  newInfo.tVer,
  rules: [
    {
      required: true,
      message: '版本号不能缺失!',
    },{ max: 50,message: '版本号必须小于50位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="购买前提示信息">
{getFieldDecorator('infoBeforePaid', {
 initialValue: info.infoBeforePaid ||  newInfo.infoBeforePaid,
  rules: [
    {
      required: true,
      message: '购买前提示信息不能缺失!',
    },{ max: 50,message: '购买前提示信息必须小于50位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="使用前提示信息">
{getFieldDecorator('infoBeforeUse', {
 initialValue: info.infoBeforeUse ||  newInfo.infoBeforeUse,
  rules: [
    {
      required: true,
      message: '使用前提示信息不能缺失!',
    },{ max: 50,message: '使用前提示信息必须小于50位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="是否显示微信支付">
{getFieldDecorator('isWeixinpay', {
 initialValue: info.isWeixinpay ||  newInfo.isWeixinpay,
  rules: [
    {
      required: true,
      message: '是否显示微信支付不能缺失!',
    },{ required: true,message: '是否显示微信支付不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="是否显示微信网页支付">
{getFieldDecorator('isweixinwappay', {
 initialValue: info.isweixinwappay ||  newInfo.isweixinwappay,
  rules: [
    {
      required: true,
      message: '是否显示微信网页支付不能缺失!',
    },{ required: true,message: '是否显示微信网页支付不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="是否显示支付宝支付">
{getFieldDecorator('iszfbpay', {
 initialValue: info.iszfbpay ||  newInfo.iszfbpay,
  rules: [
    {
      required: true,
      message: '是否显示支付宝支付不能缺失!',
    },{ required: true,message: '是否显示支付宝支付不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="是否显示支付宝网页支付">
{getFieldDecorator('iszfbpaywap', {
 initialValue: info.iszfbpaywap ||  newInfo.iszfbpaywap,
  rules: [
    {
      required: true,
      message: '是否显示支付宝网页支付不能缺失!',
    },{ required: true,message: '是否显示支付宝网页支付不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="最低充值金额">
{getFieldDecorator('strPrice', {
 initialValue: info.strPrice ||  newInfo.strPrice,
  rules: [
    {
      required: true,
      message: '最低充值金额不能缺失!',
    },{ max: 50,message: '最低充值金额必须小于50位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="演示链接">
{getFieldDecorator('demolink', {
 initialValue: info.demolink ||  newInfo.demolink,
  rules: [
    {
      required: true,
      message: '演示链接不能缺失!',
    },{ max: 50,message: '演示链接必须小于50位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="免责链接">
{getFieldDecorator('lawlink', {
 initialValue: info.lawlink ||  newInfo.lawlink,
  rules: [
    {
      required: true,
      message: '免责链接不能缺失!',
    },{ max: 50,message: '免责链接必须小于50位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="下载链接">
{getFieldDecorator('downloadlink', {
 initialValue: info.downloadlink ||  newInfo.downloadlink,
  rules: [
    {
      required: true,
      message: '下载链接不能缺失!',
    },{ max: 50,message: '下载链接必须小于50位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="购买">
{getFieldDecorator('paid', {
 initialValue: info.paid ||  newInfo.paid,
  rules: [
    {
      required: true,
      message: '购买不能缺失!',
    },{ max: 50,message: '购买必须小于50位!',   },
  ],
 })(<Input placeholder="请输入" />)}
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
