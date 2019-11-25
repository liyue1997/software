const reportsystemroute = (app, dynamicWrapper) => ({
  '/RsClient': { component: dynamicWrapper(app, [], () => import('../routes/RsClient')) },
  '/RsClient/list': { component: dynamicWrapper(app, [], () => import('../routes/RsClient/List')) },
  '/RsClient/info': { component: dynamicWrapper(app, [], () => import('../routes/RsClient/Info')) },
  '/RsDevice': { component: dynamicWrapper(app, [], () => import('../routes/RsDevice')) },
  '/RsDevice/list': { component: dynamicWrapper(app, [], () => import('../routes/RsDevice/List')) },
  '/RsDevice/info': { component: dynamicWrapper(app, [], () => import('../routes/RsDevice/Info')) },
  '/RsDeviceerrorlog': {
    component: dynamicWrapper(app, [], () => import('../routes/RsDeviceerrorlog')),
  },
  '/RsDeviceerrorlog/list': {
    component: dynamicWrapper(app, [], () => import('../routes/RsDeviceerrorlog/List')),
  },
  '/RsDeviceerrorlog/info': {
    component: dynamicWrapper(app, [], () => import('../routes/RsDeviceerrorlog/Info')),
  },
  '/RsDevicelog': { component: dynamicWrapper(app, [], () => import('../routes/RsDevicelog')) },
  '/RsDevicelog/list': {
    component: dynamicWrapper(app, [], () => import('../routes/RsDevicelog/List')),
  },
  '/RsDevicelog/info': {
    component: dynamicWrapper(app, [], () => import('../routes/RsDevicelog/Info')),
  },
  '/RsDeviceReport': {
    component: dynamicWrapper(app, [], () => import('../routes/RsDeviceReport')),
  },
  '/RsDeviceReport/list': {
    component: dynamicWrapper(app, [], () => import('../routes/RsDeviceReport/List')),
  },
  '/RsDeviceReport/info': {
    component: dynamicWrapper(app, [], () => import('../routes/RsDeviceReport/Info')),
  },
  '/RsDls': { component: dynamicWrapper(app, [], () => import('../routes/RsDls')) },
  '/RsDls/list': { component: dynamicWrapper(app, [], () => import('../routes/RsDls/List')) },
  '/RsDls/info': { component: dynamicWrapper(app, [], () => import('../routes/RsDls/Info')) },
  '/RsZone': { component: dynamicWrapper(app, [], () => import('../routes/RsZone')) },
  '/RsZone/list': { component: dynamicWrapper(app, [], () => import('../routes/RsZone/List')) },
  '/RsZone/info': { component: dynamicWrapper(app, [], () => import('../routes/RsZone/Info')) },

  '/RsUserYwer': { component: dynamicWrapper(app, [], () => import('../routes/RsUserYwer')) },
  '/RsUserYwer/list': {
    component: dynamicWrapper(app, [], () => import('../routes/RsUserYwer/List')),
  },
  '/RsUserYwer/info': {
    component: dynamicWrapper(app, [], () => import('../routes/RsUserYwer/Info')),
  },
  '/RsUserOper': { component: dynamicWrapper(app, [], () => import('../routes/RsUserOper')) },
  '/RsUserOper/list': {
    component: dynamicWrapper(app, [], () => import('../routes/RsUserOper/List')),
  },
  '/RsUserOper/info': {
    component: dynamicWrapper(app, [], () => import('../routes/RsUserOper/Info')),
  },
  '/Map': { component: dynamicWrapper(app, [], () => import('../routes/DragMap')) },
});

export default reportsystemroute;
