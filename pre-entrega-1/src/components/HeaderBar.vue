<template>
  <div class="bg-warning">
    <b-navbar class="container" toggleable="lg" type="dark" variant="warning">
      <b-navbar-brand to="/" href="#" class="fs-3 text-white fw-bold">Pizzería</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto">
          <b-nav-item :to="{ name: 'cart-content' }" href="#" class="me-auto">
            <img alt="cart" src="./../assets/cart-header.svg" width="35">
            <span v-if="count > 0" class="position-absolute top-3  translate-middle badge rounded-pill bg-danger">
              {{ count }}
            </span>
          </b-nav-item>
          <!-- <b-nav-item :to="{ name: 'post-id', params: { id: 1 } }" href="#" class="me-auto">Post numero 1</b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  props: {
    count: Number,
  },
};
</script>

<style scoped></style>