// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import AppActions from '_state/app/AppActions';
import type { AppTitleType } from '_state/app/app.types';

type AppProps = {
  title?: ?AppTitleType,
  setTitle?: (?AppTitleType) => void,
  children?: ?React.Node
};

@connect(
  (globalState: GlobalState) => ({
    title: globalState.app.title
  }),
  {
    setTitle: AppActions.setTitle
  }
)
export default class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.setTitle && this.props.setTitle('Testy Title!');
  }

  render() {
    return (
      <div id="app-root">
        <div id="app-title">{this.props.title}</div>
        <div id="app-body">{this.props.children}</div>
      </div>
    );
  }
}
