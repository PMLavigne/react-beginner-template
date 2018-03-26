// @flow

import * as AppActionTypes from './app/AppActionTypes';

const ActionTypes = {
  ...AppActionTypes
};

export type ActionType = $Values<typeof AppActionTypes>;

export default ActionTypes;
