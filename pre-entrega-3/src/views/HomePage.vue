<template>
  <div class="container">
    <div class="h1 mt-5 mb-5">Disfruta de nuestras exquisitas Pizzas Artesanales</div>
  </div>
  <div v-if="!this.loading" class="container-fluid">
    <div class="d-flex flex-wrap justify-content-center">
      <CardItem v-for="product in this.products" :key="product.id" :product="product" />
    </div>
  </div>
  <div v-else class="custom-height container d-flex justify-content-center align-items-center">
    <div class="h5 mt-5 pt-5">Loading...</div>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem.vue';
import { mapActions, mapGetters } from 'vuex';
// import productsStore from '@/stores/productsStore';

export default {
  name: 'HomePage',
  emits: [],
  components: {
    CardItem
  },
  props: {
  },
  data() {
    return {
      // productsStore
    };
  },
  created() {
    // this.productsStore.getProductsFromAPI();
    this.getProductsFromAPI();
  },
  mounted() {
  },
  methods: {
    ...mapActions('productsModule', ['getProductsFromAPI']),
  },
  computed: {
    ...mapGetters('productsModule', ['getLoading', 'getProducts']),
    loading() {
      return this.getLoading;
    },
    products() {
      return this.getProducts;
    }
  },
};
</script>

<style scoped></style>
