<template>
  <div class="h1 mt-5 mb-5">Contenido del carrito</div>
  <div class="container">
    <CartProductTable v-if="!loading" />
    <div v-else>LOADING...</div>
    <div class="d-flex mt-5 justify-content-center gap-5">
      <b-button variant="secondary" to="/">Seguir comprando</b-button>
      <b-button variant="primary" @click="handleCheckoutClick"
        :disabled="this.cartStore.productsInCart.length === 0 ? true : false">ir a pagar</b-button>
    </div>
  </div>
</template>

<script>
import cartStore from '@/stores/cartStore';
import userStore from '@/stores/userStore';
import CartProductTable from '@/components/CartProductTable.vue';


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
      title: this.cartStore.productCount ? `🛒 Tu compra  (${this.cartStore.productCount})` : `🛒 Tu compra`
    };
  },
  data() {
    return {
      cartStore,
      userStore,
      loading: false,
    };
  },

  methods: {
    async handleCheckoutClick() {
      if (!this.userStore.user) {
        if (confirm('Debes iniciar sesión para poder realizar la compra')) {
          this.$router.push({ name: 'login-user' });
          return;
        }
      } {
        this.loading = true;
        await this.userStore.addOrder();
        this.loading = false;
        this.cartStore.clearCart();
        this.$router.push({ name: 'client' });
      }
    },
  },
  computed: {
  },
};
</script>

<style scoped></style>
