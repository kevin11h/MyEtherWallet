<template>
  <div class="light-gray">
    <div class="container py-3 py-lg-5">
      <browser>
        <header class="d-flex align-items-center justify-content-between">
          <img
            class="mew-logo"
            src="@/assets/images/short-hand-logo-web.png"
            alt="MEW"
          />
          <a href="mailto:support@myetherwallet.com" target="_blank">
            <h6>Support | Help</h6>
          </a>
        </header>
        <div class="text-center text-content">
          <h3 class="text font-weight-bold">Uh oh... You are using</h3>
          <div class="d-none d-lg-block text title mb-3">
            Unsupported browser
          </div>
          <div class="d-block d-lg-none text title-m mb-3">
            Unsupported browser
          </div>
          <div class="text subtitle">
            You are using old browser that we no longer support. We officially
            support versions of the following browsers. If your browser isn’t in
            this list, it still may work, but with a <b>degraded experience</b>.
          </div>
        </div>
        <b-row class="browsers text-center mt-5">
          <b-col class="mb-5">
            <a href="https://www.google.com/chrome/" target="_blank">
              <img
                src="@/assets/images/icons/Browsers/Chrome.svg"
                alt="Google Chrome"
              />
              <h4 class="text mt-4">Google Chrome</h4>
              <div class="text supported-ver">Supported ver 10.0+</div>
            </a>
          </b-col>
          <b-col class="mb-5">
            <a
              href="https://www.mozilla.org/en-US/firefox/new/"
              target="_blank"
            >
              <img
                src="@/assets/images/icons/Browsers/Firefox.svg"
                alt="Mozilla Firefox"
              />
              <h4 class="text mt-4">Mozilla Firefox</h4>
              <div class="text supported-ver">Supported ver 10.0+</div>
            </a>
          </b-col>
          <b-col class="mb-5">
            <a href="https://www.opera.com/" target="_blank">
              <img src="@/assets/images/icons/Browsers/Opera.svg" alt="Opera" />
              <h4 class="text mt-4">Opera</h4>
              <div class="text supported-ver">Supported ver 10.0+</div>
            </a>
          </b-col>
          <b-col class="mb-5">
            <a href="https://www.apple.com/safari/" target="_blank">
              <img
                src="@/assets/images/icons/Browsers/Safari.svg"
                alt="Opera"
              />
              <h4 class="text mt-4">Apple Safari</h4>
              <div class="text supported-ver">Supported ver 14.0.1+</div>
            </a>
          </b-col>
        </b-row>

        <h6 class="light-gray-text text-center">
          You are using {{ browserName }} {{ browserVersion }}
        </h6>
      </browser>
    </div>
  </div>
</template>

<script>
import Browser from './Browser';
import { browserInfo } from '@/helpers/validateBrowser';

export default {
  components: {
    Browser
  },
  data() {
    return {
      browserName: browserInfo.name,
      browserVersion: browserInfo.version
    };
  }
};
</script>

<style lang="scss" scoped>
header {
  .mew-logo {
    height: 20px;
  }
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
}

.light-gray {
  background-color: rgba(0, 0, 0, 0.05);
}

.light-gray-text {
  color: rgba(0, 0, 0, 0.2);
}

.text-content {
  margin-top: 70px;
}

.text {
  color: rgba(0, 0, 0, 0.7);
}

.title {
  font-size: 40px;
  font-weight: 700;
}

.title-m {
  font-size: 30px;
  line-height: 40px;
  font-weight: 700;
}

.subtitle {
  max-width: 500px;
  margin: 0 auto;
}

.browsers {
  padding-bottom: 100px;

  img {
    height: 150px;
  }
}

.supported-ver {
  font-size: 12px;
}

h6 {
  font-size: 12px;
  font-weight: 600;
}
</style>
