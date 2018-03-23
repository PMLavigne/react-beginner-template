// @flow

import type { ActionType } from '_state/ActionTypes';

export type Action<PayloadType = *> = {
  type: ActionType,
  payload?: PayloadType
};

export type DispatchFn<PayloadType = *> = (action: Action<PayloadType>) => Promise<PayloadType>;
export type GetStateFn<StateType> = () => StateType;
export type ReducerFn<StateType, PayloadType = *> = (state: StateType, action: Action<PayloadType>) => StateType;
