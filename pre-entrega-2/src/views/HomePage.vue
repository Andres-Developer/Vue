<template>
  <div class="container">
    <div class="h1 mt-5 mb-5">Disfruta de nuestras exquisitas Pizzas Artesanales</div>
  </div>
  <div class="container-fluid">
    <div class="d-flex flex-wrap justify-content-center">
      <CardItem v-for="product in products" :key="product.id" :product="product" :productsInCart="productsInCart"
        @add-to-cart="addToCartClickHandler" @delete-to-cart="deleteToCartClickHandler" />
    </div>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem.vue';

export default {
  name: 'HomePage',
  emits: ['add-to-cart', 'delete-to-cart'],
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
  },
};
</script>

<style scoped></style>
