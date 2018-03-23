// @flow

import { REDUCERS_COLLECTION_SYMBOL } from '_state/base/constants';
import type { Action } from '_state/state.types';

export default class Reducer<StateType: Object> {
  reduce(state: StateType, action: Action<*>) {
    // $FlowFixMe
    const reducerMap: Map<ActionType, Function> = this[REDUCERS_COLLECTION_SYMBOL];
    if (reducerMap) {
      const reducerFunc = reducerMap.get(action.type);
      if (reducerFunc) {
        reducerFunc.apply(this, [state, action]);
      }
    }
  }
}
