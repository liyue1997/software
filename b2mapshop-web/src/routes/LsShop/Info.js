/*
 * @Author: zouwendi
 * @Date: 2018-05-14 18:55:55
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, {Component} from 'react';
import {connect} from 'dva';
import {Form, Input, InputNumber, Button, Spin, Select, DatePicker, Upload, message, Modal, Icon, Alert} from 'antd';
import moment from 'moment';
import {routerRedux} from 'dva/router';
import {uploadImg} from '../../utils/uploadImg';
import {saveImgOne} from "../../services/api";
import {webConfig} from '../../utils/Constant';
import Operate from '../../components/Oprs';

import '../../utils/utils.less';
import {isEmpty} from '../../utils/utils';
import DelImg from '../../components/DelImg';

const FormItem = Form.Item;
const {Option} = Select;
const UUID = require('uuidjs');
const {TextArea} = Input;
const DateFormat = 'YYYY-MM-DD';
const url = 'LsShop';

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

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@connect(({base, loading}) => ({
  base,
  submitting: loading.effects['base/fetch'] || loading.effects['base/fetchAdd'],
  loading: loading.effects['base/info'] || loading.effects['base/new'] || false,
}))
@Form.create()
export default class DicManagerInfo extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

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

  //处理预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  //上传
  uploadChange = async (file) => {
    this.props.dispatch({
      type: 'base/save',
      payload: {
        isSelectImg: file.fileList.length > 0
      }
    })
    if (file.fileList.length > 0) {
      message.info("开始上传主图");
      let imgKey = url + "/" + UUID.generate() + '.jpg';
      if (await uploadImg(file.file, imgKey)) {
        this.props.form.setFields({
          mainpic: {value: webConfig.tpUriPre + imgKey}
        });
        console.log('上传成功');
        message.success("主图上传成功");
        var picture = saveImgOne({
          "objectId": this.props.location.state.id,
          "pictureType": "user_sfz",
          "imgUrl": webConfig.tpUriPre + imgKey,
          "imgSurl": ""
        });
        console.log(picture);
      } else {
        console.log('上传失败');
        message.error("主图上传失败");
      }
    }
  }


  render() {
    const {submitting, form, loading, base} = this.props;
    const {getFieldDecorator} = form;
    const {previewVisible, previewImage, fileList} = this.state;
    const {info, newInfo} = base;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="商户编号">
            {getFieldDecorator('shopId', {
              initialValue: info.shopId || newInfo.shopId,
              rules: [
                {
                  required: true,
                  message: '商户编号不能缺失!',
                },
              ],
            })(<Input disabled/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="商户简称">
            {getFieldDecorator('shopName', {
              initialValue: info.shopName || newInfo.shopName,
              rules: [
                {
                  required: true,
                  message: '商户简称不能缺失!',
                }, {max: 50, message: '商户简称必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="商户全称">
            {getFieldDecorator('shopFullname', {
              initialValue: info.shopFullname || newInfo.shopFullname,
              rules: [
                {
                  required: true,
                  message: '商户全称不能缺失!',
                }, {max: 50, message: '商户全称必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="电话">
            {getFieldDecorator('shopTel', {
              initialValue: info.shopTel || newInfo.shopTel,
              rules: [
                {
                  required: true,
                  message: '电话不能缺失!',
                }, {max: 50, message: '电话必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="手机号">
            {getFieldDecorator('shopPhone', {
              initialValue: info.shopPhone || newInfo.shopPhone,
              rules: [
                {
                  required: true,
                  message: '手机号不能缺失!',
                }, {max: 50, message: '手机号必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="合同编号">
            {getFieldDecorator('shopHetong', {
              initialValue: info.shopHetong || newInfo.shopHetong,
              rules: [
                {
                  required: true,
                  message: '合同编号不能缺失!',
                }, {max: 50, message: '合同编号必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="维度">
            {getFieldDecorator('shopLat', {
              initialValue: info.shopLat || newInfo.shopLat,
              rules: [
                {
                  required: true,
                  message: '维度不能缺失!',
                }, {max: 50, message: '维度必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="介绍连接">
            {getFieldDecorator('shopLink', {
              initialValue: info.shopLink || newInfo.shopLink,
              rules: [
                {
                  required: true,
                  message: '介绍连接不能缺失!',
                }, {max: 50, message: '介绍连接必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="城市名称">
            {getFieldDecorator('cityName', {
              initialValue: info.cityName || newInfo.cityName,
              rules: [
                {
                  required: true,
                  message: '城市名称不能缺失!',
                }, {max: 255, message: '城市名称必须小于255位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="区域名称">
            {getFieldDecorator('areaName', {
              initialValue: info.areaName || newInfo.areaName,
              rules: [
                {
                  required: true,
                  message: '区域名称不能缺失!',
                }, {max: 255, message: '区域名称必须小于255位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="地址">
            {getFieldDecorator('shopAddress', {
              initialValue: info.shopAddress || newInfo.shopAddress,
              rules: [
                {
                  required: true,
                  message: '地址不能缺失!',
                }, {max: 512, message: '地址必须小于512位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="交通指引">
            {getFieldDecorator('shopRoute', {
              initialValue: info.shopRoute || newInfo.shopRoute,
              rules: [
                {
                  required: true,
                  message: '交通指引不能缺失!',
                }, {max: 512, message: '交通指引必须小于512位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="备注">
            {getFieldDecorator('shopDes', {
              initialValue: info.shopDes || newInfo.shopDes,
              rules: [
                {
                  required: true,
                  message: '备注不能缺失!',
                }, {max: 512, message: '备注必须小于512位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="经度">
            {getFieldDecorator('shopLon', {
              initialValue: info.shopLon || newInfo.shopLon,
              rules: [
                {
                  required: true,
                  message: '经度不能缺失!',
                }, {max: 50, message: '经度必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="审核状态">
            {getFieldDecorator('shopStatus', {
              initialValue: info.shopStatus || newInfo.shopStatus,
              rules: [
                {
                  required: true,
                  message: '审核状态不能缺失!',
                },
              ],
            })(<select>
              <option value="-1" selected>请选择</option>
              <option value="0">通过</option>
              <option value="1">未通过</option>
            </select>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="评分">
            {getFieldDecorator('shopScore', {
              initialValue: info.shopScore || newInfo.shopScore,
              rules: [
                {
                  required: true,
                  message: '评分不能缺失!',
                }, {max: 50, message: '评分必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="评分说明">
            {getFieldDecorator('shopScoredes', {
              initialValue: info.shopScoredes || newInfo.shopScoredes,
              rules: [
                {
                  required: true,
                  message: '评分说明不能缺失!',
                }, {max: 500, message: '评分说明必须小于500位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="人均消费">
            {getFieldDecorator('shopAverage', {
              initialValue: info.shopAverage || newInfo.shopAverage,
              rules: [
                {
                  required: true,
                  message: '人均消费不能缺失!',
                }, {max: 50, message: '人均消费必须小于50位!',},
              ],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="商户标签">
            {getFieldDecorator('shopTags', {
              initialValue: info.shopTags || newInfo.shopTags,
              rules: [
                {
                  required: true,
                  message: '商户标签不能缺失!',
                }, {max: 50, message: '商户标签必须小于50位!',},
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
