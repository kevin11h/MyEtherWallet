<template>
  <div class="browser-body">
    <div class="control d-flex align-items-center p-3">
      <div class="dots d-flex align-items-center">
        <div class="red"></div>
        <div class="blue"></div>
        <div class="orange"></div>
      </div>
      <div class="address"></div>
    </div>
    <div class="page">
      <div class="bg-spaceman"></div>
      <div class="p-3 py-4 p-lg-5">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.browser-body {
  box-shadow: 15px 15px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 5px;
  background-color: white;
}

.control {
  background-color: #05c0a5;
}

.dots {
  > div {
    height: 12px;
    width: 12px;
    border-radius: 100%;
    margin-right: 7px;
  }
}

.address {
  $address-size: 20px;
  background-color: white;
  height: $address-size;
  width: 100%;
  position: relative;
  margin: 0 10px 0 50px;

  &::before {
    content: '';
    position: absolute;
    left: -$address-size / 2;
    top: 0;
    background-color: white;
    height: $address-size;
    width: $address-size;
    border-radius: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    right: -$address-size / 2;
    top: 0;
    background-color: white;
    height: $address-size;
    width: $address-size;
    border-radius: 100%;
  }
}
.page {
  position: relative;
  z-index: 1;
  .bg-spaceman {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
    background-image: url(~@/assets/images/home/spaceman.png);
    background-repeat: no-repeat;
    background-position: top 70px left -110px;
    opacity: 0.15;
  }
}

.white {
  background-color: white;
}

.red {
  background-color: #40ffdb;
}

.blue {
  background-color: #40ffdb;
}

.orange {
  background-color: #40ffdb;
}
</style>
