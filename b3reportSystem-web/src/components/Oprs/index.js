import React from 'react';
import { connect } from 'dva';

const operateAuthority = (oprs, operateName) => {
  return oprs.indexOf(operateName) > -1;
};

const noMatch = '';

function OperateBase({ oprs, operateName, ...props }) {
  //console.log("OperateBase",operateName);
  
  var r= Array.isArray(oprs)
    ? operateAuthority(oprs, operateName) ? props.children : noMatch
    : noMatch;
    //console.log("OperateBase",r);

  return r;
}
const Operate = connect(({ setting }) => ({
  oprs: setting.oprs,
}))(OperateBase);

Operate.create = pathname => WrappedComponent => {
  @connect(({ setting }) => ({
    keysMenu: setting.keysMenu,
  }))
  class War extends React.PureComponent {
    componentDidMount() {
      const moduleName = '/' + pathname;
      // 打包压缩会更改类名
      /*  const moduleName =
      pathname || WrappedComponent.name.replace(/^[a-zA-Z]/, m => m.toLowerCase()); */
      //console.log("moduleName",moduleName);
      //console.log("moduleName",this.props.keysMenu);
      if (this.props.keysMenu[moduleName]) {
        this.props.dispatch({
          type: 'setting/getOprs',
          payload: this.props.keysMenu[moduleName],
        });
      }
    }

    componentWillUnmount() {
      this.props.dispatch({
        type: 'setting/save',
        payload: {
          oprs: null,
        },
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return War;
};

export default Operate;
