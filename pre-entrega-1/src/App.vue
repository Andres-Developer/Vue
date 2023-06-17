<template>
  <div>
    <HeaderBar />
    <div class="container">
      <div class="h1">Disfruta de nuestras exquisitas Pizzas Artesanales</div>
    </div>
    <router-view :products="products" :productsInCart="productsInCart" @add-to-cart="addToCartClickHandler"
      @delete-to-cart="deleteToCartClickHandler" />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import products from './data/products.json';

export default {
  name: 'App',
  components: {
    HeaderBar
  },
  data() {
    return {
      products,
      productsInCart: [],
    };
  },
  methods: {
    addToCartClickHandler({ ...product }) {
      console.log('addToCartClickHandler:', this.productsInCart);
      const isSelected = this.productsInCart.some((Eproduct) => Eproduct.id === product.id);
      if (!isSelected) {
        this.productsInCart.push(product);
      }
    },
    deleteToCartClickHandler(id) {
      // console.log("deleteToCartClickHandler ID:", id);
      const index = this.productsInCart.findIndex((Eproduct) => Eproduct.id === id);
      // console.log("deleteToCartClickHandler INDEX:", index);
      this.productsInCart.splice(index, 1);
      // console.log("Nuevo:", this.productsInCart);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
