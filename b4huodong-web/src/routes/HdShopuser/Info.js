/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:55:55 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Button, Spin, Select, DatePicker,Checkbox } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
// import db from '../../utils/db';

import Operate from '../../components/Oprs';

import '../../utils/utils.less';
import { isEmpty } from '../../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;
const DateFormat = 'YYYY-MM-DD';
const url = 'HdShopuser';

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
    hdShop: [],
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
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'shop_name',
        len: 200,
        page: 1,
        queryMap: {},
        url: "/api/HdShop/queryHdShopList"
      },
      callback: data => {
        this.setState({
          
          hdShop: data.data.list
        })
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
    //alert('render');
    const { submitting, form, loading, base } = this.props;
    const { getFieldDecorator } = form;

    const { info, newInfo } = base;
    const { hdShop}= this.state;
    const datahdShop= this.state.hdShop;
    var usertype=localStorage.getItem("userTypeb4huodong-web")==="shop";	 
    //alert(usertype);
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
            })(<Input disabled />)}
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
          <FormItem {...formItemLayout} hasFeedback label="用户工号">
            {getFieldDecorator('userNumber', {
              initialValue: info.userNumber || newInfo.userNumber,
              rules: [
                {
                  required: false,
                  message: '用户工号不能缺失!',
                }, { max: 32, message: '用户工号必须小于32位!', },
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
         {!usertype? <FormItem {...formItemLayout} label="门店" >
                  {getFieldDecorator('shopId', {
                    initialValue: info.shopId || newInfo.shopId,
                  })(
                    <Select showSearch allowClear placeholder="门店">
                      {datahdShop &&
                        datahdShop.map(item => {
                          return <Option value={item.shop_id}>{item.shop_name}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>:null}


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
          <FormItem {...formItemLayout} hasFeedback label="用户QQ号">
            {getFieldDecorator('userQq', {
              initialValue: info.userQq || newInfo.userQq,
              rules: [
                {
                  required: false,
                  message: '用户QQ号不能缺失!',
                }, { max: 32, message: '用户QQ号必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          {!usertype? <FormItem {...formItemLayout} label="是否激活">
            {getFieldDecorator('isActive', {
              valuePropName: 'checked',
              initialValue: info.isActive === 1 || newInfo.isActive === 1,
              rules: [
                {
                  required: false,
                  message: '是否激活不能缺失!',
                },
              ],
            })(<Checkbox />)}
          </FormItem>:null}


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
            {usertype?  <Button
                style={{ marginLeft: 12 }}
                type="primary"
                htmlType="submit"
                loading={submitting}
              >
                保存
              </Button>:null}
          </FormItem>
        </Form>
      </Spin>
    );
  }
}
