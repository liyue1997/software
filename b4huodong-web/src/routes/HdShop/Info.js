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
import db from '../../utils/db';

const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;
const DateFormat = 'YYYY-MM-DD';
const url = 'HdShop';

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
    dicZone: [],
    dichdhkspeed: [],
    dicshoplevel: [],
    dicshopstatus: []
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
    //请求区域下拉框
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'zone_code',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/HdZone/queryHdZoneList',
      },
      callback: data => {
        this.setState({
          diczone: data.data.list,
        });
      },
    });

    //请求汇款速度
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'hdhkspeed' },
      callback: data => {
        this.setState({
          dichdhkspeed: data.data,
        });
      },
    });
    //门店等级
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'shoplevel' },
      callback: data => {
        this.setState({
          dicshoplevel: data.data,
        });
      },
    });
    //门店状态
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'shopstatus' },
      callback: data => {
        this.setState({
          dicshopstatus: data.data,
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
  handleValidator = (rule, val, callback) => {
    if (!val) {
      callback();
    }
    let validateResult = /\b[a-zA-Z]{3}\b/.test(val);  // 三位英文字母
    if (!validateResult) {
      callback('请输入三位英文字母！');
    }
    callback();
  }

  render() {
    const { submitting, form, loading, base } = this.props;
    const { getFieldDecorator } = form;
    const datadiczone = this.state.diczone;
    const datadichdhkspeed = this.state.dichdhkspeed;
    const datadicshoplevel = this.state.dicshoplevel;
    const datadicshopstatus = this.state.dicshopstatus
    var usertoken= db.get('currentUser'); 
    var userstatus = null;
    if (!usertoken.extendInfo)
       return (<div>你已经退出</div>);
    if(usertoken.extendInfo.userType === 'shop'){
      userstatus = false
     } else {
      userstatus = true
     }
    const { info, newInfo } = base;
    var shopurl='http://www.xinxingtech.com.cn/shop/index.html?shopid='+(info.shopId || newInfo.shopId);
    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="门店编码">
            {getFieldDecorator('shopId', {
              initialValue: info.shopId || newInfo.shopId,
              rules: [
                {
                  required: false,
                  message: '门店编码不能缺失!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          {/* todo 链接 需要一个文字 多行显示 可复制,颜色 为蓝色 */}
          <FormItem {...formItemLayout} hasFeedback label="注册链接">
              {/* <Input disabled value={shopurl} /> */}
             <span style={{color:"blue"}}>{shopurl}</span>
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="门店前缀">

            {getFieldDecorator('shopPre', {
              initialValue: info.shopPre || newInfo.shopPre,
              rules: [
                {
                  required: false,
                  message: '门店前缀不能缺失!',
                }, {
                  validator: this.handleValidator
                }
              ],
            })(<Input placeholder="请输入三位字母" />)}
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
                  required: true,
                  message: '门店全称不能缺失!',
                }, { max: 64, message: '门店全称必须小于64位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          {userstatus?
          <FormItem {...formItemLayout} hasFeedback label="经度">
          {getFieldDecorator('shopLon', {
            initialValue: info.shopLon || newInfo.shopLon,
            rules: [
              {
                required: false,
                message: '经度不能缺失!',
              }, { max: 64, message: '经度必须小于64位!', },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>:''}
          {userstatus?
          <FormItem {...formItemLayout} hasFeedback label="纬度">
          {getFieldDecorator('shopLat', {
            initialValue: info.shopLat || newInfo.shopLat,
            rules: [
              {
                required: false,
                message: '纬度不能缺失!',
              }, { max: 64, message: '纬度必须小于64位!', },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>:''}
          {userstatus?<FormItem {...formItemLayout} hasFeedback label="区域">
            {getFieldDecorator('zoneCode', {
              initialValue: info.zoneCode || newInfo.zoneCode,
              rules: [
                {
                  required: false,
                  message: '区域不能缺失!',
                },
                { max: 64, message: '区域必须小于64位!' },
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
          </FormItem>:''}
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
          {userstatus?
          <FormItem {...formItemLayout} hasFeedback label="合同编号">
          {getFieldDecorator('shopHetong', {
            initialValue: info.shopHetong || newInfo.shopHetong,
            rules: [
              {
                required: false,
                message: '合同编号不能缺失!',
              }, { max: 64, message: '合同编号必须小于64位!', },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>:''}
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
          {userstatus?
          <FormItem {...formItemLayout} hasFeedback label="门店状态">
          {getFieldDecorator('shopStatus', {
            initialValue: info.shopStatus || newInfo.shopStatus,
            rules: [
              {
                required: false,
                message: '门店状态不能丢失!',
              },
              { max: 64, message: '门店状态必须小于64位!' },
            ],
          })(
            <Select showSearch allowClear placeholder="请输入">
              {datadicshopstatus &&
                datadicshopstatus.map(item => {
                  return <Option value={item.dicCode}>{item.dicValue}</Option>;
                })}
            </Select>
          )}
        </FormItem>:''}
          {userstatus?
          <FormItem {...formItemLayout} hasFeedback label="代理商">
          {getFieldDecorator('dlsId', {
            initialValue: info.dlsId || newInfo.dlsId,
            rules: [
              {
                required: false,
                message: '代理商不能缺失!',
              }, { max: 64, message: '代理商必须小于64位!', },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>:''}
          {userstatus?
          <FormItem {...formItemLayout} hasFeedback label="业务人员">
          {getFieldDecorator('ywUserId', {
            initialValue: info.ywUserId || newInfo.ywUserId,
            rules: [
              {
                required: false,
                message: '业务人员id不能缺失!',
              }, { max: 64, message: '业务人员id必须小于64位!', },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>:''}
          {userstatus?
          <FormItem {...formItemLayout} hasFeedback label="汇款速度">
          {getFieldDecorator('hkSpeed', {
            initialValue: info.hkSpeed || newInfo.hkSpeed,
            rules: [
              {
                required: false,
                message: '汇款速度不能丢失!',
              },
              { max: 64, message: '汇款速度必须小于64位!' },
            ],
          })(
            <Select showSearch allowClear placeholder="请输入">
              {datadichdhkspeed &&
                datadichdhkspeed.map(item => {
                  return <Option value={item.dicCode}>{item.dicValue}</Option>;
                })}
            </Select>
          )}
        </FormItem>:''}
          {userstatus?
          <FormItem {...formItemLayout} hasFeedback label="门店等级">
          {getFieldDecorator('shopLevel', {
            initialValue: info.shopLevel || newInfo.shopLevel,
            rules: [
              {
                required: false,
                message: '门店等级不能丢失!',
              },
              { max: 64, message: '门店等级必须小于64位!' },
            ],
          })(
            <Select showSearch allowClear placeholder="门店等级">
              {datadicshoplevel &&
                datadicshoplevel.map(item => {
                  return <Option value={item.dicCode}>{item.dicValue}</Option>;
                })}
            </Select>
          )}
        </FormItem>:''}


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
