// @flow
/**
 * A shim to allow Flow to recognize hot module reloading calls
 * From https://github.com/flowtype/flow-typed/issues/165
 */
declare var module: {
  hot?: {
    accept(path: string, callback: () => void): void;
  };
};
