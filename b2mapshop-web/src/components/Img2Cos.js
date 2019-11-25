import React from 'react';
import {Button, Upload, Spin, Icon, message, Popconfirm, Alert} from 'antd';
import UUID from "uuidjs";
import {uploadImg} from '../utils/uploadImg';
import {newoObj, addobj, deleteobj} from "../services/api";
import { webConfig } from "../utils/Constant";

export default class Img2Cos extends React.PureComponent {
  state = {
    imgArr: [],
    spinText: '',
    isUpImg: false,
    upOkImgArr: [], // 上传成功的图片信息
  }

  // 选择图片的回调
  selectImg = ({ fileList }) => {
    const { allowUpNum } = this.props;
    this.setState({
      imgArr: fileList,
    });
    if (fileList.length > allowUpNum) {
      message.warning(`允许上传图片的最大数量是${allowUpNum}，目前已经选择了${fileList.length}，请删除一些`);
    }
  }

  // 上传图片
  startUpload = async () => {
    // 先检查选择的图片是否超过了允许上传的图片数量
    const { allowUpNum } = this.props;
    if(this.state.imgArr.length > allowUpNum) {
      message.warning(`允许上传图片的最大数量是${allowUpNum}，目前已经选择了${this.state.imgArr.length}，请删除一些`);
      return;
    }
    this.setState({isUpImg: true});
    const { picture_type, object_id, s_width, s_height } = this.props;
    const { imgArr } = this.state;
    for(let i=0; i<imgArr.length; i+=1) {
      this.setState({spinText: `正在上传图片(${i}/${imgArr.length})`});
      const img = imgArr[i];
      const imgKey = `${UUID.generate()}${img.name}`;

      // 先上传图片到腾讯云
      const res = await uploadImg(img.originFileObj, imgKey);
      if(res) {
        console.log('上传到腾讯云成功');

        let response = await newoObj('TPicture');
        if (response && response.code.startsWith('2')) {
          const { pictureId}  = response.data;
          const param = {
            'pictureId': pictureId,
            'pictureType': picture_type,
            'objectId': object_id,
            'fileType': img.name.split('.')[1],
            pictureUrl: `${webConfig.tpUriPre}${imgKey}`,
            pictureSurl: `${webConfig.tpUriPre}${imgKey}?imageView2/1/w/${s_width}/h/${s_height}`,
          };
          response = await addobj(param, 'TPicture');
          if (response && response.code.startsWith('2')) {
            // 上传图片信息到服务器的t_picture表成功，将图片信息存储到本地
            const { upOkImgArr } = this.state;
            upOkImgArr.push(param);
            this.setState({
              'upOkImgArr': upOkImgArr,
            });
          }
        }
      } else {
        console.log('上传到腾讯云失败');
      }
    }
    this.setState({imgArr: [], isUpImg: false});
  }

  // 删除上传成功的图片
  delImg = async (pictureId, index) => {
    this.setState({
        isUpImg: true,
        spinText: '正在删除...',
      }
    );
    const response = await deleteobj({
      'id': pictureId,
    }, 'TPicture');
    this.setState({
      isUpImg: false,
    });
    if (response && response.code.startsWith('2')) {
      const upOkImgArr = Array.from(this.state.upOkImgArr);
      upOkImgArr.splice(index, 1);
      console.log(upOkImgArr.length);
      message.success('删除成功');
      this.setState({
        'upOkImgArr': upOkImgArr,
      });
    }else{
      message.error('删除失败');
    }
}

  render() {
    return (
      <Spin tip={this.state.spinText} spinning={this.state.isUpImg}>
        <Alert type='info' message={`允许上传的最大图片数量为${this.props.allowUpNum}!`} />
        <div>
          <Upload
            multiple
            fileList={this.state.imgArr}
            onChange={this.selectImg}
            listType="picture-card"
            beforeUpload={() => {
              return false;
            }}
          >
            选择图片
          </Upload>
        </div>
        {/* 展示上传成功的图片，可进行预览和删除操作 */}
        <div>
          {
            this.state.upOkImgArr.map((v, k) => {
              return (
                <span key={v.pictureId} style={{ position: 'relative', float: 'left' }}>
                  <Popconfirm title='确定删除吗？' onConfirm={this.delImg.bind(this, v.pictureId, k)}>
                    <Icon
                      size="small"
                      type="delete"
                      style={{ zIndex: 100, position: 'absolute', right: '15px', top: '5px' }}
                    />
                  </Popconfirm>
                  <Icon
                    onClick={() => window.open(v.pictureUrl, '_blank')}
                    size="small"
                    type="eye"
                    style={{ zIndex: 100, position: 'absolute', right: '45px', top: '5px' }}
                  />
                  <img
                    height="102px"
                    width="auto"
                    style={{ zIndex: 99, paddingRight: '8px' }}
                    src={v.pictureSurl}
                    alt="暂无图片"
                  />
                </span>
              )
            })
          }
        </div>
        <div><Button onClick={this.startUpload}>开始上传</Button></div>
      </Spin>
    );
  }
}
