/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:56:24 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:09:55
 * @Description: 用户管理列表
 */
import React, { Component } from 'react';
import { Form, Row, Col, Input, InputNumber, Button, Modal, Card, Select, DatePicker } from 'antd';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';

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
const routerUrl = '/HdShopuser';
const currUrl = '/HdShopuser/infoindex';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class HdShopuserindex extends Component {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
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
    var userid=localStorage.getItem('userid');
   // alert(shopid);
   // alert(userid);
    // if (userid===null)
    //     userid='USER201911010082';
    return (
        <Redirect exact from={`${currUrl}`} 
        to={{
            pathname:`${routerUrl}/info`,
            state: { id:userid },
        }} 
        />
    );
  }
}
