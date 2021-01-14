import Bowser from 'bowser';

const browser = Bowser.getParser(window.navigator.userAgent);

export default browser.satisfies({
  // declare browsers per OS
  windows: {
    'internet explorer': '>10'
  },
  macos: {
    safari: '>=14.0.1'
  },

  // per platform (mobile, desktop or tablet)
  mobile: {
    safari: '>=9',
    chrome: '>=87.0.4280.141'
  },

  // or in general
  chrome: '>20.1.1432',
  firefox: '>31',
  opera: '>=22'
});
