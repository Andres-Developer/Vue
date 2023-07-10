<template>
  <div class="h1 mt-5 mb-5">Contenido del carrito</div>
  <div v-if="!this.loading" class="container d-flex flex-column justify-content-center table-width">
    <CartProductTable />
    <div class="d-flex mt-5 mb-5 justify-content-center gap-5">
      <b-button variant="secondary" to="/" class="btn-chip">Seguir comprando</b-button>
      <b-button variant="primary" @click="handleCheckoutClick" :disabled="this.productsInCart.length === 0 ? true : false"
        class="btn-chip">Generar orden</b-button>
    </div>
  </div>
  <div v-else class="h5 mt-5 pt-5">Loading...</div>
</template>

<script>
// import cartStore from '@/stores/cartStore';
// import userStore from '@/stores/userStore';
import CartProductTable from '@/components/CartProductTable.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CartContent',
  emits: [],
  components: {
    CartProductTable
  },
  props: {
  },
  metaInfo() {
    return {
      title: this.productCount ? `🛒 Tu compra  (${this.productCount})` : `🛒 Tu compra`
    };
  },
  data() {
    return {
      // cartStore,
      // userStore,
      // loading: false,
    };
  },

  methods: {
    ...mapActions('cartModule', ['clearCart']),
    ...mapActions('userModule', ['addOrder']),

    async handleCheckoutClick() {
      //   if (!this.userStore.user) {
      //     if (confirm('Debes iniciar sesión para poder realizar la compra')) {
      //       this.$router.push({ name: 'login-user' });
      //       return;
      //     }
      //   } else {
      //     this.loading = true;
      //     await this.userStore.addOrder();
      //     this.loading = false;
      //     // this.cartStore.clearCart();
      //     this.clearCart();
      //     this.$router.push({ name: userStore.user.isAdmin ? 'self-orders' : 'client' });
      //   }
      // },
      if (!this.user) {
        if (confirm('Debes iniciar sesión para poder realizar la compra')) {
          this.$router.push({ name: 'login-user' });
          return;
        }
      } else {
        await this.addOrder();
        this.clearCart();
        this.$router.push({ name: this.user.isAdmin ? 'self-orders' : 'client' });
      }
    },
  },
  computed: {
    ...mapGetters('cartModule', ['getProductCount', 'getProductsInCart']),
    ...mapGetters('userModule', ['getUser', 'getLoading']),
    user() {
      return this.getUser;
    },
    loading() {
      return this.getLoading;
    },
    productCount() {
      return this.getProductCount;
    },
    productsInCart() {
      return this.getProductsInCart;
    }

  },
};
</script>

<style scoped></style>
