// @flow

import { REDUCERS_COLLECTION_SYMBOL } from './constants';
import type { ActionType } from './ActionTypes';
import type { PropertyDescriptor } from './base.types';

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
    const existing = target[REDUCERS_COLLECTION_SYMBOL].get(actionType);
    if (!existing) {
      target[REDUCERS_COLLECTION_SYMBOL].set(actionType, [key]);
    } else {
      existing.push(key);
    }
    return descriptor;
  };
}
