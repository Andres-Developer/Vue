<template>
  <div>Contenido del carrito</div>
  <CartProductTable :productsInCart="productsInCart"/>
</template>

<script>
// import ComponentName from './ComponentName.vue'
import CartProductTable from '@/components/CartProductTable.vue';

export default {
  name: 'CartContent',
  components: {
    CartProductTable
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
