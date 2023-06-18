<template>
  <div>Contenido del carrito</div>
  <CartProduct v-for="product in productsInCart" :key="product.id" :product="product" />
</template>

<script>
// import ComponentName from './ComponentName.vue'
import CartProduct from '@/components/CartProduct.vue';

export default {
  name: 'CartContent',
  components: {
    CartProduct
  },
  props: {
    productCount: Number,
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
    /* someMethod() {
      this.someData
    } */
  },
  computed: {
    /* someComputed() {
      return this.someData
    } */
  },

};
</script>

<style scoped></style>
