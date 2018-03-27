// @flow

import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
import TitleBar from './TitleBar';

type AppProps = {
  children?: ?React.Node
};

export default class App extends React.Component<AppProps> {
  render() {
    return (
      <React.Fragment>
        <TitleBar id="app-title-bar" />
        <Grid id="app-content-grid" fluid>
          <Row id="app-content-body-row">{this.props.children}</Row>
        </Grid>
      </React.Fragment>
    );
  }
}
