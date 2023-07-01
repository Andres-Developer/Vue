<template>
  <div class="container">
    <div class="h1 mt-5 mb-5">Disfruta de nuestras exquisitas Pizzas Artesanales</div>
  </div>
  <div v-if="!productsStore.loading" class="container-fluid">
    <div class="d-flex flex-wrap justify-content-center">
      <CardItem v-for="product in this.productsStore.products" :key="product.id" :product="product" />
    </div>
  </div>
  <div v-else>LOADING...</div>
</template>

<script>
import CardItem from '@/components/CardItem.vue';
import productsStore from '@/stores/productsStore';

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
      productsStore
    };
  },
  created() {
    this.productsStore.getProducts();
  },
  mounted() {
  },
  methods: {
  },
  computed: {
  },
};
</script>

<style scoped></style>
