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
const url = 'RsDeviceerrorlog';

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
    dicclient: [],
    dicdevicetype: [],
    dicdls: [],
  };
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
    //设备类型
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'devicetype' },
      callback: data => {
        this.setState({
          dicdevicetype: data.data,
        });
      },
    });
    //请求代理商下拉框
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'dls_name',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/RsDls/queryRsDlsList',
      },
      callback: data => {
        this.setState({
          dicdls: data.data.list,
        });
      },
    });
    //请求客户下拉框
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'client_name',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/RsClient/queryRsClientList',
      },
      callback: data => {
        this.setState({
          dicclient: data.data.list,
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
        if (!isEmpty(values.startDate))
          temp = {
            ...temp,
            startDate: values.startDate.format(DateFormat),
          };
        if (!isEmpty(values.endDate))
          temp = {
            ...temp,
            endDate: values.endDate.format(DateFormat),
          };

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
    const datadicclient = this.state.dicclient;
    const datadicdls = this.state.dicdls;
    const datadicdevicetype = this.state.dicdevicetype;
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
          <FormItem {...formItemLayout} hasFeedback label="异常类型">
            {getFieldDecorator('errorType', {
              initialValue: info.errorType || newInfo.errorType,
              rules: [
                {
                  required: true,
                  message: '异常类型不能缺失!',
                },
                { max: 64, message: '异常类型必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="开始时间">
            {getFieldDecorator('startDate', {
              initialValue: moment(info.startDate) || moment(newInfo.startDate),
              rules: [
                {
                  required: true,
                  message: '开始时间不能缺失!',
                },
              ],
            })(<DatePicker format={DateFormat} placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="结束时间">
            {getFieldDecorator('endDate', {
              initialValue: moment(info.endDate) || moment(newInfo.endDate),
              rules: [
                {
                  required: true,
                  message: '结束时间不能缺失!',
                },
              ],
            })(<DatePicker format={DateFormat} placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="客户">
            {getFieldDecorator('clientId', {
              initialValue: info.clientId || newInfo.clientId,
              rules: [
                {
                  required: false,
                  message: '客户id不能缺失!',
                },
                { max: 64, message: '客户id必须小于64位!' },
              ],
            })(
              <Select showSearch allowClear placeholder="客户">
                {datadicclient &&
                  datadicclient.map(item => {
                    return <Option value={item.client_id}>{item.client_name}</Option>;
                  })}
              </Select>
            )}
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
            })(
              <Select showSearch allowClear placeholder="设备类型">
                {datadicdevicetype &&
                  datadicdevicetype.map(item => {
                    return <Option value={item.dicCode}>{item.dicValue}</Option>;
                  })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="代理商">
            {getFieldDecorator('dlsId', {
              initialValue: info.dlsId || newInfo.dlsId,
              rules: [
                {
                  required: false,
                  message: '代理商id不能缺失!',
                },
                { max: 64, message: '代理商id必须小于64位!' },
              ],
            })(
              <Select showSearch allowClear placeholder="代理商">
                {datadicdls &&
                  datadicdls.map(item => {
                    return <Option value={item.dls_id}>{item.dls_name}</Option>;
                  })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="业务人员">
            {getFieldDecorator('ywUserId', {
              initialValue: info.ywUserId || newInfo.ywUserId,
              rules: [
                {
                  required: true,
                  message: '业务人员不能缺失!',
                },
                { max: 64, message: '业务人员id必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="处理时长(s)">
            {getFieldDecorator('useTime', {
              initialValue: info.useTime || newInfo.useTime,
              rules: [
                {
                  required: true,
                  message: '处理时长(s)不能缺失!',
                },
                { max: 64, message: '处理时长(s)必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="处理说明">
            {getFieldDecorator('handleBak', {
              initialValue: info.handleBak || newInfo.handleBak,
              rules: [
                {
                  required: true,
                  message: '处理说明不能缺失!',
                },
                { max: 512, message: '处理说明必须小于512位!' },
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
