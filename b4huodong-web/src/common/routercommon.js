const commonroute = (app, dynamicWrapper) => ({
  '/sqldebug': {
    component: dynamicWrapper(app, [], () => import('../routes/SqlDebug')),
  },
  '/sysFnc/oprLog': {
    component: dynamicWrapper(app, [], () => import('../routes/OprLog')),
  },
  '/sysFnc/oprLog/list': {
    component: dynamicWrapper(app, [], () => import('../routes/OprLog/List')),
  },
  '/sysFnc/oprLog/info': {
    component: dynamicWrapper(app, [], () => import('../routes/OprLog/Info')),
  },
  '/changePassword': {
    component: dynamicWrapper(app, [], () => import('../routes/User/ChangePassword')),
  },
  '/userInfo': {
    component: dynamicWrapper(app, [], () => import('../routes/User/UserInfo')),
  },
  '/user': {
    component: dynamicWrapper(app, [], () => import('../routes/User/List')),
  },
  '/AppDevice': {
    component: dynamicWrapper(app, [], () => import('../routes/AppDevice')),
  },
  '/AppDevice/list': {
    component: dynamicWrapper(app, [], () => import('../routes/AppDevice/List')),
  },
  '/AppDevice/info': {
    component: dynamicWrapper(app, [], () => import('../routes/AppDevice/Info')),
  },
  '/AppVer': {
    component: dynamicWrapper(app, [], () => import('../routes/AppVer')),
  },
  '/AppVer/list': {
    component: dynamicWrapper(app, [], () => import('../routes/AppVer/List')),
  },
  '/AppVer/info': {
    component: dynamicWrapper(app, [], () => import('../routes/AppVer/Info')),
  },
  '/TsUser': {
    component: dynamicWrapper(app, [], () => import('../routes/TsUser')),
  },
  '/TsUser/list': {
    component: dynamicWrapper(app, [], () => import('../routes/TsUser/List')),
  },
  '/TsUser/info': {
    component: dynamicWrapper(app, [], () => import('../routes/TsUser/Info')),
  },
  '/TComkey': {
    component: dynamicWrapper(app, [], () => import('../routes/TComkey')),
  },
  '/TComkey/list': {
    component: dynamicWrapper(app, [], () => import('../routes/TComkey/List')),
  },
  '/TComkey/info': {
    component: dynamicWrapper(app, [], () => import('../routes/TComkey/Info')),
  },
  '/TYzm': {
    component: dynamicWrapper(app, [], () => import('../routes/TYzm')),
  },
  '/TYzm/list': {
    component: dynamicWrapper(app, [], () => import('../routes/TYzm/List')),
  },
  '/TYzm/info': {
    component: dynamicWrapper(app, [], () => import('../routes/TYzm/Info')),
  },
  '/TDic': { component: dynamicWrapper(app, [], () => import('../routes/TDic')) },
  '/TDic/list': { component: dynamicWrapper(app, [], () => import('../routes/TDic/List')) },
  '/TDic/info': { component: dynamicWrapper(app, [], () => import('../routes/TDic/Info')) },
  '/TsUserSetting': { component: dynamicWrapper(app, [], () => import('../routes/TsUserSetting')) },
  '/TsUserSetting/list': {
    component: dynamicWrapper(app, [], () => import('../routes/TsUserSetting/List')),
  },
  '/TsUserSetting/info': {
    component: dynamicWrapper(app, [], () => import('../routes/TsUserSetting/Info')),
  },
  
});

export default commonroute;
