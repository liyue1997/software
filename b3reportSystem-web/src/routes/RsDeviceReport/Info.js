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
const DateFormat = 'YYYY-MM-DD';
const url = 'RsDeviceReport';

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
        if (this.props.base.info.logId) {
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
          <FormItem {...formItemLayout} hasFeedback label="记录id">
            {getFieldDecorator('logId', {
              initialValue: info.logId || newInfo.logId,
              rules: [
                {
                  required: true,
                  message: '记录id不能缺失!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="统计天">
            {getFieldDecorator('logDay', {
              initialValue: info.logDay || newInfo.logDay,
              rules: [
                {
                  required: true,
                  message: '统计天不能缺失!',
                },
                { max: 64, message: '统计天必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="统计月">
            {getFieldDecorator('logMonth', {
              initialValue: info.logMonth || newInfo.logMonth,
              rules: [
                {
                  required: true,
                  message: '统计月不能缺失!',
                },
                { max: 64, message: '统计月必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="统计日">
            {getFieldDecorator('logYear', {
              initialValue: info.logYear || newInfo.logYear,
              rules: [
                {
                  required: true,
                  message: '统计日不能缺失!',
                },
                { max: 64, message: '统计日必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="统计星期">
            {getFieldDecorator('logWeek', {
              initialValue: info.logWeek || newInfo.logWeek,
              rules: [
                {
                  required: true,
                  message: '统计星期不能缺失!',
                },
                { max: 64, message: '统计星期必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="设备id">
            {getFieldDecorator('deviceId', {
              initialValue: info.deviceId || newInfo.deviceId,
              rules: [
                {
                  required: true,
                  message: '设备id不能缺失!',
                },
                { max: 64, message: '设备id必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="设备uuid">
            {getFieldDecorator('deviceUuid', {
              initialValue: info.deviceUuid || newInfo.deviceUuid,
              rules: [
                {
                  required: true,
                  message: '设备uuid不能缺失!',
                },
                { max: 64, message: '设备uuid必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="设备类型">
            {getFieldDecorator('deviceType', {
              initialValue: info.deviceType || newInfo.deviceType,
              rules: [
                {
                  required: true,
                  message: '设备类型不能缺失!',
                },
                { max: 64, message: '设备类型必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="代理商id">
            {getFieldDecorator('dlsId', {
              initialValue: info.dlsId || newInfo.dlsId,
              rules: [
                {
                  required: true,
                  message: '代理商id不能缺失!',
                },
                { max: 64, message: '代理商id必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="业务人员id">
            {getFieldDecorator('ywUserId', {
              initialValue: info.ywUserId || newInfo.ywUserId,
              rules: [
                {
                  required: true,
                  message: '业务人员id不能缺失!',
                },
                { max: 64, message: '业务人员id必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="客户id">
            {getFieldDecorator('clientId', {
              initialValue: info.clientId || newInfo.clientId,
              rules: [
                {
                  required: true,
                  message: '客户id不能缺失!',
                },
                { max: 64, message: '客户id必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="使用次数">
            {getFieldDecorator('useTimes', {
              initialValue: info.useTimes || newInfo.useTimes,
              rules: [
                {
                  required: true,
                  message: '使用次数不能缺失!',
                },
                { required: true, message: '使用次数不能缺失!' },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="使用时长(s)">
            {getFieldDecorator('useTime', {
              initialValue: info.useTime || newInfo.useTime,
              rules: [
                {
                  required: true,
                  message: '使用时长(s)不能缺失!',
                },
                { max: 64, message: '使用时长(s)必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="故障次数">
            {getFieldDecorator('errorTimes', {
              initialValue: info.errorTimes || newInfo.errorTimes,
              rules: [
                {
                  required: true,
                  message: '故障次数不能缺失!',
                },
                { required: true, message: '故障次数不能缺失!' },
              ],
            })(<InputNumber min={0} />)}
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
