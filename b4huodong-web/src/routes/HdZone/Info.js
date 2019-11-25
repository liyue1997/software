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
const url = 'HdZone';

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
        if (this.props.base.info.zoneCode) {
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
           <FormItem {...formItemLayout} hasFeedback label="区域编码">
{getFieldDecorator('zoneCode', {
 initialValue: info.zoneCode || newInfo.zoneCode,
  rules: [
    {
      required: true,
      message: '区域编码不能缺失!',
    },
  ],
 })(<Input placeholder="请输入行政编号" disabled={!!(info.zoneCode || newInfo.zoneCode)} />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="区域简称">
{getFieldDecorator('zoneName', {
 initialValue: info.zoneName ||  newInfo.zoneName,
  rules: [
    {
      required: true,
      message: '区域简称不能缺失!',
    },{ max: 64,message: '区域简称必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="区域全称">
{getFieldDecorator('zoneFullname', {
 initialValue: info.zoneFullname ||  newInfo.zoneFullname,
  rules: [
    {
      required: true,
      message: '区域全称不能缺失!',
    },{ max: 64,message: '区域全称必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="经度">
{getFieldDecorator('zoneLon', {
 initialValue: info.zoneLon ||  newInfo.zoneLon,
  rules: [
    {
      required: true,
      message: '经度不能缺失!',
    },{ max: 64,message: '经度必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="纬度">
{getFieldDecorator('zoneLat', {
 initialValue: info.zoneLat ||  newInfo.zoneLat,
  rules: [
    {
      required: true,
      message: '纬度不能缺失!',
    },{ max: 64,message: '纬度必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="显示级别">
{getFieldDecorator('zoneLevel', {
 initialValue: info.zoneLevel ||  newInfo.zoneLevel,
  rules: [
    {
      required: true,
      message: '显示级别不能缺失!',
    },{ required: true,message: '显示级别不能缺失!', },
  ],
 })(<InputNumber min={0}  />)}
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
