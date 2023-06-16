<template>
  <div class="container-fluid">
    <div class="d-flex flex-wrap">
      <b-card v-for="product in products" :key="product.id" :title="product.title" :img-src="product.image" img-alt="Image"
        img-top tag="article" class="m-2" style="width: 18rem; min-width: 18rem; height: 35rem;">
        <b-card-text>
          {{ product.description }}
        </b-card-text>
        <div class="h4"> $ {{ product.price }}</div>
        <b-button href="#" variant="danger"> 
          <div class="d-flex justify-content-center align-items-center gap-2">
            <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
            <div class="fs-5">Agregar al carrito</div>
          </div>
        </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import products from '../data/products.json';

export default {
  name: 'HomePage',
  components: {
    // ComponentName
  },
  props: {
    // someProp: String
  },
  data() {
    return {
      products
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
