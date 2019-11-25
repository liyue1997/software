/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:55:55 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:10:47
 * @Description: 字典详情
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Button, Spin, Select, DatePicker, Upload, Icon, Alert, Modal, message } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';

import Operate from '../../components/Oprs';
import {uploadImg, uploadUgc} from '../../utils/uploadImg';
import {webConfig} from '../../utils/Constant';
import '../../utils/utils.less';
import { isEmpty } from '../../utils/utils';
import {saveImgOne, saveImgList, getImgOne} from "../../services/api";

const FormItem = Form.Item;
const { Option } = Select;
const UUID = require('uuidjs');
const { TextArea } = Input;
const DateFormat = 'YYYY-MM-DD';
const url = 'RsDls';

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
//上传图片
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 格式!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于2MB!');
  }
  return isJpgOrPng && isLt2M;
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
    dicDesc: [],
    dicZone: [],
    loading: false,
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
    } else {
      dispatch({
        type: 'base/new',
        url,
      });
    }
    //请求用户类型下拉框
    // const {dispatch} = this.props
    const { dicDesc } = this.state;
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'dlsstatus' },
      callback: data => {
        // console.log(data)
        this.setState({
          dicDesc: data,
        });
      },
    });
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
      console.log(values)
      if (!err) {
        let temp = {};

        const { dispatch } = this.props;
        if (this.props.base.info.dlsId) {
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
  // handleChange = info => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl =>
  //       this.setState({
  //         imageUrl,
  //         loading: false,
  //       }),
  //     );
  //   }
  // };

  handleCancel = () => this.setState({previewVisible: false});

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
          "pictureType": "user_head",
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
  handleChange = ({fileList}) => this.setState({
    fileList: {
      pictureId: "",
      name: imgKey,
      status: 'done',
      url: webConfig.tpUriPre + imgKey
    }
  });
  render() {
    const { submitting, form, loading, base } = this.props;
    const { getFieldDecorator } = form;
    const { dicDesc } = this.state;
    const datadicZone = this.state.dicZone;
    const {previewVisible, previewImage, fileList} = this.state;
    const newdicDesc = this.state.dicDesc.data;
    const { info, newInfo } = base;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Spin size="large" spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} hasFeedback label="代理商编码">
            {getFieldDecorator('dlsId', {
              initialValue: info.dlsId || newInfo.dlsId,
              rules: [
                {
                  required: true,
                  message: '代理商编码不能缺失!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="代理商简称">
            {getFieldDecorator('dlsName', {
              initialValue: info.dlsName || newInfo.dlsName,
              rules: [
                {
                  required: true,
                  message: '代理商简称不能缺失!',
                },
                { max: 64, message: '代理商简称必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="代理商全称">
            {getFieldDecorator('dlsFullname', {
              initialValue: info.dlsFullname || newInfo.dlsFullname,
              rules: [
                {
                  required: true,
                  message: '代理商全称不能缺失!',
                },
                { max: 64, message: '代理商全称必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="经度">
            {getFieldDecorator('dlsLon', {
              initialValue: info.dlsLon || newInfo.dlsLon,
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
            {getFieldDecorator('dlsLat', {
              initialValue: info.dlsLat || newInfo.dlsLat,
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
            {getFieldDecorator('zoneCode', { initialValue: info.zoneCode || newInfo.zoneCode })(
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

          <FormItem {...formItemLayout} hasFeedback label="代理商地址">
            {getFieldDecorator('dlsAddress', {
              initialValue: info.dlsAddress || newInfo.dlsAddress,
              rules: [
                {
                  required: true,
                  message: '代理商地址不能缺失!',
                },
                { max: 512, message: '代理商地址必须小于512位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="合同编号">
            {getFieldDecorator('dlsHetong', {
              initialValue: info.dlsHetong || newInfo.dlsHetong,
              rules: [
                {
                  required: false,
                  message: '合同编号不能缺失!',
                },
                { max: 64, message: '合同编号必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="代理商电话">
            {getFieldDecorator('dlsTel', {
              initialValue: info.dlsTel || newInfo.dlsTel,
              rules: [
                {
                  required: false,
                  message: '代理商电话不能缺失!',
                },
                { max: 64, message: '代理商电话必须小于64位!' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label="代理商状态">
            {getFieldDecorator('dlsStatus', {
              initialValue: info.dlsStatus || newInfo.dlsStatus,
              rules: [
                {
                  required: true,
                  message: '代理商状态不能缺失!',
                },
                { max: 32, message: '代理商状态必须小于32位!' },
              ],
            })(
              <Select>
                {newdicDesc &&
                  newdicDesc.map(item => {
                    return <Option value={item.dicCode}>{item.dicValue}</Option>;
                  })}
              </Select>
            )}
          </FormItem>

          {/* <FormItem style={{marginLeft:"150px"}}>
            {getFieldDecorator('mainpic', {
              initialValue: info.mainpic || newInfo.mainpic,
              rules: [
                {
                  required: true,
                  message: '上传图片不能缺失!',
                }, {max: 400, message: '上传图片必须小于400位!',},
              ],
            })(
              <img src={info.pictureUrl}/>
            )}
            <span>上传头像:</span>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
              onRemove={(file) => {
                this.props.form.setFields({mainpic: undefined});
                return true;
              }}
              
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </FormItem> */}
          <FormItem {...formItemLayout} hasFeedback label="用户头像">
            {getFieldDecorator('mainpic', {
              initialValue: info.mainpic || newInfo.mainpic,
              rules: [
                {
                  required: true,
                  message: '上传图片不能缺失!',
                }, {max: 400, message: '上传图片必须小于400位!',},
              ],
            })(
              <img src={info.pictureUrl}/>
            )}
            <Alert type="warning" showIcon message="提示：只可选择一张图片，如果要重新选择图片，请先删除之前选择的图片"/>
            {info.mainpic ? <DelImg goDel={() => {
              info.mainpic = undefined
            }} imgUrl={info.mainpic + '?' + Math.random()}/> : ''}
            <Upload
              fileList={fileList}
              disabled={this.props.base.isSelectImg}
              onPreview={this.handlePreview}
              onChange={this.uploadChange}
              onRemove={(file) => {
                this.props.form.setFields({mainpic: undefined});
                return true;
              }}
              listType="picture-card"
              multiple={false}
              accept="image/jpg,image/jpeg,image/png"
              beforeUpload={(file, fileList) => {
                return false;
              }}>
              {fileList.length >= 2 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{width: '100%'}} src={previewImage}/>
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
