// @flow

import * as AppActionTypes from './app/AppActionTypes';

const ActionTypes = {
  ...AppActionTypes
};

export type ActionType = $Keys<typeof ActionTypes>;

export default ActionTypes;
