<template>
  <div class="h1 mt-5 mb-5">Contenido del carrito</div>
  <div class="container">
    <CartProductTable :productsInCart="productsInCart" :grandTotal="grandTotal" @delete-to-cart="deleteToCartClickHandler"
      @add-product-quantity="addProductQuantityHandleClick"
      @substract-product-quantity="substractProductQuantityHandleClick" />
    <div class="d-flex mt-5 justify-content-center gap-5">
      <b-button variant="secondary" to="/">volver</b-button>
      <b-button variant="primary" to="/checkout" disabled>ir a pagar</b-button>
    </div>
  </div>
</template>

<script>
import CartProductTable from '@/components/CartProductTable.vue';

export default {
  name: 'CartContent',
  emits: ['add-product-quantity', 'substract-product-quantity', 'delete-to-cart'],
  components: {
    CartProductTable
  },
  props: {
    productCount: Number,
    grandTotal: Number,
    productsInCart: Array,
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
    deleteToCartClickHandler(id) {
      if (window.confirm("¿Estás seguro de eliminar este producto del carrito?")
      ) {
        this.$emit('delete-to-cart', id);
      }
    },
    addProductQuantityHandleClick(id) {
      this.$emit('add-product-quantity', id);
    },
    substractProductQuantityHandleClick(id) {
      this.$emit('substract-product-quantity', id);
    },
  },
  computed: {
  },
};
</script>

<style scoped></style>
