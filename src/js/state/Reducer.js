// @flow

import type { StateSliceName } from './state.types';

export default class Reducer {
  _sliceName: StateSliceName;

  constructor(sliceName: StateSliceName) {
    this._sliceName = sliceName;
  }

  get sliceName(): StateSliceName {
    return this._sliceName;
  }
}
