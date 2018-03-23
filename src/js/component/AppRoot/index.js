// @flow
/* global module */

import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import type { Store } from 'redux';

import type { ReducerFn } from '_state/state.types';

type AppRootProps = {};

type AppRootState = {
  reducers: ReducerFn<*>,
  store: Store<AppState, AsyncAction<*, *>, *>
};
/**
 * Root-level component of the app. This is what is actually mounted to the page, and what everything else lives inside
 */
export default class AppRoot extends React.Component<AppRootProps, AppRootState> {
  constructor(props: AppRootProps, context: any) {
    super(props, context);

    const logger = createLogger({
      collapsed: true
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    this.state = {
      reducers,
      store: createStore(reducers.reduce, initialState, composeEnhancers(applyMiddleware(thunk, logger)))
    };

    if (module && module.hot && typeof module.hot.accept === 'function') {
      module.hot.accept('../reducers', () => {
        this.setState({
          reducers
        });
        this.state.store.replaceReducer(reducers.reduce);
      });
    }
  }
  render(): ?React.Node {
    return <Provider store={this.state.store} />;
  }
}
