<template>
  <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="warning">
    <div class="container d-flex">
      <b-navbar-brand to="/" class="fs-3 text-white fw-bold">Pizzería</b-navbar-brand>
      <b-navbar-nav class="ms-auto">
        <div class="container-login-register-cart d-flex align-items-center">
          <b-nav-item :to="{ name: 'login-user' }" class="me-auto">
            Login
          </b-nav-item>
          <b-nav-item :to="{ name: 'register-user' }" class="me-auto">
            Registrarse
          </b-nav-item>
          <b-nav-item :to="{ name: 'cart-content' }" class="me-auto">
            <img alt="cart" src="./../assets/cart-header.svg" width="35">
            <span v-if="count > 0" class="position-absolute top-3  translate-middle badge rounded-pill bg-danger">
              {{ count }}
            </span>
          </b-nav-item>
        </div>
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

.container-login-register-cart {
  width: 190px;
}

@media (min-width: 426px) {
  .container-login-register-cart {
    width: 200px;
  }
}
</style>