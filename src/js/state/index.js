// @flow

import ReducerManager from '_state/ReducerManager';
import { appReducerInstance } from './app';

const reducers = [appReducerInstance];

const reducerManager = new ReducerManager(reducers);

export { reducers, reducerManager };
