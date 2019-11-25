import React, { PureComponent } from 'react';
import { Col, Row, Button, Card,message } from 'antd';
import { Link } from 'dva/router';
import modules from '../../utils/finishModules';
import { width } from 'window-size';

import styles from './index.less';

export default class SysBility extends PureComponent {


  componentWillMount(){
    
  }
  render() {
    return (
      <div >
        <Card bordered={false} style={{ marginBottom: 24 }} className={styles.bility_root} hoverable>
          <h1>功能列表</h1>
          <Row>
            {modules.map(item => {
              // console.log(item);
              if (item.menuid.length === 4) {
                if (item.url && item.url.match(/^\/http/)) {
                  return (
                    <Col xs={12} md={3} key={item.menuid} className={styles.bility_button} style={{ marginTop: '10px' }}>
                      <p> <img src={item.menuIcon} className={styles.bility_img}></img>
                       </p>
                       <p>
                      <a href={item.url.replace(/^\/http/, 'http')} target="_blank">
                        <Button type="link" className={styles.bility_link}>{item.menuname}</Button>
                      </a></p>
                    </Col>
                  );
                } else {
                  return (
                    <Col xs={12} md={3} key={item.menuid} className={styles.bility_button} style={{ marginTop: '10px' }}>
                    <Link to={{ pathname: item.url, params: { args: item.args } }}>
                      <p>
                      <img src={item.menuIcon} className={styles.bility_img} ></img>
                      </p>
                       <p>
                        <Button type="link" className={styles.bility_link}>{item.menuname}</Button>
                      </p>
                      </Link>
                    </Col>
                  );
                }
              } else {
                return '';
              }
            })}
          </Row>
        </Card>
      </div>
    );
  }
}
