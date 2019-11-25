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
// 引入 ECharts 主模块
import echarts from 'echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import styles from '../../styles/list.less';

import List from '../../components/List';
import Operate from '../../components/Oprs';
import { isEmpty } from '../../utils/utils';
import { webConfig, formItemLayout, formItemGrid } from '../../utils/Constant';
import cache from '../../utils/cache';
import Importer from '../../components/Importer';
import { stringify } from 'querystring';

const FormItem = Form.Item;
const { Option } = Select;
//const routerUrl = cache.keysMenu.RsDevicelog;
const routerUrl = '/RsDevicelog';
const url = 'RsDevicelog';
const rowKey = 'log_id';
const DateFormat = 'YYYY-MM-DD';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class RsDevicelogList extends Component {
  state = {
    scrollY: document.body.clientHeight > 768 ? 430 + document.body.clientHeight - 768 : 430,
    dicdevicetype: [],
    dicclient: [],
    dicdls: [],
    dicuser: [],
    dicdevicename: [],
    dicprojecttype: [],
    useTimes: [],
    useTime: [],
    useData: [],
    endData: [],
    startData: [],
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);

    const { dispatch } = this.props;

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
    //项目名称
    //设备类型
    dispatch({
      type: 'base/getByDicType',
      payload: { dicType: 'projecttype' },
      callback: data => {
        this.setState({
          dicprojecttype: data.data,
        });
      },
    });
    //请求客户下拉框
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
        // console.log(data)
        this.setState({
          dicclient: data.data.list,
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
    //请求设备名称
    dispatch({
      type: 'base/queryData',
      params: {
        columnOrder: 'asc',
        columnProp: 'dls_name',
        len: 200,
        page: 1,
        queryMap: {},
        url: '/api/RsDevice/queryRsDeviceList',
      },
      callback: data => {
        this.setState({
          dicdevicename: data.data.list,
        });
      },
    });
    //this.form.submit();
    this.handleQuery();
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

  handleQuery = e => {
    if (e) e.preventDefault();
    const { form, list } = this.props;
    var self = this;
    form.validateFieldsAndScroll((err, values) => {
      let temp = self.handlequerytmp(values);

      //请求echarts数据
      const { dispatch } = this.props;
      dispatch({
        type: 'base/queryCharts',
        params: {
          orderby1: 'log_day',
          queryMap: { ...values, ...temp },
          url: '/api/RsDeviceReport/reportRsDeviceReportList',
        },
        callback: data => {
          // console.log(data)
          const use_data = [];
          const use_time = [];
          const use_times = [];
          //  console.log("values.start_start_date",values.start_start_date.format('YYYYMMDD'));
          //  console.log(values.end_start_date);
          var startdate = parseInt(values.start_start_date.format('YYYYMMDD'));
          var enddate = parseInt(values.end_start_date.format('YYYYMMDD'));
          for (var i = startdate; i <= enddate; i++) {
            var finditem = false;
            data.data.map(item => {
              if (parseInt(item.groupby1) === i) {
                use_data.push(item.groupby1);
                use_time.push(item.use_time);
                use_times.push(item.use_times);
                finditem = true;
                //break;
              }
            });
            if (!finditem) {
              use_data.push(i);
              use_time.push(0);
              use_times.push(0);
            }
          }

          // data.data.map(item => {
          //   use_data.push(item.groupby1);
          //   use_time.push(item.use_time);
          //   use_times.push(item.use_times);
          // })
          this.setState(
            {
              useData: use_data,
              useTime: use_time,
              useTimes: use_times,
            },
            () => {
              //统计表
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById('main'));
              // 绘制图表
              myChart.setOption({
                title: { text: '设备项目操作统计图' },
                color: ['#3398DB'],
                tooltip: {},
                xAxis: {
                  data: this.state.useData,
                },
                yAxis: [
                  {
                    name: '次数',
                    type: 'value',
                  },
                  {
                    name: '使用时长(分钟))',
                    type: 'value',
                  },
                ],
                series: [
                  {
                    name: '使用次数',
                    type: 'line',
                    data: this.state.useTimes,
                  },
                  {
                    name: '使用时长',
                    type: 'bar',
                    data: this.state.useTime,
                    yAxisIndex: 1,
                    color: '#ffc64b',
                  },
                ],
              });
            }
          );
        },
      });
    });
  };
  handlequerytmp = values => {
    console.log('validateFieldsAndScroll', values);
    let temp = {};
    if (!isEmpty(values.start_start_date))
      temp = {
        ...temp,
        start_start_date: values.start_start_date.format(DateFormat),
      };
    else {
      //todo
      alert('开始时间不能为空');
      return;
    }
    if (!isEmpty(values.end_start_date))
      temp = {
        ...temp,
        end_start_date: values.end_start_date.format(DateFormat),
      };
    if (!isEmpty(values.start_end_date))
      temp = {
        ...temp,
        start_end_date: values.start_end_date.format(DateFormat),
      };
    if (!isEmpty(values.end_end_date))
      temp = {
        ...temp,
        end_end_date: values.end_end_date.format(DateFormat),
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
    return temp;
  };

  handleSearch = e => {
    if (e) e.preventDefault();
    const { form, list } = this.props;
    const { setList } = list;
    var self = this;
    form.validateFieldsAndScroll((err, values) => {
      let temp = self.handlequerytmp(values);

      setList({
        current: 1,
        queryMap: { ...values, ...temp },
      });
      this.handleQuery(e);
      return;
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
          filename: '设备使用记录.xls',
          queryMap: { ...values, ...date } || {},
        },
        url,
      });
    });
  };

  render() {
    const { form, base } = this.props;
    const datadicdevicetype = this.state.dicdevicetype;
    const datadicclient = this.state.dicclient;
    const datadicdls = this.state.dicdls;
    const datadicuser = this.state.dicuser;
    // const datadicdevicename = this.state.dicdevicename;
    const datadicprojecttype = this.state.dicprojecttype;
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
    function getFormatDate(date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    this.props.list.queryMap.start_start_date = getFormatDate(
      new Date(new Date().setDate(new Date().getDate() - 7))
    );
    this.props.list.queryMap.end_start_date = getFormatDate(new Date());
    const columns = [
      // {
      //   title: '操作',
      //   key: 'action',
      //   width: 160,
      //   align: 'center',
      //   render: (text, record) => (
      //     <Row type="flex" justify="space-around">
      //       <Operate operateName="UPDATE">
      //         <Link
      //           to={{
      //             pathname: `${routerUrl}/info`,
      //             state: { id: record[rowKey] },
      //           }}
      //         >
      //           <Button type="primary" icon="edit" ghost size="small">
      //             编辑
      //           </Button>
      //         </Link>
      //       </Operate>
      //       <Operate operateName="DELETE">
      //         <Button
      //           type="danger"
      //           icon="delete"
      //           ghost
      //           size="small"
      //           onClick={() => showConfirm(record)}
      //         >
      //           删除
      //         </Button>
      //       </Operate>
      //     </Row>
      //   ),
      // },
      // { title: '记录id', dataIndex: 'log_id', width: 150, sorter: false },
      {
        title: '项目名称',
        // dataIndex: 'opname',
        render: (text, record) => {
          if (!datadicprojecttype) return <span>{record.device_type}</span>;
          const temp = datadicprojecttype.find(item => item.dicCode === record.device_type);
          if (!temp) return <span>{record.device_type}</span>;
          return <span>{temp.dicValue}</span>;
        },
        width: 150,
        sorter: false,
      },
      { title: '开始时间', dataIndex: 'start_date', width: 150, sorter: false },
      { title: '结束时间', dataIndex: 'end_date', width: 150, sorter: false },
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
      // {
      //   title: '设备',
      //   // dataIndex: 'device_id',
      //   render: (text, record) => {
      //     return <span>{record.device_uuid}{record.device_id}</span>
      //   },
      //   width: 150,
      //   sorter: false
      // },
      { title: '设备uuid', dataIndex: 'device_uuid', width: 150, sorter: false },
      {
        title: '设备类型',
        // dataIndex: 'dls_status',
        width: 150,
        sorter: false,
        render: (text, record) => {
          if (!datadicdevicetype) return <span>{record.device_type}</span>;
          const temp = datadicdevicetype.find(item => item.dicCode === record.device_type);
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
      { title: '使用时长(s)', dataIndex: 'use_time', width: 150, sorter: false },
      { title: '创建时间', dataIndex: 'create_date', width: 150, sorter: false },
    ];

    const listConfig = {
      url: '/api/RsDevicelog/queryRsDevicelogList', // 必填,请求url
      scroll: { x: 1800, y: this.state.scrollY }, // 可选配置,同antd table
      rowKey, // 必填,行key
      columns, // 必填,行配置
      //autoquery:true,
    };

    return (
      <div className={styles.tableListForm}>
        <Card bordered={false} style={{ marginBottom: 24 }} hoverable>
          <Form onSubmit={this.handleSearch}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              {/* <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="记录id">
                  {getFieldDecorator('log_id', { initialValue: this.props.list.queryMap.log_id })(
                    <Input placeholder="请输入" />
                  )}{' '}
                </FormItem>{' '}
              </Col> */}
              <Col {...formItemGrid}>
                <FormItem {...formItemLayout} label="项目名称">
                  {getFieldDecorator('project_type', {
                    initialValue: this.props.list.queryMap.project_type,
                  })(
                    <Select showSearch allowClear placeholder="项目名称">
                      {datadicprojecttype &&
                        datadicprojecttype.map(item => {
                          return <Option value={item.dicCode}>{item.dicValue}</Option>;
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="开始时间(起始)">
                  {getFieldDecorator('start_start_date', {
                    initialValue: this.props.list.queryMap.start_start_date
                      ? moment(this.props.list.queryMap.start_start_date)
                      : null,
                    rule: [
                      {
                        required: true,
                        message: '开始时间(起始)不能缺失!',
                      },
                    ],
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="开始时间(结束)">
                  {getFieldDecorator('end_start_date', {
                    initialValue: this.props.list.queryMap.end_start_date
                      ? moment(this.props.list.queryMap.end_start_date)
                      : null,
                    rule: [
                      {
                        required: true,
                        message: '开始时间(结束)不能缺失!',
                      },
                    ],
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="结束时间(起始)">
                  {getFieldDecorator('start_end_date', {
                    initialValue: this.props.list.queryMap.start_end_date
                      ? moment(this.props.list.queryMap.start_end_date)
                      : null,
                  })(<DatePicker format={DateFormat} placeholder="请输入" />)}{' '}
                </FormItem>{' '}
              </Col>
              <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="结束时间(结束)">
                  {getFieldDecorator('end_end_date', {
                    initialValue: this.props.list.queryMap.end_end_date
                      ? moment(this.props.list.queryMap.end_end_date)
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
              {/* <Col {...formItemGrid}>
                {' '}
                <FormItem {...formItemLayout} label="设备">
                  {getFieldDecorator('device_id', {
                    initialValue: this.props.list.queryMap.device_id,
                  })(
                    <Select showSearch allowClear placeholder="设备">
                      {datadicdevicename &&
                        datadicdevicename.map(item => {
                          return <Option value={item.device_id}>{item.device_uuid}{item.device_id}</Option>;
                        })}
                    </Select>
                  )}{' '}
                </FormItem>{' '}
              </Col> */}
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
                <FormItem {...formItemLayout} label="使用时长(s)">
                  {getFieldDecorator('use_time', {
                    initialValue: this.props.list.queryMap.use_time,
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
              </Col>
            </Row>
          </Form>
        </Card>
        <List {...listConfig} />
        <div id="main" style={{ height: 600 }} />
      </div>
    );
  }
}
