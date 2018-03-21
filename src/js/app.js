// @flow

import debug from 'debug';

// This is a simple logging library that writes to the browser console
const log = debug('Boot');

/**
 * Main entry point for the app. This is the file that is actually loaded in the browser's script tag, and should
 * bootstrap and start the main application code.
 */

function boot() {
  try {
    // Initialize the app here
  } catch (err) {
    log(err);
  }
}

// This waits for the browser to finish loading, so we don't start the app prematurely
window.addEventListener('load', boot);
