/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:55:55 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Button, Spin, Select, DatePicker } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';

import Operate from '../../components/Oprs';

import '../../utils/utils.less';
import { isEmpty } from '../../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;
const DateFormat = 'YYYY-MM-DD HH:mm:ss';
const url = 'HdDz';

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
  state = {
    hdhuodong:[],
    hdshop:[]
  }
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
        const newValue = { ...values };
        newValue.huodongId = this.props.base.info.huodongId;
        newValue.shopId = this.props.base.info.shopId;
        if (!isEmpty(values.payTime))
          temp = {
            ...temp,
            payTime: values.payTime.format(DateFormat),
          };
        const { dispatch } = this.props;
        if (this.props.base.info.jzOrderId) {
          dispatch({
            type: 'base/fetch',
            payload: {
              ...newValue,
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
              ...newValue,
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
    const datahdhuodong = this.state.hdhuodong
    const datahdshop = this.state.hdshop
    const { info, newInfo } = base;
    const huodong = datahdhuodong.find(item => item.huodong_id === info.huodongId);
    const HdShop = datahdshop.find(item => item.shop_id === info.shopId);
    
    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="结账单号">
            {getFieldDecorator('jzOrderId', {
              initialValue: info.jzOrderId || newInfo.jzOrderId,
              rules: [
                {
                  required: true,
                  message: '结账单号不能缺失!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="活动">
            {getFieldDecorator('huodongId', {
              initialValue: huodong?huodong.huodong_name:'',
              rules: [
                {
                  required: true,
                  message: '活动不能缺失!',
                }, { max: 64, message: '活动必须小于64位!', },
              ],
            })(<Input placeholder="请输入" disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="门店">
            {getFieldDecorator('shopId', {
              initialValue: HdShop?HdShop.shop_name:'',
              rules: [
                {
                  required: true,
                  message: '门店不能缺失!',
                }, { max: 64, message: '门店必须小于64位!', },
              ],
            })(<Input placeholder="请输入" disabled/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="人员数量">
            {getFieldDecorator('userCount', {
              initialValue: info.userCount || newInfo.userCount,
              rules: [
                {
                  required: true,
                  message: '人员数量不能缺失!',
                }, { required: true, message: '人员数量不能缺失!', },
              ],
            })(<InputNumber min={0} disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="支付金额">
            {getFieldDecorator('payMoney', {
              initialValue: info.payMoney || newInfo.payMoney,
              rules: [
                {
                  required: true,
                  message: '支付金额不能缺失!',
                }, { required: true, message: '支付金额不能缺失!', },
              ],
            })(<InputNumber min={0} disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="支付费用">
            {getFieldDecorator('payFee', {
              initialValue: info.payFee || newInfo.payFee,
              rules: [
                {
                  required: true,
                  message: '支付费用不能缺失!',
                }, { required: true, message: '支付费用不能缺失!', },
              ],
            })(<InputNumber min={0} disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="应付金额">
            {getFieldDecorator('payNeedmoney', {
              initialValue: info.payNeedmoney || newInfo.payNeedmoney,
              rules: [
                {
                  required: true,
                  message: '应付金额不能缺失!',
                }, { required: true, message: '应付金额不能缺失!', },
              ],
            })(<InputNumber min={0} disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="实付金额">
            {getFieldDecorator('payRealmoney', {
              initialValue: info.payRealmoney || newInfo.payRealmoney,
              rules: [
                {
                  required: true,
                  message: '实付金额不能缺失!',
                }, { required: true, message: '实付金额不能缺失!', },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="付款时间">
            {getFieldDecorator('payTime', {
              initialValue: moment(info.payTime) || moment(newInfo.payTime),
              rules: [
                {
                  required: true,
                  message: '付款时间不能缺失!',
                },
              ],
            })(<DatePicker format={DateFormat} placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="付款人员">
            {getFieldDecorator('payUser', {
              initialValue: info.payUser || newInfo.payUser,
              rules: [
                {
                  required: true,
                  message: '付款人员不能缺失!',
                }, { max: 64, message: '付款人员必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="付款单据号">
            {getFieldDecorator('payOrder', {
              initialValue: info.payOrder || newInfo.payOrder,
              rules: [
                {
                  required: true,
                  message: '付款单据号不能缺失!',
                }, { max: 64, message: '付款单据号必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="付款方式">
            {getFieldDecorator('payType', {
              initialValue: info.payType || newInfo.payType,
              rules: [
                {
                  required: true,
                  message: '付款方式不能缺失!',
                }, { max: 64, message: '付款方式必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="备注">
            {getFieldDecorator('payrDemo', {
              initialValue: info.payrDemo || newInfo.payrDemo,
              rules: [
                {
                  required: true,
                  message: '备注不能缺失!',
                }, { max: 1024, message: '备注必须小于1024位!', },
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
