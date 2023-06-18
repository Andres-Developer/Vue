<template>
  <div>
    <metainfo />
    <HeaderBar :count="productCount" />
    <div class="container">
      <div class="h1">Disfruta de nuestras exquisitas Pizzas Artesanales</div>
    </div>
    <router-view :products="products" :productsInCart="productsInCart" :productCount="productCount"
      @add-to-cart="addToCartClickHandler" @delete-to-cart="deleteToCartClickHandler" />
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
  metaInfo() {
    return {
      title: this.productCount ? `🍕 Pizzería (${this.productCount})` : `🍕 Pizzería`
    };
  },
  data() {
    return {
      products,
      productsInCart: [],
      productCount: 0,
    };
  },

  methods: {
    addToCartClickHandler({ ...product }) {
      console.log('addToCartClickHandler:', this.productsInCart);
      const isSelected = this.productsInCart.some((Eproduct) => Eproduct.id === product.id);
      if (!isSelected) {
        const { id, title, image, price } = product;
        this.productsInCart.push({ id, title, price, image, quantity: 1 });
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
  watch: {
    productsInCart: {
      handler() {
        this.productCount = this.productsInCart.length;
      },
      deep: true,
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

body {
  overflow-y: scroll;
}
</style>
