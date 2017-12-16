import React from 'react';
import { Col, Panel } from 'react-bootstrap';

import Engine from "./Engine";
import GenPanel from './Panel'

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Col xs={12} md={10}>
          <Panel header="Polygon" >
            <Engine />
          </Panel>
        </Col>
        <Col xs={6} md={2}>
          <GenPanel />
        </Col>
      </div>
    )
  }
}