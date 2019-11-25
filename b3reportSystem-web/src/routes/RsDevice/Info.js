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
const url = 'RsDevice';

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
    previewVisible: false,
    previewImage: '',
    dicdevicestatus: [],
    dicdevicetype: [],
    dicclient: [],
    dicdls: [],
    diczone: [],
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
    //设备状态
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'devicestatus' },
      callback: data => {
        this.setState({
          dicdevicestatus: data.data,
        });
      },
    });
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
    //请求区域下拉框
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'zone_code',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/RsZone/queryRsZoneList',
      },
      callback: data => {
        this.setState({
          diczone: data.data.list,
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
        if (!isEmpty(values.sellDate))
          temp = {
            ...temp,
            sellDate: values.sellDate.format(DateFormat),
          };

        const { dispatch } = this.props;
        if (this.props.base.info.deviceId) {
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
    const { dicdevicestatus, dicdevicetype } = this.state; //只有数据字典要写
    const datadiczone = this.state.diczone;
    const datadicclient = this.state.dicclient;
    const datadicdls = this.state.dicdls;
    const datadicdevicetype = this.state.dicdevicetype;
    const datadicdevicestatus = this.state.dicdevicestatus;

    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="设备id">
            {getFieldDecorator('deviceId', {
              initialValue: info.deviceId || newInfo.deviceId,
              rules: [
                {
                  required: true,
                  message: '设备id不能缺失!',
                },
              ],
            })(<Input disabled />)}
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
          <FormItem {...formItemLayout} hasFeedback label="经度">
            {getFieldDecorator('deviceLon', {
              initialValue: info.deviceLon || newInfo.deviceLon,
              rules: [
                {
                  required: false,
                  message: '经度不能缺失!',
                },
                { max: 64, message: '经度必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="纬度">
            {getFieldDecorator('deviceLat', {
              initialValue: info.deviceLat || newInfo.deviceLat,
              rules: [
                {
                  required: false,
                  message: '纬度不能缺失!',
                },
                { max: 64, message: '纬度必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="区域">
            {getFieldDecorator('zoneCode', {
              initialValue: info.zoneCode || newInfo.zoneCode,
              rules: [
                {
                  required: true,
                  message: '区域编码不能缺失!',
                },
                { max: 64, message: '区域编码必须小于64位!' },
              ],
            })(
              <Select showSearch allowClear placeholder="区域">
                {datadiczone &&
                  datadiczone.map(item => {
                    return (
                      <Option value={item.zone_code}>
                        {item.zone_code}
                        {item.zone_name}
                      </Option>
                    );
                  })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="销售日期">
            {getFieldDecorator('sellDate', {
              initialValue: moment(info.sellDate) || moment(newInfo.sellDate),
              rules: [
                {
                  required: false,
                  message: '销售日期不能缺失!',
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
          <FormItem {...formItemLayout} hasFeedback label="设备异常信息">
            {getFieldDecorator('deviceErrorinfo', {
              initialValue: info.deviceErrorinfo || newInfo.deviceErrorinfo,
              rules: [
                {
                  required: false,
                  message: '设备异常信息不能缺失!',
                },
                { max: 64, message: '设备异常信息必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="设备状态">
            {getFieldDecorator('deviceStatus', {
              initialValue: info.deviceStatus || newInfo.deviceStatus,
              rules: [
                {
                  required: true,
                  message: '设备状态不能缺失!',
                },
              ],
            })(
              <Select showSearch allowClear placeholder="设备状态">
                {datadicdevicestatus &&
                  datadicdevicestatus.map(item => {
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
                  required: false,
                  message: '业务人员不能缺失!',
                },
                { max: 64, message: '业务人员必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="软件版本">
            {getFieldDecorator('softVersion', {
              initialValue: info.softVersion || newInfo.softVersion,
              rules: [
                {
                  required: false,
                  message: '软件版本不能缺失!',
                },
                { max: 64, message: '软件版本必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="备注">
            {getFieldDecorator('deviceBak', {
              initialValue: info.deviceBak || newInfo.deviceBak,
              rules: [
                {
                  required: false,
                  message: '备注不能缺失!',
                },
                { max: 512, message: '备注必须小于512位!' },
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
