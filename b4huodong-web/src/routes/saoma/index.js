import React, { PureComponent,Component } from 'react';
import { routerRedux } from 'dva/router';
import { Form,message} from 'antd';
import List from '../../components/List';
import { connect } from 'dva';

//const routerUrl = cache.keysMenu.LsShop;
const routerUrl = '/saoma';

@connect(({ base }) => ({ base }))
@Form.create()
@List.create()
export default class saoma extends Component {
  state = {
  };
  componentDidMount() {
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'base/clear',
    });
  }
  render() {
    const { form, base } = this.props;
    const { dispatch } = this.props;
    var isactive = localStorage.getItem("isactiveb4huodong-web");	  
    //console.log(isactive);
    if(isactive==="0"){
      message.error('请完善客户信息');
      dispatch(routerRedux.goBack());
      return (<span></span>);
    }
    return (
      <div style={{ border: 0, width: '100%', height: '100%' }}>
        <iframe src="shop/main.html" style={{ border: 0, width: '100%', height: '100%' }} allowFullscreen = 'true'/>
      </div>
    );
  }
}
