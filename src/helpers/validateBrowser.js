import Bowser from 'bowser';

const browser = Bowser.getParser(window.navigator.userAgent);
const isSupportedBrowser = browser.satisfies({
  // declare browsers per OS
  windows: {
    // (TESTED) No IE works
    'internet explorer': '>=999.0.0'
  },
  macos: {
    // (TESTED)
    safari: '>=14.0.1'
  },

  // per platform (mobile, desktop or tablet)
  /*
  mobile: {
    safari: '>=9',
    chrome: '>=87.0.4280.141'
  },
  */

  // or in general

  // (TESTED)
  chrome: '>=30',

  // (TESTED)
  firefox: '>=31',

  // (TESTED)
  opera: '>=55',

  // (TESTED)
  edge: '>=80.0.361.57'
});

const browserInfo = browser.getBrowser();

export { isSupportedBrowser, browserInfo };
