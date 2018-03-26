// @flow

import { ForAction } from '_state/decorators';
import Reducer from '_state/Reducer';
import type { Action } from '_state/state.types';
import { APP_SET_TITLE } from './AppActionTypes';
import type { AppState, AppTitleType } from './app.types';

export default class AppReducer extends Reducer {
  constructor() {
    super('app');
  }

  @ForAction(APP_SET_TITLE)
  setTitle(state: AppState, action: Action<AppTitleType>): AppState {
    return {
      ...state,
      title: action.payload
    };
  }
}
