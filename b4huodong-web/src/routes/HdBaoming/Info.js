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
const url = 'HdBaoming';

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
    dichandlestatus: []
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

    //请求处理状态
  
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'handlestatus' },
      callback: data => {
        // console.log(data)
        this.setState({
          dichandlestatus: data
        })

      },
    })

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
        if (this.props.base.info.baomingId) {
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

    const dichandlestatus = this.state.dichandlestatus.data


    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="报名编码">
            {getFieldDecorator('baomingId', {
              initialValue: info.baomingId || newInfo.baomingId,
              rules: [
                {
                  required: true,
                  message: '报名编码不能缺失!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="门店简称">
            {getFieldDecorator('shopName', {
              initialValue: info.shopName || newInfo.shopName,
              rules: [
                {
                  required: true,
                  message: '门店简称不能缺失!',
                }, { max: 64, message: '门店简称必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="门店全称">
            {getFieldDecorator('shopFullname', {
              initialValue: info.shopFullname || newInfo.shopFullname,
              rules: [
                {
                  required: false,
                  message: '门店全称不能缺失!',
                }, { max: 64, message: '门店全称必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="门店地址">
            {getFieldDecorator('shopAddress', {
              initialValue: info.shopAddress || newInfo.shopAddress,
              rules: [
                {
                  required: false,
                  message: '门店地址不能缺失!',
                }, { max: 512, message: '门店地址必须小于512位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="联系人">
            {getFieldDecorator('shopContact', {
              initialValue: info.shopContact || newInfo.shopContact,
              rules: [
                {
                  required: false,
                  message: '联系人不能缺失!',
                }, { max: 64, message: '联系人必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="门店电话">
            {getFieldDecorator('shopTel', {
              initialValue: info.shopTel || newInfo.shopTel,
              rules: [
                {
                  required: false,
                  message: '门店电话不能缺失!',
                }, { max: 64, message: '门店电话必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="处理状态">
            {getFieldDecorator('handleStatus', {
              initialValue: info.handleStatus || newInfo.handleStatus,
            })(
              <Select showSearch allowClear placeholder="处理状态">
                {dichandlestatus &&
                  dichandlestatus.map(item => {
                    return <Option value={item.dicCode}>{item.dicValue}</Option>;
                  })}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} hasFeedback label="处理备注">
            {getFieldDecorator('handleDemo', {
              initialValue: info.handleDemo || newInfo.handleDemo,
              rules: [
                {
                  required: false,
                  message: '处理备注不能缺失!',
                }, { max: 512, message: '处理备注必须小于512位!', },
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
