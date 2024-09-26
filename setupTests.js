// setupTests.js
import fetch from 'node-fetch';
require('jest-fetch-mock').enableMocks();

global.fetch = fetch;