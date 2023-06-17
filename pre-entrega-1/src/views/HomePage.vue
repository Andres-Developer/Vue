<template>
  <div class="container-fluid">
    <div class="d-flex flex-wrap">
      <CardItem :products="products" :productsInCart="productsInCart" @add-to-cart="addToCartClickHandler" />
    </div>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem.vue';
// import products from '../data/products.json';

export default {
  name: 'HomePage',
  components: {
    CardItem
  },
  props: {
    products: Array,
    productsInCart: Array,
  },
  data() {
    return {
    };
  },

  methods: {
    addToCartClickHandler({ ...product }) {
      this.$emit('add-to-cart', product);
    },    
  },
  computed: {
    /* someComputed() {
      return this.someData
    } */
  },

};
</script>

<style scoped></style>
