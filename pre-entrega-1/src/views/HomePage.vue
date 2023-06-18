<template>
  <div class="container-fluid">
    <div class="d-flex flex-wrap">
      <CardItem v-for="product in products" :key="product.id" :product="product" :productsInCart="productsInCart" @add-to-cart="addToCartClickHandler"
        @delete-to-cart="deleteToCartClickHandler" />
    </div>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem.vue';

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
    deleteToCartClickHandler(id) {
      this.$emit('delete-to-cart', id);
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
