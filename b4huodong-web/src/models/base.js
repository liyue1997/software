/*
 * @Author: zouwendi
 * @Date: 2018-05-15 17:25:02
 * @Last Modified by: zouwendi
 * @Last Modified time: 2018-06-11 10:49:38
 * @Description: 字典表管理model
 */
import { Message, message } from 'antd';
import {
  updateobj,
  addobj,
  getobj,
  newoObj,
  deleteobj,
  queryDic,
  queryCode,
  confirmobj,
  importExcel,
  addobjCount,
  queryAllDic,
  getImgOne,
  getByDicType,
  getchartsList,
  lockdevices,
  unlockdevices,
  getImgList
} from '../services/api';
import { queryList, queryReport } from '../services/list';
import { isEmpty } from '../utils/utils';

export default {
  namespace: 'base',

  state: {
    isSelectVideo: false,
    isSelectImg: false,
    importResTitleArr: [],
    shengCode: '130000',
    shiCode: '130100',
    isEdit: true,
    exporting: false,
    upperId: [],
    newInfo: {},
    info: {},
    otherInfo: {},
    newOther: {},
    tagindex: '',
    upList: [],
  },

  effects: {
    *queryData({ params, callback }, { call }) {
      //console.log("queryData start");
      const data = yield call(queryList, params);
      //console.log("queryData",data);
      if (callback && typeof callback === 'function') {
        if (data) {
          callback(data);
        }
      }
    },
    *queryCharts({ params, callback }, { call }) {
      const data = yield call(queryReport, params);
      if (callback && typeof callback === 'function') {
        if (data) {
          callback(data);
        }
      }
    },
    *query({ payload }, { call, put }) {
      const response = yield call(queryDic, payload);
      if (response.code === '200') {
        yield put({
          type: 'save',
          payload: {
            [payload.type]: response.data,
          },
        });
      } else {
        Message.error(response.msg);
      }
    },
    *fetch({ payload, callback, url }, { call, put }) {
      const response = yield call(updateobj, payload, url);
      if (response) {
        if (response.code === '203') {
          Message.success(response.msg);
          yield put({
            type: 'save',
            payload: {
              info: response.data || {},
            },
          });
          if (callback) callback();
        } else {
          Message.error(response.msg);
        }
      } else {
        Message.error('系统繁忙');
      }
    },
    *getUpperId({ payload }, { call, put }) {
      const temp = {
        page: 1,
        len: 100000,
        queryMap: {},
        url: payload.url,
        columnProp: undefined,
        columnOrder: undefined,
      };

      const response = yield call(queryList, temp);
      if (response) {
        yield put({
          type: 'save',
          payload: {
            upList: response.data.list,
          },
        });
      } else {
        message.error('获取上级id失败');
      }
    },
    *fetchAdd({ payload, callback, url, silent, success, error }, { call, put }) {
      const response = yield call(addobj, payload, url);
      if (response) {
        if (response.code === '201') {
          if (!silent) Message.success(response.msg);
          yield put({
            type: 'save',
            payload: {
              info: response.data || {},
            },
          });
          if (callback) callback();
          if (success) success(response.data);
        } else {
          if (error) {
            error(response.msg);
            return;
          }
          Message.error(response.msg);
        }
      } else {
        if (error) {
          error('系统繁忙');
          return;
        }
        Message.error('系统繁忙');
      }
    },
    *fetchAddC({ payload, callback, url, silent }, { call, put }) {
      const temp = payload;
      for (const key in temp) {
        if (temp[key] === null && temp[key] === undefined) delete temp[key];
      }
      const response = yield call(addobjCount, temp, url);
      if (response) {
        if (response.code === '201') {
          if (!silent) Message.success(response.msg);
          yield put({
            type: 'save',
            payload: {
              info: response.data || {},
            },
          });
          if (callback) callback();
        } else {
          Message.error(response.msg);
        }
      } else {
        Message.error('系统繁忙');
      }
    },
    *getPicture({ payload, url, callback }, { call, put }) {
      const response = yield call(getImgOne, payload, url);
      if (response && response.code === '200') {
        if (response.data.tagindex) {
          yield put({
            type: 'save',
            payload: {
              tagindex: response.data.tagindex || '',
            },
          });
        }
        yield put({
          type: 'save',
          payload: {
            info: response.data || {},
          },
        });
        if (callback) callback(response.data);
      } else {
        Message.error(response.msg);
      }
    },
    *info({ payload, url, callback }, { call, put }) {
      const response = yield call(getobj, payload, url);
      if (response && response.code === '200') {
        if (response.data.tagindex) {
          yield put({
            type: 'save',
            payload: {
              tagindex: response.data.tagindex || '',
            },
          });
        }
        yield put({
          type: 'save',
          payload: {
            info: response.data || {},
          },
        });
        if (callback) callback(response.data);
      } else {
        Message.error(response.msg);
      }
    },
    *confirmobj({ payload, callback, url }, { call }) {
      const response = yield call(confirmobj, payload, url);
      if (isEmpty(response)) {
        Message.error('系统繁忙');
        return;
      }
      if (response.code === '200') {
        Message.success(response.msg);
      } else {
        Message.error(response.msg);
      }

      if (callback) callback();
    },
    *otherInfo({ payload, url, callback }, { call, put }) {
      const response = yield call(getobj, payload, url);
      if (response && response.code === '200') {
        yield put({
          type: 'save',
          payload: {
            otherInfo: response.data || {},
          },
        });
        if (callback) callback();
      } else {
        Message.error(response.msg);
      }
    },
    *getobjbyCode({ payload, callback, error, success }, { call, put }) {
      const response = yield call(getobjbyCode, payload, 'wmscode');
      if (response) {
        if (response.code === '200') {
          yield put({
            type: 'save',
            payload: {
              infoByCode: response.data || {},
            },
          });
          if (callback) callback(response.data);
          if (success) success(response.data);
        } else {
          if (error) error(response.msg);
          Message.error(response.msg);
        }
      } else if (error) {
        error('系统繁忙');
      }
    },
    *getobjbyLCode({ payload, callback, error }, { call, put }) {
      const response = yield call(getobjbyLCode, payload, 'wmslot');
      if (response) {
        if (response.code === '200') {
          yield put({
            type: 'save',
            payload: {
              infoByCode: response.data || {},
            },
          });
          if (callback) callback(response.data);
        } else {
          if (error) error(response.msg);
          Message.error(response.msg);
        }
      } else if (error) {
        error('系统错误');
      }
    },
    *new({ url, callback, objName }, { call, put }) {
      const response = yield call(newoObj, url);
      if (response && response.code === '200') {
        const payload = {};
        if (objName) {
          payload[objName] = response.data || {};
        } else {
          payload.newInfo = response.data || {};
        }
        yield put({
          type: 'save',
          payload,
        });
        if (callback) callback(response.data);
      } else {
        Message.error(response.msg);
      }
    },

    *newOther({ url }, { call, put }) {
      const response = yield call(newoObj, url);
      if (response && response.code === '200') {
        yield put({
          type: 'save',
          payload: {
            newOther: response.data || {},
          },
        });
      } else {
        Message.error(response.msg);
      }
    },

    *delete({ payload, callback, url }, { call }) {
      const response = yield call(deleteobj, payload, url);
      if (response && response.code === '202') {
        Message.success(response.msg);
      } else {
        Message.error(response.msg);
      }

      if (callback) callback();
    },

    *fetchCount({ payload, callback, url }, { call }) {
      const response = yield call(fetchCount, payload, url);
      if (response && response.code === '200') {
        Message.success(response.msg);
        if (callback) callback();
      } else {
        Message.error(response.msg);
      }
    },
    *importExcel({ url, uid, callback }, { call, put }) {
      const response = yield call(importExcel, url, uid);
      if (response.code === '0') {
        yield put({
          type: 'save',
          payload: {
            resList: response.data,
            importMsg: undefined,
          },
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            resList: undefined,
            importMsg: response.msg,
          },
        });
      }
      if (callback) callback();
    },
    *queryAllDic(_, { call, put }) {
      const response = yield call(queryAllDic);
      if (response.code === '200') {
        const key = new Set();
        const map = {};
        response.data.forEach(item => key.add(item.dic_type));
        key.forEach(item => {
          const temp = response.data.filter(item2 => item2.dic_type === item);
          map[item] = temp;
        });
        yield put({
          type: 'save',
          payload: map,
        });
      } else {
        Message.error(response.msg);
      }
    },

    //调用service层 getByDicType方法请求代理商状态下拉框数据
    *getByDicType({ payload, callback }, { call }) {
      const data = yield call(getByDicType, payload);
      if (callback && typeof callback === 'function') {
        if (data) {
          callback(data);
        }
      }
    },

    //调用 getchartsList方法请求echarts数据
    *getchartsList({ payload, callback }, { call }) {
      const data = yield call(getchartsList, payload);
      if (callback && typeof callback === 'function') {
        if (data) {
          callback(data);
        }
      }
    },
    //锁定
    *lockdevices({ payload, callback }, { call }) {
      const data = yield call(lockdevices, payload);
      if (callback && typeof callback === 'function') {
        if (data) {
          callback(data);
        }
      }
    },
    //解除锁定
    *unlockdevices({ payload, callback }, { call }) {
      const data = yield call(unlockdevices, payload);
      if (callback && typeof callback === 'function') {
        if (data) {
          callback(data);
        }
      }
    },
    //调用 getImgList方法请求echarts数据
    *getImgList({ payload, callback }, { call }) {
      console.log("getImgList",payload);
      const data = yield call(getImgList, payload);
      if (callback && typeof callback === 'function') {
        if (data) {
          callback(data);
        }
      }
    },

  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    clear(state) {
      return {
        ...state,
        newInfo: {},
        info: {},
        tagindex: '',
      };
    },
  },
};
