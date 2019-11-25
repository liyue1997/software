/*
 * @Author: zouwendi
 * @Date: 2018-05-14 18:55:55
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, {Component} from 'react';
import {connect} from 'dva';
import {Form, Input, InputNumber, Button, Spin, Select, DatePicker} from 'antd';
import moment from 'moment';
import {routerRedux} from 'dva/router';

import Operate from '../../components/Oprs';

import '../../utils/utils.less';
import {isEmpty} from '../../utils/utils';

const FormItem = Form.Item;
const {Option} = Select;

const {TextArea} = Input;
const DateFormat = 'YYYY-MM-DD';
const url = 'TDic';

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 7},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
    md: {span: 10},
  },
};
const submitFormLayout = {
  wrapperCol: {
    xs: {span: 10, offset: 0},
    sm: {span: 10, offset: 7},
  },
};

@connect(({base, loading}) => ({
  base,
  submitting: loading.effects['base/fetch'] || loading.effects['base/fetchAdd'],
  loading: loading.effects['base/info'] || loading.effects['base/new'] || false,
}))
@Form.create()
export default class DicManagerInfo extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
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
    const {dispatch} = this.props;
    dispatch({
      type: 'base/clear',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let temp = {};


        const {dispatch} = this.props;
        if (this.props.base.info.dicId) {
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
    const {submitting, form, loading, base} = this.props;
    const {getFieldDecorator} = form;

    const {info, newInfo} = base;

    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="字典主键">
            {getFieldDecorator('dicId', {
              initialValue: info.dicId || newInfo.dicId,
              rules: [
                {
                  required: true,
                  message: '字典主键不能缺失!',
                },
              ],
            })(<Input disabled/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="字典类型">
            {getFieldDecorator('dicType', {
              initialValue: info.dicType || newInfo.dicType,
              rules: [
                {
                  required: true,
                  message: '字典类型不能缺失!',
                }, {max: 255, message: '字典类型必须小于255位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="字典代码">
            {getFieldDecorator('dicCode', {
              initialValue: info.dicCode || newInfo.dicCode,
              rules: [
                {
                  required: true,
                  message: '字典代码不能缺失!',
                }, {max: 255, message: '字典代码必须小于255位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="字典值">
            {getFieldDecorator('dicValue', {
              initialValue: info.dicValue || newInfo.dicValue,
              rules: [
                {
                  required: true,
                  message: '字典值不能缺失!',
                }, {max: 255, message: '字典值必须小于255位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="字典描述">
            {getFieldDecorator('dicDesc', {
              initialValue: info.dicDesc || newInfo.dicDesc,
              rules: [
                {
                  required: true,
                  message: '字典描述不能缺失!',
                }, {max: 255, message: '字典描述必须小于255位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="是否可用">
            {getFieldDecorator('isUsed', {
              initialValue: info.isUsed || newInfo.isUsed,
              rules: [
                {
                  required: true,
                  message: '是否可用不能缺失!',
                }, {required: true, message: '是否可用不能缺失!',},
              ],
            })(<InputNumber min={0} disabled/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="排序">
            {getFieldDecorator('orderNo', {
              initialValue: info.orderNo || newInfo.orderNo,
              rules: [
                {
                  required: true,
                  message: '排序不能缺失!',
                }, {required: true, message: '排序不能缺失!',},
              ],
            })(<InputNumber min={0} disabled/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="父字典编码">
            {getFieldDecorator('parentId', {
              initialValue: info.parentId || newInfo.parentId,
              rules: [
                {
                  required: true,
                  message: '父字典编码不能缺失!',
                }, {max: 255, message: '父字典编码必须小于255位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="拼音缩写">
            {getFieldDecorator('pysx', {
              initialValue: info.pysx || newInfo.pysx,
              rules: [
                {
                  required: true,
                  message: '拼音缩写不能缺失!',
                }, {max: 255, message: '拼音缩写必须小于255位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="预留字段1">
            {getFieldDecorator('dicData1', {
              initialValue: info.dicData1 || newInfo.dicData1,
              rules: [
                {
                  required: true,
                  message: '预留字段1不能缺失!',
                }, {max: 64, message: '预留字段1必须小于64位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="预留字段2">
            {getFieldDecorator('dicData2', {
              initialValue: info.dicData2 || newInfo.dicData2,
              rules: [
                {
                  required: true,
                  message: '预留字段2不能缺失!',
                }, {max: 64, message: '预留字段2必须小于64位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>


          <FormItem {...submitFormLayout} style={{marginTop: 32}}>
            <Button
              onClick={() => {
                this.props.dispatch(routerRedux.goBack());
              }}
            >
              返回
            </Button>
            <Operate operateName="SAVE">
              <Button
                style={{marginLeft: 12}}
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
