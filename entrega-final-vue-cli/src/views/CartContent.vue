<template>
  <div class="h1 mt-5 mb-5">Contenido del carrito</div>
  <div v-if="!this.loading" class="container d-flex flex-column justify-content-center table-width">
    <CartProductTable />
    <div class="d-flex mt-5 mb-5 justify-content-center gap-5">
      <b-button variant="secondary" to="/" class="btn-chip">Seguir comprando</b-button>
      <b-button v-if="this.isReadyForCheckout" variant="primary" @click="handleModifyCartClick"
        class="btn-chip">Modificar carrito</b-button>
      <b-button v-else variant="success" @click="handleCheckoutClick" :disabled="this.productsInCart.length === 0 ? true : false"
        class="btn-chip">Confirmar carrito</b-button>
    </div>
  </div>
  <div v-else class="h5 mt-5 pt-5">Loading...</div>
</template>

<script>
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
    };
  },

  methods: {
    ...mapActions('cartModule', ['clearCart', 'setIsReadyForCheckout']),
    ...mapActions('userModule', ['addOrder']),

    handleModifyCartClick(){
      this.setIsReadyForCheckout(false);      
    },

    async handleCheckoutClick() {
      if (!this.user) {
        if (confirm('Debes iniciar sesión para poder realizar la compra')) {
          this.$router.push({ name: 'login-user' });
          return;
        }
      } else {
        // await this.addOrder();
        // this.clearCart();
        // this.$router.push({ name: this.user.isAdmin ? 'self-orders' : 'client' });

        this.setIsReadyForCheckout(true); // this is a flag to show the checkout form
        this.$router.push({ name: 'cart-checkout' });
      }
    },
  },
  computed: {
    ...mapGetters('cartModule', ['getProductCount', 'getProductsInCart', 'getIsReadyForCheckout']),
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
    },
    isReadyForCheckout() {
      return this.getIsReadyForCheckout;
    },
  },
};
</script>

<style scoped></style>
