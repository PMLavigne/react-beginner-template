// @flow

import AppActions from './AppActions';
import AppReducer from './AppReducer';
import type { AppState } from './app.types';

const DefaultAppState: AppState = {
  title: null
};

const appReducer: AppReducer = new AppReducer();

export { DefaultAppState, AppActions, AppReducer, appReducer };
