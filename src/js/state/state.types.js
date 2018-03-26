// @flow

import Reducer from '_state/Reducer';
import type { ActionType } from './ActionTypes';
import type { AppState } from './app/app.types';

export type GlobalState = {
  app: AppState
};

export type StateSliceName = $Keys<GlobalState>;
export type StateSliceType = $Values<GlobalState>;

export type Action<PayloadType = *> = {
  type: ActionType,
  payload?: PayloadType
};

export type Thunk<PayloadType> = (dispatch: DispatchFn<PayloadType>, getState: GetStateFn) => Promise<?PayloadType>;

export type DispatchFn<PayloadType = *> = (action: Action<PayloadType>) => Promise<PayloadType>;
export type GetStateFn = () => GlobalState;

export type GlobalReducerFn<PayloadType = *> = (state: ?GlobalState, action: Action<PayloadType>) => GlobalState;
export type ReducerFn<SliceType: StateSliceType, PayloadType = *> = (
  state: SliceType,
  action: Action<PayloadType>
) => SliceType;

export type ReducerFnDescriptor<SliceType: StateSliceType = *, PayloadType = *> = {
  reducer: Reducer,
  reducerFunc: ReducerFn<SliceType, PayloadType>
};
