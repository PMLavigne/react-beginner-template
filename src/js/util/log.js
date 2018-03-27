// @flow

import debug from 'debug';

const LOG_PREFIX: string = 'react-beginner-template';

export default function getLogger(namespace: string) {
  return debug(`${LOG_PREFIX}:${namespace}`);
}
