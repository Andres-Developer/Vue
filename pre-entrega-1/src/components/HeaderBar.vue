<template>
  <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="warning">
    <div class="container d-flex">
      <b-navbar-brand to="/" href="#" class="fs-3 text-white fw-bold">Pizzería</b-navbar-brand>
      <b-navbar-nav class="ms-auto">
        <b-nav-item :to="{ name: 'cart-content' }" href="#" class="me-auto">
          <img alt="cart" src="./../assets/cart-header.svg" width="35">
          <span v-if="count > 0" class="position-absolute top-3  translate-middle badge rounded-pill bg-danger">
            {{ count }}
          </span>
        </b-nav-item>
      </b-navbar-nav>
    </div>
  </b-navbar>
  <div id="fixOffset"></div>
</template>

<script>
export default {
  name: "HeaderBar",
  props: {
    count: Number,
  },
};
</script>

<style scoped>
#fixOffset {
  height: 66px;
}
</style>