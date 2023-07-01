<template>
  <div class="h1 mt-5 mb-5">Contenido del carrito</div>
  <div class="container">
    <CartProductTable />
    <div class="d-flex mt-5 justify-content-center gap-5">
      <b-button variant="secondary" to="/">Seguir comprando</b-button>
      <b-button variant="primary" to="/checkout" disabled>ir a pagar</b-button>
    </div>
  </div>
</template>

<script>
import cartStore from '@/stores/cartStore';
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
    };
  },

  methods: {
  },
  computed: {
  },
};
</script>

<style scoped></style>
