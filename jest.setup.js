// jest.setup.js
import 'mockzilla-webextension/setup';

Object.assign(global, require('jest-chrome'))

import { mockBrowser } from 'mockzilla-webextension';

global.chrome = mockBrowser.chrome;
global.browser = mockBrowser.browser;