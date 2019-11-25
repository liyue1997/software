/*
 * @Author: zouwendi
 * @Date: 2018-05-14 18:55:55
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Spin,
  Select,
  DatePicker,
  Alert,
  Upload,
  message,
  Modal,
  Icon,
} from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';

import Operate from '../../components/Oprs';

import { delArrEle } from '../../utils/utils';
import '../../utils/utils.less';
import { isEmpty } from '../../utils/utils';
import { getUID } from 'echarts/src/util/component';
import { uploadImg, uploadUgc } from '../../utils/uploadImg';
import DelImg from '../../components/DelImg';
import { webConfig } from '../../utils/Constant';
import { saveImgOne, saveImgList, getImgOne } from '../../services/api';

const FormItem = Form.Item;
const { Option } = Select;

const UUID = require('uuidjs');
const { TextArea } = Input;
const DateFormat = 'YYYY-MM-DD';
const url = 'TsUser';

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

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

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
    fileList: [],
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
      //gettouxiang
      //getsfz
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
        if (!isEmpty(values.lastTime))
          temp = {
            ...temp,
            lastTime: values.lastTime.format(DateFormat),
          };

        const { dispatch } = this.props;
        if (this.props.base.info.userId) {
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
  handleCancel = () => this.setState({ previewVisible: false });

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
  uploadChange = async file => {
    this.props.dispatch({
      type: 'base/save',
      payload: {
        isSelectImg: file.fileList.length > 0,
      },
    });
    if (file.fileList.length > 0) {
      message.info('开始上传主图');
      let imgKey = url + '/' + UUID.generate() + '.jpg';
      if (await uploadImg(file.file, imgKey)) {
        this.props.form.setFields({
          mainpic: { value: webConfig.tpUriPre + imgKey },
        });
        console.log('上传成功');
        message.success('主图上传成功');
        var picture = saveImgOne({
          objectId: this.props.location.state.id,
          pictureType: 'user_sfz',
          imgUrl: webConfig.tpUriPre + imgKey,
          imgSurl: '',
        });
        console.log(picture);
      } else {
        console.log('上传失败');
        message.error('主图上传失败');
      }
    }
  };
  handleChange = ({ fileList }) =>
    this.setState({
      fileList: {
        pictureId: '',
        name: imgKey,
        status: 'done',
        url: webConfig.tpUriPre + imgKey,
      },
    });

  render() {
    const { submitting, form, loading, base } = this.props;
    const { getFieldDecorator } = form;
    const { previewVisible, previewImage, fileList } = this.state;
    const { info, newInfo } = base;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="用户id">
            {getFieldDecorator('userId', {
              initialValue: info.userId || newInfo.userId,
              rules: [
                {
                  required: true,
                  message: '用户id不能缺失!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="用户登录账户">
            {getFieldDecorator('userAccount', {
              initialValue: info.userAccount || newInfo.userAccount,
              rules: [
                {
                  required: true,
                  message: '用户登录账户不能缺失!',
                },
                { max: 64, message: '用户登录账户必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="密码">
            {getFieldDecorator('password', {
              initialValue: info.password || newInfo.password,
              rules: [
                {
                  required: true,
                  message: '密码不能缺失!',
                },
                { max: 64, message: '密码必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="用户名">
            {getFieldDecorator('username', {
              initialValue: info.username || newInfo.username,
              rules: [
                {
                  required: true,
                  message: '用户名不能缺失!',
                },
                { max: 64, message: '用户名必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="用户类型">
            {getFieldDecorator('userType', {
              initialValue: info.userType || newInfo.userType,
              rules: [
                {
                  required: true,
                  message: '用户类型不能缺失!',
                },
                { max: 32, message: '用户类型必须小于32位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="是否允许登录">
            {getFieldDecorator('userStatus', {
              initialValue: info.userStatus || newInfo.userStatus,
              rules: [
                {
                  required: true,
                  message: '是否允许登录不能缺失!',
                },
                { required: true, message: '是否允许登录不能缺失!' },
              ],
            })(<InputNumber min={0} disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="角色">
            {getFieldDecorator('roleId', {
              initialValue: info.roleId || newInfo.roleId,
              rules: [
                {
                  required: true,
                  message: '角色不能缺失!',
                },
                { max: 64, message: '角色必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="最后登录ip">
            {getFieldDecorator('lastIp', {
              initialValue: info.lastIp || newInfo.lastIp,
              rules: [
                {
                  required: true,
                  message: '最后登录ip不能缺失!',
                },
                { max: 255, message: '最后登录ip必须小于255位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="最后登录系统">
            {getFieldDecorator('lastOs', {
              initialValue: info.lastOs || newInfo.lastOs,
              rules: [
                {
                  required: true,
                  message: '最后登录系统不能缺失!',
                },
                { max: 255, message: '最后登录系统必须小于255位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="最后登录时间">
            {getFieldDecorator('lastTime', {
              initialValue: moment(info.lastTime) || moment(newInfo.lastTime),
              rules: [
                {
                  required: true,
                  message: '最后登录时间不能缺失!',
                },
              ],
            })(<DatePicker format={DateFormat} placeholder="请输入" />)}
          </FormItem>

          <FormItem {...formItemLayout} hasFeedback label="用户头像">
            {getFieldDecorator('mainpic', {
              initialValue: info.mainpic || newInfo.mainpic,
              rules: [
                {
                  required: true,
                  message: '上传图片不能缺失!',
                },
                { max: 400, message: '上传图片必须小于400位!' },
              ],
            })(<img src={info.pictureUrl} />)}
            <Alert
              type="warning"
              showIcon
              message="提示：只可选择一张图片，如果要重新选择图片，请先删除之前选择的图片"
            />
            {info.mainpic ? (
              <DelImg
                goDel={() => {
                  info.mainpic = undefined;
                }}
                imgUrl={info.mainpic + '?' + Math.random()}
              />
            ) : (
              ''
            )}
            <Upload
              fileList={fileList}
              disabled={this.props.base.isSelectImg}
              onPreview={this.handlePreview}
              onChange={this.uploadChange}
              onRemove={file => {
                this.props.form.setFields({ mainpic: undefined });
                return true;
              }}
              listType="picture-card"
              multiple={false}
              accept="image/jpg,image/jpeg,image/png"
              beforeUpload={(file, fileList) => {
                return false;
              }}
            >
              {fileList.length >= 2 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
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
