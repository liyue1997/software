/*
 * @Author: zouwendi 
 * @Date: 2018-05-14 18:56:24 
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 18:09:55
 * @Description: 用户管理列表
 */
import React, { Component } from 'react';
import { Form, Row, Col, Input, InputNumber, Button, Modal, Card, Select, DatePicker, message } from 'antd';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import moment from 'moment';
import ListButtonGroup from '../../components/ListButtonGroup';

import styles from '../../styles/list.less';

import List from '../../components/List';
import Operate from '../../components/Oprs';
import { isEmpty } from '../../utils/utils';
import { webConfig, formItemLayout, formItemGrid } from '../../utils/Constant';
import cache from '../../utils/cache';
import Importer from '../../components/Importer';

const FormItem = Form.Item;
const { Option } = Select;
//const routerUrl = cache.keysMenu.RsDevice;
const routerUrl = '/RsDevice';
const url = 'RsDevice';
const rowKey = 'device_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class RsDeviceList extends Component {
  state = {
    scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
    dicdevicestatus: [],
    dicdevicetype: [],
    dicclient: [],
    dicdls: [],
    diczone: [],
    dicuser: [],
    dicdevicesid: []
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    const { dispatch } = this.props;
    //设备状态
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'devicestatus' },
      callback: data => {
        this.setState({
          dicdevicestatus: data.data,
        });
      },
    });
    //设备类型
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'devicetype' },
      callback: data => {
        this.setState({
          dicdevicetype: data.data,
        });
      },
    });
    //请求区域下拉框
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
          diczone: data.data.list,
        });
      },
    });
    //请求代理商下拉框
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'dls_name',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/RsDls/queryRsDlsList',
      },
      callback: data => {
        this.setState({
          dicdls: data.data.list,
        });
      },
    });
    //请求客户下拉框
    const { dicclient } = this.state;
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'client_name',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/RsClient/queryRsClientList',
      },
      callback: data => {
        this.setState({
          dicclient: data.data.list,
        });
      },
    });
    //业务人员下拉框
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'dls_name',
        len: 200,
        page: 1,
        queryMap: { dls_user_type: 'ywer' },
        url: '/api/RsUser/queryRsUserList',
      },
      callback: data => {
        this.setState({
          dicuser: data.data.list,
        });
      },
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  @Bind()
  @Debounce(200)
  resize() {
    this.setState({
      scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
    });
  }

  handleSearch = e => {
    if (e) e.preventDefault();
    const { form, list } = this.props;
    const { setList } = list;
    this.state.dicdevicesid = []
    form.validateFieldsAndScroll((err, values) => {
      let temp = {};
      if (!isEmpty(values.start_sell_date))
        temp = {
          ...temp,
          start_sell_date: values.start_sell_date.format(DateFormat),
        };
      if (!isEmpty(values.end_sell_date))
        temp = {
          ...temp,
          end_sell_date: values.end_sell_date.format(DateFormat),
        };
      if (!isEmpty(values.start_create_date))
        temp = {
          ...temp,
          start_create_date: values.start_create_date.format(DateFormat),
        };
      if (!isEmpty(values.end_create_date))
        temp = {
          ...temp,
          end_create_date: values.end_create_date.format(DateFormat),
        };
      setList({
        current: 1,
        queryMap: { ...values, ...temp },
      });
    });
  };

  handleFormReset = () => {
    const { form, list } = this.props;
    const { setList } = list;
    setList({
      current: 1,
      queryMap: {},
    });
    form.resetFields();
    this.state.dicdevicesid = []
  };

  // 删除后调用list
  hanleDelete = info => {
    const { dispatch, list } = this.props;
    const { setList } = list;
    dispatch({
      type: 'base/delete',
      payload: {
        // 主键id
        id: info[rowKey],
      },
      url,
      callback: () => setList(),
    });
  };

  handleExport = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      const date = {};
      if (values.startDate) date.startDate = values.startDate.format(DateFormat);
      if (values.endDate) date.endDate = values.endDate.format(DateFormat);
      dispatch({
        type: `list/exportExcel`,
        payload: {
          filename: '设备.xls',
          queryMap: { ...values, ...date } || {},
        },
        url,
      });
    });
  };

  handleLockDevicesApi = (api,e) => {
    const { dispatch } = this.props;
    var device_id = this.state.dicdevicesid;
    if (device_id.length <1)
    {
      message.error("请先选择设备");
      return;
    }
    var self=this;
    dispatch({
      type: 'base/'+api,
      payload: device_id,
      callback: data => {
          if (data.code === '200') {
            message.success(data.msg);
            self.handleSearch(e);
            self.state.dicdevicesid = [];
          }
          else{
            message.error(data.msg);
          }
      },
    });
  }
  //锁定设备
  lockdevices = e => {
    this.handleLockDevicesApi("lockdevices",e);
  }
  //解除锁定
  unlockdevices = e => {
    this.handleLockDevicesApi("unlockdevices",e);
  }
  render() {
    const { form, base } = this.props;
    const { devicestatus } = base;
    const { dicdevicestatus, dicdevicetype } = this.state; //只有数据字典要写
    const datadiczone = this.state.diczone;
    const datadicclient = this.state.dicclient;
    const datadicdls = this.state.dicdls;
    const datadicdevicetype = this.state.dicdevicetype;
    const datadicdevicestatus = this.state.dicdevicestatus;
    const datadicuser = this.state.dicuser;
    const { getFieldDecorator } = form;
    const { hanleDelete } = this;
    const showConfirm = record => {
      Modal.confirm({
        title: '确定想要删除吗?',
        okType: 'danger',
        okText: '是',
        cancelText: '否',
        onOk() {
          hanleDelete(record);
        },
      });
    };

    const columns = [
      {
        title: '操作',
        key: 'action',
        width: 160,
        align: 'center',
        render: (text, record) => (
          <Row type="flex" justify="space-around">
            <Operate operateName="UPDATE">
              <Link
                to={{
                  pathname: `${routerUrl}/info`,
                  state: { id: record[rowKey] },
                }}
              >
                <Button type="primary" icon="edit" ghost size="small">
                  编辑
                </Button>
              </Link>
            </Operate>
            <Operate operateName="DELETE">
              <Button
                type="danger"
                icon="delete"
                ghost
                size="small"
                onClick={() => showConfirm(record)}
              >
                删除
              </Button>
            </Operate>
          </Row>
        ),
      },
      { title: '设备id', dataIndex: 'device_id', width: 150, sorter: false },
      { title: '设备uuid', dataIndex: 'device_uuid', width: 150, sorter: false },
      {
        title: '设备类型',
        // dataIndex: 'dls_status',
        width: 150,
        sorter: false,
        render: (text, record) => {
          //console.log('设备类型', record);
          if (!datadicdevicetype) return <span>{record.device_type}</span>;
          const temp = datadicdevicetype.find(item => item.dicCode === record.device_type);
          if (!temp) return <span>{record.dicValue}</span>;
          return <span>{temp.dicValue}</span>;
        },
      },

      { title: '经度', dataIndex: 'device_lon', width: 150, sorter: false },
      { title: '纬度', dataIndex: 'device_lat', width: 150, sorter: false },
      {
        title: '区域',
        // dataIndex: 'zone_code',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadiczone) return <span>{record.zone_code}</span>;
          const temp = datadiczone.find(item => item.zone_code === record.zone_code);
          if (!temp) return <span>{record.zone_code}</span>;
          return <span>{temp.zone_name}</span>;
        },
      },
      { title: '销售日期', dataIndex: 'sell_date', width: 150, sorter: false },
      {
        title: '客户',
        // dataIndex: 'zone_code',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadicclient) return <span>{record.client_id}</span>;
          const temp = datadicclient.find(item => item.client_id === record.client_id);
          if (!temp) return <span>{record.client_id}</span>;
          return <span>{temp.client_name}</span>;
        },
      },

      { title: '设备异常信息', dataIndex: 'device_errorinfo', width: 150, sorter: false },
      {
        title: '设备状态',
        width: 150,
        sorter: false,
        render: (text, record) => {
          //console.log('设备状态', record);
          if (!datadicdevicestatus) return <span>{record.device_status}</span>;
          const temp = datadicdevicestatus.find(item => item.dicCode === record.device_status);
          if (!temp) return <span>{record.dicValue}</span>;
          return <span>{temp.dicValue}</span>;
        },
      },
      {
        title: '代理商',
        // dataIndex: 'zone_code',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadicdls) return <span>{record.dls_id}</span>;
          const temp = datadicdls.find(item => item.dls_id === record.dls_id);
          if (!temp) return <span>{record.dls_id}</span>;
          return <span>{temp.dls_name}</span>;
        },
      },
      {
        title: '业务人员',
        // dataIndex: 'yw_user_id',
        render: (text, record) => {
          if (!datadicuser) return <span>{record.dls_id}</span>;
          const temp = datadicuser.find(item => item.user_id === record.yw_user_id);
          if (!temp) return <span>{record.dls_id}</span>;
          return <span>{temp.user_name}</span>;
        },
        width: 150,
        sorter: false,
      },
      { title: '软件版本', dataIndex: 'soft_version', width: 150, sorter: false },
      { title: '备注', dataIndex: 'device_bak', width: 150, sorter: false },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // var datadicdevicesid = this.state.dicdevicesid
        console.log(selectedRowKeys);
        this.setState({
          dicdevicesid: selectedRowKeys
        })
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log(record);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected);
      },
      selectedRowKeys: this.state.dicdevicesid
    };
    // todo
    // 'currentUserb3reportSystem-webNew' 不应该跟项目名称绑定
    // 检查 是否登录应该是 通用方法
    // 获取 用户类型 应该是通用方法
    // 判断 应该依据 operation 不是usertype
    // list 是否有 操作列,应该是通用方法
    var usertoken = localStorage.getItem('currentUserb3reportSystem-webNew');
    // console.log("localStorage.getItem('currentUserb3reportSystem-webNew')",usertoken);
    if (usertoken === undefined || usertoken === "undefined")
      return (<div>你已经退出</div>);
    if (JSON.parse(usertoken).extendInfo.userType === 'dls') {
      columns.shift();
    }
    const listConfig = {
      url: '/api/RsDevice/queryRsDeviceList', // 必填,请求url 
      scroll: { x: 2250, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    //console.log("state",this.state);
    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="设备id">
                  {getFieldDecorator('device_id', {
                    initialValue: this.props.list.queryMap.device_id,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="设备uuid">
                  {getFieldDecorator('device_uuid', {
                    initialValue: this.props.list.queryMap.device_uuid,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="设备类型">
                  {getFieldDecorator('device_type', {
                    initialValue: this.props.list.queryMap.device_type,
                  })(
                    <Select showSearch allowClear placeholder="设备类型">
                      {datadicdevicetype &&
                        datadicdevicetype.map(item => {
                          return <Option value={item.dicCode}>{item.dicValue}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="经度">
                  {getFieldDecorator('device_lon', {
                    initialValue: this.props.list.queryMap.device_lon,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="纬度">
                  {getFieldDecorator('device_lat', {
                    initialValue: this.props.list.queryMap.device_lat,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>

              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} label="区域">
                  {getFieldDecorator('zone_code', {
                    initialValue: this.props.list.queryMap.zone_code,
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
                </FormItem>
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="销售日期(起始)">
                  {getFieldDecorator('start_sell_date', {
                    initialValue: this.props.list.queryMap.start_sell_date
                      ? moment(this.props.list.queryMap.start_sell_date)
                      : null,
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="销售日期(结束)">
                  {getFieldDecorator('end_sell_date', {
                    initialValue: this.props.list.queryMap.end_sell_date
                      ? moment(this.props.list.queryMap.end_sell_date)
                      : null,
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>

              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} label="客户">
                  {getFieldDecorator('client_id', {
                    initialValue: this.props.list.queryMap.client_id,
                  })(
                    <Select showSearch allowClear placeholder="客户">
                      {datadicclient &&
                        datadicclient.map(item => {
                          return <Option value={item.client_id}>{item.client_name}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="设备异常信息">
                  {getFieldDecorator('device_errorinfo', {
                    initialValue: this.props.list.queryMap.device_errorinfo,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>

              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="设备状态">
                  {getFieldDecorator('device_status', {
                    initialValue: this.props.list.queryMap.device_status,
                  })(
                    <Select showSearch allowClear placeholder="设备状态">
                      {datadicdevicestatus &&
                        datadicdevicestatus.map(item => {
                          return <Option value={item.dicCode}>{item.dicValue}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="代理商">
                  {getFieldDecorator('dls_id', {
                    initialValue: this.props.list.queryMap.dls_id,
                  })(
                    <Select showSearch allowClear placeholder="代理商">
                      {datadicdls &&
                        datadicdls.map(item => {
                          return <Option value={item.dls_id}>{item.dls_name}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="业务人员">
                  {getFieldDecorator('yw_user_id', {
                    initialValue: this.props.list.queryMap.yw_user_id,
                  })(
                    <Select showSearch allowClear placeholder="业务人员">
                      {datadicuser &&
                        datadicuser.map(item => {
                          return <Option value={item.dls_id}>{item.user_name}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="软件版本">
                  {getFieldDecorator('soft_version', {
                    initialValue: this.props.list.queryMap.soft_version,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="备注">
                  {getFieldDecorator('device_bak', {
                    initialValue: this.props.list.queryMap.device_bak,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="创建时间(起始)">
                  {getFieldDecorator('start_create_date', {
                    initialValue: this.props.list.queryMap.start_create_date
                      ? moment(this.props.list.queryMap.start_create_date)
                      : null,
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="创建时间(结束)">
                  {getFieldDecorator('end_create_date', {
                    initialValue: this.props.list.queryMap.end_create_date
                      ? moment(this.props.list.queryMap.end_create_date)
                      : null,
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <ListButtonGroup
                  handleFormReset={this.handleFormReset}
                  routerUrl={routerUrl}
                  dispatch={this.props.dispatch}
                  handleExport={this.handleExport}
                  url={url}
                  handleSearch={this.handleSearch}
                />
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.lockdevices}>锁定</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.unlockdevices}>解除锁定</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <List {...listConfig} rowSelection={rowSelection} />
      </div>
    );
  }
}
