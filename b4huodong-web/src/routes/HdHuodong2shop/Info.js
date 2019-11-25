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
const url = 'HdHuodong2shop';

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
    dichuodongStatus: []
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
    //请求活动状态
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'activitystatus' },
      callback: data => {
        this.setState({
          dichuodongStatus: data.data,
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
    const datadichuodongStatus = this.state.dichuodongStatus
    const { info, newInfo } = base;

    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="活动编号">
            {getFieldDecorator('huodongId', {
              initialValue: info.huodongId || newInfo.huodongId,
              rules: [
                {
                  required: true,
                  message: '活动编号不能缺失!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="门店编码">
            {getFieldDecorator('shopId', {
              initialValue: info.shopId || newInfo.shopId,
              rules: [
                {
                  required: true,
                  message: '门店编码不能缺失!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="主标题">
            {getFieldDecorator('huodongTitle', {
              initialValue: info.huodongTitle || newInfo.huodongTitle,
              rules: [
                {
                  required: true,
                  message: '主标题不能缺失!',
                }, { max: 32, message: '主标题必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="副标题">
            {getFieldDecorator('huodongSubtitle', {
              initialValue: info.huodongSubtitle || newInfo.huodongSubtitle,
              rules: [
                {
                  required: true,
                  message: '副标题不能缺失!',
                }, { max: 32, message: '副标题必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="人员上限">
            {getFieldDecorator('userLimit', {
              initialValue: info.userLimit || newInfo.userLimit,
              rules: [
                {
                  required: true,
                  message: '人员上限不能缺失!',
                }, { required: true, message: '人员上限不能缺失!', },
              ],
            })(<InputNumber min={0}/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="活动状态">
            {getFieldDecorator('activitystatus', {
              initialValue: info.activitystatus || newInfo.activitystatus,
              rules: [
                {
                  required: false,
                  message: '活动状态不能丢失!',
                },
                { max: 64, message: '活动状态必须小于64位!' },
              ],
            })(
              <Select showSearch allowClear placeholder="请输入">
                {datadichuodongStatus &&
                  datadichuodongStatus.map(item => {
                    return <Option value={item.dicCode}>{item.dicValue}</Option>;
                  })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="活动备注">
            {getFieldDecorator('huodongDemo', {
              initialValue: info.huodongDemo || newInfo.huodongDemo,
              rules: [
                {
                  required: true,
                  message: '活动备注不能缺失!',
                }, { max: 512, message: '活动备注必须小于512位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="推广链接">
            {getFieldDecorator('huodongUrl', {
              initialValue: info.huodongUrl || newInfo.huodongUrl,
              rules: [
                {
                  required: true,
                  message: '推广链接不能缺失!',
                }, { max: 512, message: '推广链接必须小于512位!', },
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
