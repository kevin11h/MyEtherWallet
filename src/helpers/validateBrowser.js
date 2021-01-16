import Bowser from 'bowser';

const browser = Bowser.getParser(window.navigator.userAgent);
const isSupportedBrowser = browser.satisfies({
  // declare browsers per OS
  windows: {
    'internet explorer': '>=80.8.361'
  },
  macos: {
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
  chrome: '>80.0.0',
  firefox: '>31',
  opera: '>=22',
  edge: '>=80.0.361.62'
});

const browserInfo = browser.getBrowser();

export { isSupportedBrowser, browserInfo };
