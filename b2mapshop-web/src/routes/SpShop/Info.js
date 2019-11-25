/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:55:55 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Button, Spin, Select,DatePicker} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';

import Operate from '../../components/Oprs';

import '../../utils/utils.less';
import { isEmpty } from '../../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;
const DateFormat = 'YYYY-MM-DD';
const url = 'SpShop';

function handleChange(value) {
  console.log(`selected ${value}`);
}

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
        if (this.props.base.info.shopId) {
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
           <FormItem {...formItemLayout} hasFeedback label="商铺ID">
{getFieldDecorator('shopId', {
 initialValue: info.shopId || newInfo.shopId,
  rules: [
    {
      required: true,
      message: '商铺ID不能缺失!',
    },
  ],
 })(<Input disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商铺简称">
{getFieldDecorator('shopName', {
 initialValue: info.shopName ||  newInfo.shopName,
  rules: [
    {
      required: true,
      message: '商铺简称不能缺失!',
    },{ max: 64,message: '商铺简称必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商铺全称">
{getFieldDecorator('shopFullname', {
 initialValue: info.shopFullname ||  newInfo.shopFullname,
  rules: [
    {
      required: true,
      message: '商铺全称不能缺失!',
    },{ max: 64,message: '商铺全称必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商品电话">
{getFieldDecorator('shopTel', {
 initialValue: info.shopTel ||  newInfo.shopTel,
  rules: [
    {
      required: true,
      message: '商品电话不能缺失!',
    },{ max: 64,message: '商品电话必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商铺手机">
{getFieldDecorator('shopPhone', {
 initialValue: info.shopPhone ||  newInfo.shopPhone,
  rules: [
    {
      required: true,
      message: '商铺手机不能缺失!',
    },{ max: 32,message: '商铺手机必须小于32位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="经度">
{getFieldDecorator('shopLon', {
 initialValue: info.shopLon ||  newInfo.shopLon,
  rules: [
    {
      required: true,
      message: '经度不能缺失!',
    },{ max: 64,message: '经度必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="纬度">
{getFieldDecorator('shopLat', {
 initialValue: info.shopLat ||  newInfo.shopLat,
  rules: [
    {
      required: true,
      message: '纬度不能缺失!',
    },{ max: 64,message: '纬度必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="城市">
{getFieldDecorator('cityName', {
 initialValue: info.cityName ||  newInfo.cityName,
  rules: [
    {
      required: true,
      message: '城市不能缺失!',
    },{ max: 64,message: '城市必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="区域">
{getFieldDecorator('areaName', {
 initialValue: info.areaName ||  newInfo.areaName,
  rules: [
    {
      required: true,
      message: '区域不能缺失!',
    },{ max: 64,message: '区域必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商铺地址">
{getFieldDecorator('shopAddress', {
 initialValue: info.shopAddress ||  newInfo.shopAddress,
  rules: [
    {
      required: true,
      message: '商铺地址不能缺失!',
    },{ max: 128,message: '商铺地址必须小于128位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商铺审核状态">
{getFieldDecorator('shopStatus', {
 initialValue: info.shopStatus ||  newInfo.shopStatus,
  rules: [
    {
      required: true,
      message: '商铺审核状态不能缺失!',
    },{ required: true,message: '商铺审核状态不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商铺评分">
{getFieldDecorator('shopScore', {
 initialValue: info.shopScore ||  newInfo.shopScore,
  rules: [
    {
      required: true,
      message: '商铺评分不能缺失!',
    },{ max: 32,message: '商铺评分必须小于32位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="人均消费">
{getFieldDecorator('shopAverage', {
 initialValue: info.shopAverage ||  newInfo.shopAverage,
  rules: [
    {
      required: true,
      message: '人均消费不能缺失!',
    },{ required: true,message: '人均消费不能缺失!', },
  ],
 })(<InputNumber min={0} disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="商铺标签">
{getFieldDecorator('shopTags', {
 initialValue: info.shopTags ||  newInfo.shopTags,
  rules: [
    {
      required: true,
      message: '商铺标签不能缺失!',
    },{ max: 64,message: '商铺标签必须小于64位!',   },
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
