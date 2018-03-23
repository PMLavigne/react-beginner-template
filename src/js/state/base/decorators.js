// @flow

import { REDUCERS_COLLECTION_SYMBOL } from '_state/base/constants';
import type { ActionType } from '_state/ActionTypes';
import type { PropertyDescriptor } from '_state/base/base.types';

export function ForAction(actionType: ActionType) {
  return (target: Class<*>, key: string, descriptor: PropertyDescriptor) => {
    if (!target[REDUCERS_COLLECTION_SYMBOL]) {
      Object.defineProperty(target, REDUCERS_COLLECTION_SYMBOL, {
        value: new Map(),
        writable: false,
        enumerable: false,
        configurable: true
      });
    }
    target[REDUCERS_COLLECTION_SYMBOL].set(actionType, key);
    return descriptor;
  };
}
