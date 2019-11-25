import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { connect } from 'dva';
import NotFound from '../Exception/404';
import { getRoutes } from '../../utils/utils';
import Operate from '../../components/Oprs';
import cache from '../../utils/cache';

//const routerUrl = cache.keysMenu.LsShop;
const routerUrl ='/LsShop';

export default class DragMap extends PureComponent {
  render() {
    const { match, routerData } = this.props;
    return (
      <div style={{ border: 0, width: '100%', height: '100%' }}>
        <iframe src="drag/map.html" style={{ border: 0, width: '100%', height: '100%' }} />
      </div>
    );
  }
}
