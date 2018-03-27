// @flow
/* global module */

import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import type { Store } from 'redux';

import getLogger from '_util/log';
import defaultState from '_state/DefaultGlobalState';
import ReducerManager from '_state/ReducerManager';
import { reducerManager } from '_state';
import type { Action, GlobalState } from '_state/state.types';
import App from '_component/App';

const log = getLogger('AppRoot');

type AppRootProps = {};

type AppRootState = {
  reducerManager: ReducerManager,
  store: Store<GlobalState, Action<*>, *>
};

/**
 * Root-level component of the app. This is what is actually mounted to the page, and what everything else lives inside
 */
export default class AppRoot extends React.Component<AppRootProps, AppRootState> {
  constructor(props: AppRootProps, context: any) {
    super(props, context);
    log('Application starting');
    const logger = createLogger({
      collapsed: true
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.state = {
      reducerManager,
      store: createStore(reducerManager.reduce, defaultState, composeEnhancers(applyMiddleware(thunk, logger)))
    };

    if (module && module.hot && typeof module.hot.accept === 'function') {
      module.hot.accept('_state', () => {
        log('HMR triggered reload of reducers');
        this.setState({
          reducerManager
        });
        this.state.store.replaceReducer(reducerManager.reduce);
      });
    }
  }
  render(): ?React.Node {
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    );
  }
}
