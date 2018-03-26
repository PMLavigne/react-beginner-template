// @flow

import debug from 'debug';
import { REDUCERS_COLLECTION_SYMBOL } from '_state/constants';
import { Bind } from 'lodash-decorators/bind';
import Reducer from './Reducer';
import DefaultGlobalState from './DefaultGlobalState';
import type { ActionType } from './ActionTypes';
import type { GlobalState, Action, ReducerFnDescriptor } from './state.types';

const log = debug('ReducerManager');

export default class ReducerManager {
  _reducers: Map<ActionType, Array<ReducerFnDescriptor<>>>;

  static getReducerFuncMap(reducer: Reducer): ?Map<ActionType, Array<string>> {
    // $FlowFixMe
    return reducer[REDUCERS_COLLECTION_SYMBOL];
  }

  static _processReducers(reducers: Array<Reducer>): Map<ActionType, Array<ReducerFnDescriptor<>>> {
    const reducerMap: Map<ActionType, Array<ReducerFnDescriptor<>>> = new Map();
    reducers.forEach(reducer => {
      const reducerFunctions: ?Map<ActionType, Array<string>> = ReducerManager.getReducerFuncMap(reducer);
      if (!reducerFunctions) {
        return;
      }
      reducerFunctions.forEach((value: Array<string>, actionType: ActionType) => {
        if (!value || !value.length) {
          return;
        }

        let typedReducerArray: ?Array<ReducerFnDescriptor<>> = reducerMap.get(actionType);

        value.forEach(curFuncName => {
          // $FlowFixMe
          const reducerFunc = reducer[curFuncName];
          if (!reducerFunc) {
            return;
          }
          if (!typedReducerArray) {
            typedReducerArray = [];
            reducerMap.set(actionType, typedReducerArray);
          }
          typedReducerArray.push({
            reducer,
            reducerFunc
          });
        });
      });
    });
    return reducerMap;
  }

  constructor(reducers: Array<Reducer>) {
    this._reducers = ReducerManager._processReducers(reducers);
  }

  @Bind()
  reduce(state: ?GlobalState, action: Action<*>): GlobalState {
    if (!state) {
      return DefaultGlobalState;
    }
    const reducerDescriptors = this._reducers.get(action.type);
    if (!reducerDescriptors || !reducerDescriptors.length) {
      return state;
    }
    let curState: GlobalState = state;
    reducerDescriptors.forEach(descriptor => {
      try {
        const stateSlice = curState[descriptor.reducer.sliceName];
        curState = {
          ...curState,
          [descriptor.reducer.sliceName]: descriptor.reducerFunc.apply(descriptor.reducer, [stateSlice, action])
        };
      } catch (err) {
        log(err);
      }
    });
    return curState;
  }
}
