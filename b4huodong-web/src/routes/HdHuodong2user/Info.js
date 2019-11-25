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
const url = 'HdHuodong2user';

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
        if (!isEmpty(values.hxTime))
          temp = {
            ...temp,
            hxTime: values.hxTime.format(DateFormat),
          };


        const { dispatch } = this.props;
        if (this.props.base.info.huodonguserId) {
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
          <FormItem {...formItemLayout} hasFeedback label="参与标识">
            {getFieldDecorator('huodonguserId', {
              initialValue: info.huodonguserId || newInfo.huodonguserId,
              rules: [
                {
                  required: true,
                  message: '参与标识不能缺失!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          {/* <FormItem {...formItemLayout} hasFeedback label="活动编号">
            {getFieldDecorator('huodongId', {
              initialValue: info.huodongId || newInfo.huodongId,
              rules: [
                {
                  required: true,
                  message: '活动编号不能缺失!',
                }, { max: 64, message: '活动编号必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem> */}
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
          <FormItem {...formItemLayout} hasFeedback label="用户id">
            {getFieldDecorator('userId', {
              initialValue: info.userId || newInfo.userId,
              rules: [
                {
                  required: true,
                  message: '用户id不能缺失!',
                }, { max: 64, message: '用户id必须小于64位!', },
              ],
            })(<Input placeholder="请输入" disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="姓名">
            {getFieldDecorator('userName', {
              initialValue: info.userName || newInfo.userName,
              rules: [
                {
                  required: false,
                  message: '姓名不能缺失!',
                }
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          {/* <FormItem {...formItemLayout} hasFeedback label="门店编码">
            {getFieldDecorator('shopId', {
              initialValue: info.shopId || newInfo.shopId,
              rules: [
                {
                  required: false,
                  message: '门店编码不能缺失!',
                }, { max: 64, message: '门店编码必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem> */}
          <FormItem {...formItemLayout} hasFeedback label="车牌号">
            {getFieldDecorator('userCar', {
              initialValue: info.userCar || newInfo.userCar,
              rules: [
                {
                  required: false,
                  message: '车牌号不能缺失!',
                }, { max: 32, message: '车牌号必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="用户手机号">
            {getFieldDecorator('userPhone', {
              initialValue: info.userPhone || newInfo.userPhone,
              rules: [
                {
                  required: false,
                  message: '用户手机号不能缺失!',
                }, { max: 32, message: '用户手机号必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="用户车型">
            {getFieldDecorator('userCartype', {
              initialValue: info.userCartype || newInfo.userCartype,
              rules: [
                {
                  required: false,
                  message: '用户车型不能缺失!',
                }, { max: 32, message: '用户车型必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          {/* <FormItem {...formItemLayout} hasFeedback label="报名状态">
            {getFieldDecorator('infoStatus', {
              initialValue: info.infoStatus || newInfo.infoStatus,
              rules: [
                {
                  required: true,
                  message: '报名状态不能缺失!',
                },
              ],
            })()}
          </FormItem> */}
          {/* <FormItem {...formItemLayout} hasFeedback label="支付状态">
            {getFieldDecorator('payStatus', {
              initialValue: info.payStatus || newInfo.payStatus,
              rules: [
                {
                  required: true,
                  message: '支付状态不能缺失!',
                },
              ],
            })()}
          </FormItem> */}
          <FormItem {...formItemLayout} hasFeedback label="支付单据号">
            {getFieldDecorator('payOrder', {
              initialValue: info.payOrder || newInfo.payOrder,
              rules: [
                {
                  required: true,
                  message: '支付单据号不能缺失!',
                }, { max: 64, message: '支付单据号必须小于64位!', },
              ],
            })(<Input placeholder="请输入" disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="支付方式">
            {getFieldDecorator('payType', {
              initialValue: info.payType || newInfo.payType,
              rules: [
                {
                  required: true,
                  message: '支付方式不能缺失!',
                }, { max: 64, message: '支付方式必须小于64位!', },
              ],
            })(<Input placeholder="请输入" disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="支付时间">
            {getFieldDecorator('payTime', {
              initialValue: moment(info.payTime) || moment(newInfo.payTime),
              rules: [
                {
                  required: true,
                  message: '支付时间不能缺失!',
                },
              ],
            })(<DatePicker format={DateFormat} placeholder="请输入" disabled/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="备注">
            {getFieldDecorator('userDemo', {
              initialValue: info.userDemo || newInfo.userDemo,
              rules: [
                {
                  required: false,
                  message: '备注不能缺失!',
                }, { max: 1024, message: '备注必须小于1024位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="核销时间">
            {getFieldDecorator('hxTime', {
              initialValue: moment(info.hxTime) || moment(newInfo.hxTime),
              rules: [
                {
                  required: false,
                  message: '核销时间不能缺失!',
                },
              ],
            })(<DatePicker format={DateFormat} placeholder="请输入" disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="核销人员">
            {getFieldDecorator('hxUser', {
              initialValue: info.hxUser || newInfo.hxUser,
              rules: [
                {
                  required: false,
                  message: '核销人员不能缺失!',
                }, { max: 64, message: '核销人员必须小于64位!', },
              ],
            })(<Input placeholder="请输入" disabled/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="结账单号">
            {getFieldDecorator('jzOrder', {
              initialValue: info.jzOrder || newInfo.jzOrder,
              rules: [
                {
                  required: false,
                  message: '结账单号不能缺失!',
                }, { max: 64, message: '结账单号必须小于64位!', },
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
