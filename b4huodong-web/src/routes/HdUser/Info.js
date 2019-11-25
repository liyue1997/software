/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:55:55 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Button, Spin, Select, DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';

import Operate from '../../components/Oprs';

import '../../utils/utils.less';
import { isEmpty } from '../../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;
const DateFormat = 'YYYY-MM-DD';
const url = 'HdUser';

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
        const newValue = { ...values };
        newValue.isActive = newValue.isActive ? 1 : 0;
        const { dispatch } = this.props;
        if (this.props.base.info.userId) {
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
    const { info, newInfo } = base;
    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="用户id">
            {getFieldDecorator('userId', {
              initialValue: info.userId || newInfo.userId,
              rules: [
                {
                  required: false,
                  message: '用户id不能缺失!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="用户姓名">
            {getFieldDecorator('userName', {
              initialValue: info.userName || newInfo.userName,
              rules: [
                {
                  required: false,
                  message: '用户姓名不能缺失!',
                }, { max: 32, message: '用户姓名必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
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
          <FormItem {...formItemLayout} hasFeedback label="用户等级">
            {getFieldDecorator('userLevel', {
              initialValue: info.userLevel || newInfo.userLevel,
              rules: [
                {
                  required: false,
                  message: '用户等级不能缺失!',
                }, { max: 32, message: '用户等级必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="区域编码">
            {getFieldDecorator('zoneCode', {
              initialValue: info.zoneCode || newInfo.zoneCode,
              rules: [
                {
                  required: false,
                  message: '区域编码不能缺失!',
                }, { max: 64, message: '区域编码必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="用户电话">
            {getFieldDecorator('userTel', {
              initialValue: info.userTel || newInfo.userTel,
              rules: [
                {
                  required: false,
                  message: '用户电话不能缺失!',
                }, { max: 32, message: '用户电话必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="用户微信id">
            {getFieldDecorator('userWeixinid', {
              initialValue: info.userWeixinid || newInfo.userWeixinid,
              rules: [
                {
                  required: false,
                  message: '用户微信id不能缺失!',
                }, { max: 32, message: '用户微信id必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="用户昵称">
            {getFieldDecorator('userNick', {
              initialValue: info.userNick || newInfo.userNick,
              rules: [
                {
                  required: false,
                  message: '用户昵称不能缺失!',
                }, { max: 32, message: '用户昵称必须小于32位!', },
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
          {/* <FormItem {...formItemLayout} hasFeedback label="是否锁定">
            {getFieldDecorator('isActive', {
              initialValue: info.isActive || newInfo.isActive,
              rules: [
                {
                  required: false,
                  message: '是否锁定不能缺失!',
                }, { required: false, message: '是否锁定不能缺失!', },
              ],
            })(<InputNumber min={0} disabled />)}
          </FormItem> */}
          <FormItem {...formItemLayout} label="是否锁定">
            {getFieldDecorator('isActive', {
              valuePropName: 'checked',
              initialValue: info.isActive === 1 || newInfo.isActive === 1,
              rules: [
                {
                  required: false,
                  message: '是否锁定不能缺失!',
                },
              ],
            })(<Checkbox />)}
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
