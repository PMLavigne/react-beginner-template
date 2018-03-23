// @flow
/* global module */
/* eslint no-undef: ["error", { "typeof": true }] */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import debug from 'debug';

import AppRoot from './component/AppRoot';

// This is a simple logging library that writes to the browser console
const log = debug('Boot');

/**
 * Main entry point for the app. This is the file that is actually loaded in the browser's script tag, and should
 * bootstrap and start the main application code.
 */

function boot() {
  try {
    // Initialize the app here
    mount();

    // This initializes hot module reloading, which allows changes to be automatically propagated to the browser without
    // refreshing. It's only available in debug mode though, so make sure it actually exists before we try to use it
    if (module && module.hot && typeof module.hot.accept === 'function') {
      module.hot.accept('./components/AppRoot', mount);
    }
  } catch (err) {
    log(err);
  }
}

/**
 * Mount the root of the React application
 */
function mount() {
  const rootDomElement = document.getElementById('root');
  if (!rootDomElement) {
    throw new Error('Could not find the root HTML element to mount React to!');
  }
  // This mounts the root level of the React app to the actual DOM on the page, under the element with ID "root" which
  // we retrieved above as 'rootDomElement'
  ReactDOM.render(
    <AppContainer>
      <AppRoot />
    </AppContainer>,
    rootDomElement
  );
}

// This waits for the browser to finish loading, so we don't start the app prematurely
window.addEventListener('load', boot);
