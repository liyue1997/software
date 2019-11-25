import React, { PureComponent } from 'react';

//const routerUrl = cache.keysMenu.LsShop;
const routerUrl = '/LsShop';

export default class DragMap extends PureComponent {
  render() {
    const { match, routerData } = this.props;
    return (
      <div style={{ border: 0, width: '100%', height: '100%' }}>
        <iframe src="map/index.html" style={{ border: 0, width: '100%', height: '100%' }} allowfullscreen = 'true'/>
      </div>
    );
  }
}
