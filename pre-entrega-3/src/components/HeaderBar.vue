<template>
  <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="warning">
    <div class="container d-flex">
      <b-navbar-brand to="/" class="fs-3 text-white fw-bold">Pizzería</b-navbar-brand>
      <b-navbar-nav class="ms-auto">
        <div class="container-login-register-cart gap-2 gap-sm-1 d-flex align-items-center ">
          <div v-if="!this.isUserAuthenticated" class="user-logged gap-2 gap-sm-1 d-flex align-items-center">
            <router-link :to="{ name: 'login-user' }" class="me-auto btn btn-success btn-chip">
              Login
            </router-link>
            <b-nav-item :to="{ name: 'register-user' }" class="me-auto">
              Registrarse
            </b-nav-item>
          </div>
          <div v-else class="gap-2 gap-sm-1 d-flex align-items-center justify-content-between ">
            <div v-if="this.user.isAdmin" class="gap-2 gap-sm-1 gap-md-3 d-flex align-items-center ">
              <div class="btn btn-primary btn-chip" @click="() => $router.push('/admin')">{{ 'Administrar' }}</div>
              <div class="btn btn-primary btn-chip" @click="() => $router.push('/admin/self-orders')">{{ 'Mis órdenes' }}
              </div>
              <img class="user-avatar" :src="this.user.avatar" alt="">
            </div>
            <div v-else class="gap-2 gap-sm-1 gap-md-3 d-flex align-items-center ">
              <div class="btn btn-primary btn-chip" @click="() => $router.push('/client')">{{ 'Mis órdenes' }}</div>
              <img class="user-avatar" :src="this.user.avatar" alt="">
            </div>
            <div type="button" class="btn btn-danger btn-chip" @click="userLogout">logout</div>
          </div>

          <b-nav-item :to="{ name: 'cart-content' }" class="me-auto">
            <img alt="cart" src="./../assets/cart-header.svg" width="35">
            <span v-if="this.productCount > 0"
              class="position-absolute top-3  translate-middle badge rounded-pill bg-danger">
              {{ this.productCount }}
            </span>
          </b-nav-item>
        </div>
      </b-navbar-nav>
    </div>
  </b-navbar>
  <div id="fixOffset"></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "HeaderBar",
  props: {
  },
  data() {
    return {
    };
  },
  created() {
    this.loadUserFromLocalStorage();
  },
  methods: {
    ...mapActions('userModule', ['loadUserFromLocalStorage', 'logoutUser']),

    goToAdmin() {
      this.$router.push({ name: 'admin' });
    },
    userLogout() {
      this.logoutUser();
      this.$router.push({ name: 'home' });
    },
  },
  computed: {
    ...mapGetters('cartModule', ['getProductCount']),
    ...mapGetters('userModule', ['getUser', 'getIsUserAuthenticate']),

    user() {
      return this.getUser;
    },
    isUserAuthenticated() {
      return this.getIsUserAuthenticate;
    },
    productCount() {
      return this.getProductCount;
    }
  }

};
</script>

<style scoped>
#fixOffset {
  height: 66px;
}

@media (min-width: 426px) {
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .btn-chip {
    padding: 0.3rem 1rem !important;
    border-radius: 3rem !important;
    height: 35px;
  }
}
</style>