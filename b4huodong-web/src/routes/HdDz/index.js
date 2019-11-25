import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { connect } from 'dva';
import NotFound from '../Exception/404';
import { getRoutes } from '../../utils/utils';
import Operate from '../../components/Oprs';
import { Form,message} from 'antd';
import { routerRedux } from 'dva/router';
import cache from '../../utils/cache';
// import db from '../../utils/db';

//const routerUrl = cache.keysMenu.HdDz;
const routerUrl ='/HdDz';

@connect()
@Operate.create('HdDz')
export default class HdDz extends PureComponent {
  componentWillUnmount() {
    this.props.dispatch({
      type: 'list/clear',
    });
  }

  render() {
    const { match, routerData } = this.props;
    const { dispatch } = this.props;
    var usertype=localStorage.getItem("userTypeb4huodong-web");	 
    if (usertype==="shop")
    {
      var isactive = localStorage.getItem("isactiveb4huodong-web");	  
      console.log(isactive);
      if(isactive==="0"){
        message.error('请完善客户信息');
        dispatch(routerRedux.goBack());
        return (<span></span>);
      }
    }
    return (
      <Switch>
        {getRoutes(match.path, routerData).map(item => (
          <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
        ))}
        <Redirect exact from={`${routerUrl}`} to={`${routerUrl}/list`} />
        <Route render={NotFound} />
      </Switch>
    );
  }
}
