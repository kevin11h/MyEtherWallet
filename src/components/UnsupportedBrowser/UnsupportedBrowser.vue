<template>
  <div class="light-gray">
    <div class="container py-5">
      <browser>
        <header class="d-flex align-items-center justify-content-between">
          <img
            class="mew-logo"
            src="@/assets/images/short-hand-logo-web.png"
            alt="MEW"
          />
          <div>Help</div>
        </header>
        <div class="text-center text-content">
          <div class="text title mb-3">Unsupported browser</div>
          <div class="text subtitle">
            You are using old browser that we no longer support. Upgrade your
            browser by clicking following links.
          </div>
        </div>
        <b-row class="browsers">
          <b-col>
            <img src="" alt="Google Chrome" />
          </b-col>
          <b-col>
            <img src="" alt="Mozilla Firefox" />
          </b-col>
          <b-col>
            <img src="" alt="Opera" />
          </b-col>
        </b-row>
      </browser>
    </div>
  </div>
</template>

<script>
import Browser from './Browser';
export default {
  components: {
    Browser
  },
  data() {
    return {};
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
  height: 100vh;
}

.light-gray {
  background-color: rgba(0, 0, 0, 0.05);
}

.text-content {
  margin-top: 70px;
}

.text {
  color: rgba(0, 0, 0, 0.75);
}

.title {
  font-size: 40px;
  font-weight: 700;
}

.subtitle {
  max-width: 500px;
  margin: 0 auto;
}
</style>
