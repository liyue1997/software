/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:56:24 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:09:55
 * @Description: 用户管理列表
 */
import React, { Component } from 'react';
import { Form, Row, Col, Input, InputNumber, Button, Modal, Card, Select, DatePicker ,message} from 'antd';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { routerRedux } from 'dva/router';

import styles from '../../styles/list.less';

import List from '../../components/List';
import Operate from '../../components/Oprs';
import { isEmpty } from '../../utils/utils';
import { webConfig, formItemLayout, formItemGrid } from '../../utils/Constant';
import cache from '../../utils/cache';
import Importer from '../../components/Importer';

const FormItem = Form.Item;
const { Option } = Select;
//const routerUrl = cache.keysMenu.HdShop;
const routerUrl = '/HdShop';
const currUrl = '/HdShop/infoindex';
const url = 'HdShop';
const rowKey = 'shop_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class HdShopindex extends Component {
  state = {
  };

  componentDidMount() {
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'base/clear',
    });
  }


  render() {
    const { form, base } = this.props;
    var shopid=localStorage.getItem('shopidb4huodong-web');
   // alert(shopid);
    //if (shopid===null)
    //    shopid='op201910300004';
        
    const { dispatch } = this.props;
    var isactive = localStorage.getItem("isactiveb4huodong-web");	  
   // alert(isactive);
    if(isactive==="0"){
      message.error('请完善客户信息');
      dispatch(routerRedux.goBack());
      return (<span></span>);
    }
    return (
        <Redirect exact from={`${currUrl}`} 
        to={{
            pathname:`${routerUrl}/info`,
            state: { id:shopid },
        }} 
        />
    );
  }
}
