<template>
  <div class="container-fluid">
    <div class="d-flex flex-wrap">
      <CardItem :products="products" :productsInCart="productsInCart" @add-to-cart="addToCartClickHandler"/>
    </div>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem.vue';
import products from '../data/products.json';

export default {
  name: 'HomePage',
  components: {
    CardItem
},
  props: {
    // someProp: String
  },
  data() {
    return {
      products,
      productsInCart: [],
    };
  },

  methods: {
    addToCartClickHandler({...product}) {
      console.log('addToCartClickHandler:', this.productsInCart);
      this.productsInCart.push(product);
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
