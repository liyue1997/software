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
import { Link, routerRedux } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import moment from 'moment';
import ListButtonGroup from '../../components/ListButtonGroup';
import currentUser from '../../components/GlobalHeader'

import styles from '../../styles/list.less';

import List from '../../components/List';
import Operate from '../../components/Oprs';
import { isEmpty } from '../../utils/utils';
import { webConfig, formItemLayout, formItemGrid } from '../../utils/Constant';
import cache from '../../utils/cache';
import Importer from '../../components/Importer';

const FormItem = Form.Item;
const { Option } = Select;
//const routerUrl = cache.keysMenu.RsClient;
const routerUrl = '/RsClient';
const url = 'RsClient';
const rowKey = 'client_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class RsClientList extends Component {
  state = {
    scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
    dicDlsStatus: [],
    dicZone: [],
    dicName: [],
    dicLevel: [],
    dicdls: [],
    dicuser: [],
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    //请求客户状态下拉框
    const { dispatch } = this.props;
    const { dicDlsStatus, dicName, dicZone } = this.state;
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'clientstatus' },
      callback: data => {
        this.setState({
          dicDlsStatus: data.data,
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
    //客户等级
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'clientlevel' },
      callback: data => {
        this.setState({
          dicLevel: data.data,
        });
      },
    });
    //代理商名称
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'zone_code',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/RsDls/queryRsDlsList',
      },
      callback: data => {
        this.setState({
          dicName: data.data.list,
        });
      },
    });
    //区域
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
    form.validateFieldsAndScroll((err, values) => {
      let temp = {};
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
          filename: '客户.xls',
          queryMap: { ...values, ...date } || {},
        },
        url,
      });
    });
  };

  render() {
    const { form, base } = this.props;
    const { clientstatus } = base;
    const datadicdls = this.state.dicdls;
    const datadicDlsStatus = this.state.dicDlsStatus;
    const datadicZone = this.state.dicZone;
    const datadicLevel = this.state.dicLevel;
    const dicName = this.state.dicName;
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
      { title: '客户编码', dataIndex: 'client_id', width: 150, sorter: false },
      { title: '客户简称', dataIndex: 'client_name', width: 150, sorter: false },
      { title: '客户全称', dataIndex: 'client_fullname', width: 150, sorter: false },
      { title: '经度', dataIndex: 'client_lon', width: 150, sorter: false },
      { title: '纬度', dataIndex: 'client_lat', width: 150, sorter: false },
      {
        title: '区域编码',
        // dataIndex: 'zone_code',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadicZone) return <span>{record.zone_code}</span>;
          const temp = datadicZone.find(item => item.zone_code === record.zone_code);
          if (!temp) return <span>{record.zone_code}</span>;
          return (
            <span>
              {temp.zone_code}
              {temp.zone_name}
            </span>
          );
        },
      },
      { title: '客户地址', dataIndex: 'client_address', width: 150, sorter: false },
      { title: '合同编号', dataIndex: 'client_hetong', width: 150, sorter: false },
      { title: '客户电话', dataIndex: 'client_tel', width: 150, sorter: false },
      {
        title: '客户状态',
        // dataIndex: 'dls_status',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadicDlsStatus) return <span>{record.client_status}</span>;
          const temp = datadicDlsStatus.find(item => item.dicCode === record.client_status);
          if (!temp) return <span>{record.dicValue}</span>;
          return <span>{temp.dicValue}</span>;
        },
      },
      {
        title: '代理商',
        // dataIndex: 'dls_id',
        render: (text, record) => {
          if (!datadicdls) return <span>{record.dls_id}</span>;
          const temp = datadicdls.find(item => item.dls_id === record.dls_id);
          if (!temp) return <span>{record.dls_id}</span>;
          return <span>{temp.dls_name}</span>;
        },
        width: 150,
        sorter: false,
      },
      {
        title: '业务人员',
        // dataIndex: 'yw_user_id',
        render: (text, record) => {
         // console.log('record', record);
         // console.log(datadicuser);
          if (!datadicuser) return <span>{record.dls_id}</span>;
          const temp = datadicuser.find(item => item.dls_id === record.dls_id);
          if (!temp) return <span>{record.dls_id}</span>;
          return <span>{temp.user_name}</span>;
        },
        width: 150,
        sorter: false,
      },
      { title: '汇款速度', dataIndex: 'hk_speed', width: 150, sorter: false },
      {
        title: '客户等级',
        // dataIndex: 'client_level',
        render: (text, record) => {
          // console.log(record);
          if (!datadicLevel) return <span>{record.dicCode}</span>;
          const temp = datadicLevel.find(item => item.dicCode === record.client_level);
          if (!temp) return <span>{record.dicCode}</span>;
          return <span>{temp.dicValue}</span>;
        },
        width: 150,
        sorter: false,
      },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false },
    ];
    var usertoken=localStorage.getItem('currentUserb3reportSystem-webNew');
    // console.log("localStorage.getItem('currentUserb3reportSystem-webNew')",usertoken);
    if (usertoken===undefined || usertoken ==="undefined")
       return (<div>你已经退出</div>);
    if(JSON.parse(usertoken).extendInfo.userType === 'dls'){
     columns.shift();
    }
    const listConfig = {
      url: '/api/RsClient/queryRsClientList', // 必填,请求url
      scroll: { x: 2250, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="客户编码">
                  {getFieldDecorator('client_id', {
                    initialValue: this.props.list.queryMap.client_id,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="客户简称">
                  {getFieldDecorator('client_name', {
                    initialValue: this.props.list.queryMap.client_name,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="客户全称">
                  {getFieldDecorator('client_fullname', {
                    initialValue: this.props.list.queryMap.client_fullname,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="经度">
                  {getFieldDecorator('client_lon', {
                    initialValue: this.props.list.queryMap.client_lon,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="纬度">
                  {getFieldDecorator('client_lat', {
                    initialValue: this.props.list.queryMap.client_lat,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} label="区域">
                  {getFieldDecorator('zone_code', {
                    initialValue: this.props.list.queryMap.zone_code,
                  })(
                    <Select showSearch allowClear placeholder="区域">
                      {datadicZone &&
                        datadicZone.map(item => {
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
                <FormItem {...formItemLayout} label="客户地址">
                  {getFieldDecorator('client_address', {
                    initialValue: this.props.list.queryMap.client_address,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="合同编号">
                  {getFieldDecorator('client_hetong', {
                    initialValue: this.props.list.queryMap.client_hetong,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="客户电话">
                  {getFieldDecorator('client_tel', {
                    initialValue: this.props.list.queryMap.client_tel,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              {/* <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="代理商状态">
                  {' '}
                  {getFieldDecorator('client_status', {
                    initialValue: this.props.list.queryMap.client_status,
                  })(
                    // <Select
                    //   showSearch
                    //   allowClear
                    //   placeholder="代理商状态"
                    //   optionFilterProp="children"
                    //   filterOption={(input, option) =>
                    //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    //   }
                    // >
                    //   {Array.isArray(clientstatus)
                    //     ? clientstatus.map(item => (
                    //         <Option key={item.dic_code} value={item.dic_code}>
                    //           {' '}
                    //           {`${item.dic_name}(${item.dic_code})`}{' '}
                    //         </Option>
                    //       ))
                    //     : null}{' '}
                    // </Select>
                  )}{' '}
                </FormItem>{' '}
              </Col> */}
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="客户状态">
                  {getFieldDecorator('clientstatus', {
                    initialValue: this.props.list.queryMap.clientstatus,
                  })(
                    <Select showSearch allowClear placeholder="客户状态">
                      {datadicDlsStatus &&
                        datadicDlsStatus.map(item => {
                          return <Option value={item.dicCode}>{item.dicValue}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>

              {/* <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="代理商">
                  {getFieldDecorator('dls_id', { initialValue: this.props.list.queryMap.dls_id })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col> */}
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="代理商">
                  {getFieldDecorator('dls_id', {
                    initialValue: this.props.list.queryMap.dls_id,
                  })(
                    <Select showSearch allowClear placeholder="代理商">
                      {dicName &&
                        dicName.map(item => {
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
                <FormItem {...formItemLayout} label="汇款速度">
                  {getFieldDecorator('hk_speed', {
                    initialValue: this.props.list.queryMap.hk_speed,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              {/* <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="客户等级">
                  {getFieldDecorator('client_level', {
                    initialValue: this.props.list.queryMap.client_level,
                  })(<Input placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col> */}
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="客户等级">
                  {getFieldDecorator('clientlevel', {
                    initialValue: this.props.list.queryMap.clientlevel,
                  })(
                    <Select showSearch allowClear placeholder="客户等级">
                      {datadicLevel &&
                        datadicLevel.map(item => {
                          return <Option value={item.dicCode}>{item.dicValue}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
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
              </Col>
            </Row>
          </Form>
        </Card>
        <List {...listConfig} />
      </div>
    );
  }
}
