/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:55:55 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Button, Spin, Select, DatePicker, Checkbox, Upload, Alert, message, Modal, Icon } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';

import Operate from '../../components/Oprs';

import '../../utils/utils.less';
import { isEmpty } from '../../utils/utils';
import { uploadImg, uploadUgc } from '../../utils/uploadImg';
import DelImg from '../../components/DelImg';
import { webConfig } from '../../utils/Constant';
import { saveImgOne, saveImgList, getImgOne, getImgList } from "../../services/api";

const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;
const DateFormat = 'YYYY-MM-DD HH:mm:ss';
const url = 'HdHuodong';
const UUID = require('uuidjs');

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
    dichuodongStatus: [],
    fileList: [],

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
      //获取活动海报
      //getImgList huodong_hb
      //请求活动状态
      dispatch({
        type: 'base/getImgList',
        payload: {
          "objectId": this.props.location.state.id,
          "pictureType": "huodong_hb",
        },
        callback: data => {
          // console.log('getImgList', data);
          var fileListtmp = [];
          if (data.data)
            data.data.map(item => {
              fileListtmp.push({ uid: item.pictureId, name: '', status: 'done', url: item.pictureUrl });
            });
          this.setState({
            fileList: fileListtmp
            // fileList: [{
            //   uid: -1,
            //   name: '微信二维码',
            //   status: 'done',
            //   url: 'https://b1common-1259797882.cos.ap-shanghai.myqcloud.com/TsUser/209f9ea5-f1bd-4060-8c22-442b2a9a73ff.jpg',
            // }],
          });
        },
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
        const newValue = { ...values };
        newValue.isNeedpay = newValue.isNeedpay ? 1 : 0;
        if (!isEmpty(values.startTime))
          temp = {
            ...temp,
            startTime: values.startTime.format(DateFormat),
          };
        if (!isEmpty(values.endTime))
          temp = {
            ...temp,
            endTime: values.endTime.format(DateFormat),
          };
        const { dispatch } = this.props;
        if (this.props.base.info.huodongId) {
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

  //上传
  uploadChange = async (file) => {
    const {base } = this.props;
    const { info, newInfo } = base;
    this.props.dispatch({
      type: 'base/save',
      payload: {
        isSelectImg: file.fileList.length > 0
      }
    });
    console.log("filelist",file.fileList.length);
    if (file.fileList.length > 0) {
      message.info("开始上传主图");
      let imgKey = url + "/" + UUID.generate() + '.jpg';
      if (await uploadImg(file.file, imgKey)) {
        this.props.form.setFields({
          mainpic: { value: webConfig.tpUriPre + imgKey }
        });
        console.log('上传成功');
        message.success("主图上传成功");
        var picture = saveImgList({
          "objectId": info.huodongId || newInfo.huodongId,
          "pictureType": "huodong_hb",
          "imgUrl": webConfig.tpUriPre + imgKey,
          "imgSurl": ""
        });
        this.setState({ fileList: file.fileList })
        // console.log(picture);

      } else {
        console.log('上传失败');
        message.error("主图上传失败");
      }
    }
  }
  onRemove = async (file) => {
    const { fileList } = this.state;
    const { dispatch } = this.props;
    //console.log('fileList', fileList)

    fileList.map((item, index) => {
      if (item.uid === file.uid) {
        fileList.splice(index, 1);
      }
    })
    this.setState({ fileList })
    dispatch({
      type: 'base/delete',
      payload: { id: file.uid },
      callback: data => {
      },
      url: "TPicture"
    });
    return true

  }
  handleChange = ({ fileList }) => this.setState({
    fileList: {
      pictureId: "",
      name: imgKey,
      status: 'done',
      url: webConfig.tpUriPre + imgKey
    }
  });
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
    const datadichuodongStatus = this.state.dichuodongStatus
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
          <FormItem {...formItemLayout} hasFeedback label="活动编号">
            {getFieldDecorator('huodongId', {
              initialValue: info.huodongId || newInfo.huodongId,
              rules: [
                {
                  required: false,
                  message: '活动编号不能缺失!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="活动名称">
            {getFieldDecorator('huodongName', {
              initialValue: info.huodongName || newInfo.huodongName,
              rules: [
                {
                  required: true,
                  message: '活动名称不能缺失!',
                }, { max: 32, message: '活动名称必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="活动前缀">
            {getFieldDecorator('huodongPre', {
              initialValue: info.huodongPre || newInfo.huodongPre,
              rules: [
                {
                  required: false,
                  message: '活动前缀不能缺失!',
                }, {
                  validator: this.handleValidator
                }
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="活动模板">
            {getFieldDecorator('huodongModule', {
              initialValue: info.huodongModule || newInfo.huodongModule,
              rules: [
                {
                  required: true,
                  message: '活动模板不能缺失!',
                }, { max: 126, message: '活动模板必须小于126位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="主标题">
            {getFieldDecorator('huodongTitle', {
              initialValue: info.huodongTitle || newInfo.huodongTitle,
              rules: [
                {
                  required: false,
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
                  required: false,
                  message: '副标题不能缺失!',
                }, { max: 32, message: '副标题必须小于32位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="开始时间">
            {getFieldDecorator('startTime', {
              initialValue: moment(info.startTime) || moment(newInfo.startTime),
              rules: [
                {
                  required: true,
                  message: '开始时间不能缺失!',
                },
              ],
            })(<DatePicker format={DateFormat} placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="结束时间">
            {getFieldDecorator('endTime', {
              initialValue: moment(info.endTime) || moment(newInfo.endTime),
              rules: [
                {
                  required: true,
                  message: '结束时间不能缺失!',
                },
              ],
            })(<DatePicker format={DateFormat} placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="是否需要支付">
            {getFieldDecorator('isNeedpay', {
              valuePropName: 'checked',
              initialValue: info.isNeedpay === 1 || newInfo.isNeedpay === 1,
              rules: [
                {
                  required: false,
                  message: '是否需要支付不能缺失!',
                },
              ],
            })(<Checkbox />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="支付金额">
            {getFieldDecorator('payMoney', {
              initialValue: info.payMoney || newInfo.payMoney,
              rules: [
                {
                  required: false,
                  message: '支付金额不能缺失!',
                }, { required: false, message: '支付金额不能缺失!', },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="支付费用">
            {getFieldDecorator('payFee', {
              initialValue: info.payFee || newInfo.payFee,
              rules: [
                {
                  required: false,
                  message: '支付费用不能缺失!',
                }, { required: false, message: '支付费用不能缺失!', },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="人员上限">
            {getFieldDecorator('userLimit', {
              initialValue: info.userLimit || newInfo.userLimit,
              rules: [
                {
                  required: false,
                  message: '人员上限不能缺失!',
                }, { required: false, message: '人员上限不能缺失!', },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="活动状态">
                  {getFieldDecorator('huodongStatus', {
                    initialValue: info.huodongStatus || newInfo.huodongStatus,
                  })(
                    <Select showSearch allowClear placeholder="活动状态">
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
                  required: false,
                  message: '活动备注不能缺失!',
                }, { max: 512, message: '活动备注必须小于512位!', },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="活动海报">
            {getFieldDecorator('mainpic', {
              initialValue: info.mainpic || newInfo.mainpic,
              rules: [
                {
                  required: false,
                  message: '上传图片不能缺失!',
                }, { max: 400, message: '上传图片必须小于400位!', },
              ],
            })}
            {/* <Alert type="warning" showIcon message="提示：只可选择一张图片，如果要重新选择图片，请先删除之前选择的图片" disabled={this.props.base.isSelectImg}/> */}
            {info.mainpic ? <DelImg goDel={() => {
              info.mainpic = undefined
            }} imgUrl={info.mainpic + '?' + Math.random()} /> : ''}
            <Upload
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.uploadChange}
              onRemove={this.onRemove}
              listType="picture-card"
              multiple={true}
              accept="image/jpg,image/jpeg,image/png"
              beforeUpload={(file, fileList) => {
                return false;
              }}
            >
              {fileList.length >= 6 ? null : uploadButton}
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
