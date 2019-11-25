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
const url = 'HdDls';

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
        if (this.props.base.info.dlsId) {
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
           <FormItem {...formItemLayout} hasFeedback label="代理商编码">
{getFieldDecorator('dlsId', {
 initialValue: info.dlsId || newInfo.dlsId,
  rules: [
    {
      required: true,
      message: '代理商编码不能缺失!',
    },
  ],
 })(<Input disabled />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="代理商简称">
{getFieldDecorator('dlsName', {
 initialValue: info.dlsName ||  newInfo.dlsName,
  rules: [
    {
      required: true,
      message: '代理商简称不能缺失!',
    },{ max: 64,message: '代理商简称必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="代理商全称">
{getFieldDecorator('dlsFullname', {
 initialValue: info.dlsFullname ||  newInfo.dlsFullname,
  rules: [
    {
      required: true,
      message: '代理商全称不能缺失!',
    },{ max: 64,message: '代理商全称必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="经度">
{getFieldDecorator('dlsLon', {
 initialValue: info.dlsLon ||  newInfo.dlsLon,
  rules: [
    {
      required: false,
      message: '经度不能缺失!',
    },{ max: 64,message: '经度必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="纬度">
{getFieldDecorator('dlsLat', {
 initialValue: info.dlsLat ||  newInfo.dlsLat,
  rules: [
    {
      required: false,
      message: '纬度不能缺失!',
    },{ max: 64,message: '纬度必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="区域编码">
{getFieldDecorator('zoneCode', {
 initialValue: info.zoneCode ||  newInfo.zoneCode,
  rules: [
    {
      required: false,
      message: '区域编码不能缺失!',
    },{ max: 64,message: '区域编码必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="代理商地址">
{getFieldDecorator('dlsAddress', {
 initialValue: info.dlsAddress ||  newInfo.dlsAddress,
  rules: [
    {
      required: false,
      message: '代理商地址不能缺失!',
    },{ max: 512,message: '代理商地址必须小于512位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="合同编号">
{getFieldDecorator('dlsHetong', {
 initialValue: info.dlsHetong ||  newInfo.dlsHetong,
  rules: [
    {
      required: false,
      message: '合同编号不能缺失!',
    },{ max: 64,message: '合同编号必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 <FormItem {...formItemLayout} hasFeedback label="代理商电话">
{getFieldDecorator('dlsTel', {
 initialValue: info.dlsTel ||  newInfo.dlsTel,
  rules: [
    {
      required: false,
      message: '代理商电话不能缺失!',
    },{ max: 64,message: '代理商电话必须小于64位!',   },
  ],
 })(<Input placeholder="请输入" />)}
 </FormItem>
 {/* <FormItem {...formItemLayout} hasFeedback label="代理商状态">
{getFieldDecorator('dlsStatus', {
 initialValue: info.dlsStatus ||  newInfo.dlsStatus,
  rules: [
    {
      required: true,
      message: '代理商状态不能缺失!',
    },
  ],
 })()}
 </FormItem> */}

          
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
