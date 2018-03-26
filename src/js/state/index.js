// @flow

import ReducerManager from '_state/ReducerManager';
import { appReducer } from './app';

const reducers = [appReducer];

const reducerManager = new ReducerManager(reducers);

export { reducers, reducerManager };
