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
const url = 'RsClient';

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
    dicDlsStatus: [],
    dicLevel: [],
    dicdlsName: [],
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
    //请求客户状态下拉框
    const { dicDlsStatus } = this.state;
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'clientstatus' },
      callback: data => {
        this.setState({
          dicDlsStatus: data.data,
        });
      },
    });
    //请求区域下拉框
    const { dicZone } = this.state;
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
          dicZone: data.data.list,
        });
      },
    });
    //客户等级
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'clientlevel' },
      callback: data => {
        this.setState({
          dicLevel: data.data,
        });
      },
    });
    //代理商名称
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'zone_code',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/RsDls/queryRsDlsList',
      },
      callback: data => {
        this.setState({
          dicdlsName: data.data.list,
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
        if (this.props.base.info.clientId) {
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
    const datadicZone = this.state.dicZone;
    const datadicLevel = this.state.dicLevel;
    const dicdlsName = this.state.dicdlsName;
    const dicDlsStatus = this.state.dicDlsStatus;
    const { info, newInfo } = base;

    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="客户编码">
            {getFieldDecorator('clientId', {
              initialValue: info.clientId || newInfo.clientId,
              rules: [
                {
                  required: true,
                  message: '客户编码不能缺失!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="客户简称">
            {getFieldDecorator('clientName', {
              initialValue: info.clientName || newInfo.clientName,
              rules: [
                {
                  required: true,
                  message: '客户简称不能缺失!',
                },
                { max: 64, message: '客户简称必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="客户全称">
            {getFieldDecorator('clientFullname', {
              initialValue: info.clientFullname || newInfo.clientFullname,
              rules: [
                {
                  required: true,
                  message: '客户全称不能缺失!',
                },
                { max: 64, message: '客户全称必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="经度">
            {getFieldDecorator('clientLon', {
              initialValue: info.clientLon || newInfo.clientLon,
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
            {getFieldDecorator('clientLat', {
              initialValue: info.clientLat || newInfo.clientLat,
              rules: [
                {
                  required: false,
                  message: '纬度不能缺失!',
                },
                { max: 64, message: '纬度必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          {/* <FormItem {...formItemLayout} hasFeedback label="区域编码">
            {getFieldDecorator('zoneCode', {
              initialValue: info.zoneCode || newInfo.zoneCode,
              rules: [
                {
                  required: true,
                  message: '区域编码不能缺失!',
                },
                { max: 64, message: '区域编码必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem> */}
          <FormItem {...formItemLayout} hasFeedback label="区域">
            {getFieldDecorator('zoneCode', {
              initialValue: info.zoneCode || newInfo.zoneCode,
              rules: [
                {
                  required: true,
                  message: '区域不能缺失!',
                },
                { max: 64, message: '区域必须小于64位!' },
              ],
            })(
              <Select showSearch allowClear placeholder="区域">
                {datadicZone &&
                  datadicZone.map(item => {
                    //  console.log(item)
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
          <FormItem {...formItemLayout} hasFeedback label="客户地址">
            {getFieldDecorator('clientAddress', {
              initialValue: info.clientAddress || newInfo.clientAddress,
              rules: [
                {
                  required: false,
                  message: '客户地址不能缺失!',
                },
                { max: 512, message: '客户地址必须小于512位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="合同编号">
            {getFieldDecorator('clientHetong', {
              initialValue: info.clientHetong || newInfo.clientHetong,
              rules: [
                {
                  required: false,
                  message: '合同编号不能缺失!',
                },
                { max: 64, message: '合同编号必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="客户电话">
            {getFieldDecorator('clientTel', {
              initialValue: info.clientTel || newInfo.clientTel,
              rules: [
                {
                  required: false,
                  message: '客户电话不能缺失!',
                },
                { max: 64, message: '客户电话必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="客户状态">
            {getFieldDecorator('clientStatus', {
              initialValue: info.clientStatus || newInfo.clientStatus,
              rules: [
                {
                  required: true,
                  message: '客户状态不能缺失!',
                },
                { max: 32, message: '客户状态必须小于32位!' },
              ],
            })(
              <Select>
                {dicDlsStatus &&
                  dicDlsStatus.map(item => {
                    return <Option value={item.dicCode}>{item.dicValue}</Option>;
                  })}
              </Select>
            )}
          </FormItem>
          {/* <FormItem {...formItemLayout} hasFeedback label="代理商状态">
            {getFieldDecorator('clientStatus', {
              initialValue: info.clientStatus || newInfo.clientStatus,
              rules: [
                {
                  required: true,
                  message: '代理商状态不能缺失!',
                },
              ],
            })()}
          </FormItem> */}

          {/* <FormItem {...formItemLayout} hasFeedback label="代理商">
            {getFieldDecorator('dlsId', {
              initialValue: info.dlsId || newInfo.dlsId,
              rules: [
                {
                  required: true,
                  message: '代理商不能缺失!',
                },
                { max: 64, message: '代理商必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem> */}
          <FormItem {...formItemLayout} label="代理商">
            {getFieldDecorator('dlsId', {
              initialValue: info.dlsId || newInfo.dlsId,
            })(
              <Select showSearch allowClear placeholder="代理商">
                {dicdlsName &&
                  dicdlsName.map(item => {
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
          <FormItem {...formItemLayout} hasFeedback label="汇款速度">
            {getFieldDecorator('hkSpeed', {
              initialValue: info.hkSpeed || newInfo.hkSpeed,
              rules: [
                {
                  required: false,
                  message: '汇款速度不能缺失!',
                },
                { max: 64, message: '汇款速度必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          {/* <FormItem {...formItemLayout} hasFeedback label="客户等级">
            {getFieldDecorator('clientLevel', {
              initialValue: info.clientLevel || newInfo.clientLevel,
              rules: [
                {
                  required: true,
                  message: '客户等级不能缺失!',
                },
                { max: 64, message: '客户等级必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem> */}
          <FormItem {...formItemLayout} label="客户等级">
            {getFieldDecorator('clientLevel', {
              initialValue: info.clientLevel || newInfo.clientLevel,
            })(
              <Select showSearch allowClear placeholder="客户等级">
                {datadicLevel &&
                  datadicLevel.map(item => {
                    return <Option value={item.dicCode}>{item.dicValue}</Option>;
                  })}
              </Select>
            )}
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
