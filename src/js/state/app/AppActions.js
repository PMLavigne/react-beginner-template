// @flow

import type { Thunk } from '_state/state.types';
import { APP_SET_TITLE } from './AppActionTypes';
import type { AppTitleType } from './app.types';

export default class AppActions {
  static setTitle(title: ?AppTitleType): Thunk<?AppTitleType> {
    return dispatch => {
      return dispatch({
        type: APP_SET_TITLE,
        payload: title
      });
    };
  }
}
