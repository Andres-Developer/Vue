<template>
  <div>
    <metainfo />
    <HeaderBar :count="productCount" />
    <router-view :products="products" :productsInCart="productsInCart" :productCount="productCount" :grandTotal="grandTotal"
      @add-to-cart="addToCartClickHandler" @delete-to-cart="deleteToCartClickHandler"
      @add-product-quantity="addProductQuantityHandleClick"
      @substract-product-quantity="substractProductQuantityHandleClick" />
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
      grandTotal: 0,
    };
  },

  methods: {
    addToCartClickHandler({ ...product }) {
      console.log('addToCartClickHandler:', this.productsInCart);
      const isSelected = this.productsInCart.some((Eproduct) => Eproduct.id === product.id);
      if (!isSelected) {
        const { id, title, image, price } = product;
        const quantity = 1;
        const subtotal = price * quantity;
        this.productsInCart.push({ id, title, price, image, quantity, subtotal });
      }
    },
    deleteToCartClickHandler(id) {
      // console.log("deleteToCartClickHandler ID:", id);
      const index = this.productsInCart.findIndex((Eproduct) => Eproduct.id === id);
      // console.log("deleteToCartClickHandler INDEX:", index);
      this.productsInCart.splice(index, 1);
      // console.log("Nuevo:", this.productsInCart);
    },
    addProductQuantityHandleClick(id) {
      // console.log('addQuantity ID: ', id);
      const index = this.productsInCart.findIndex((Eproduct) => Eproduct.id === id);
      // console.log('addQuantity INDEX: ', index);
      this.productsInCart[index].quantity += 1;
      this.subtotalCalc(index);
    },
    substractProductQuantityHandleClick(id) {
      // console.log('substractQuantity ID: ', id);
      const index = this.productsInCart.findIndex((Eproduct) => Eproduct.id === id);
      // console.log('substractQuantity INDEX: ', index);
      if (this.productsInCart[index].quantity > 1) {
        this.productsInCart[index].quantity -= 1;
        this.subtotalCalc(index);
      }
    },
    subtotalCalc(index) {
      this.productsInCart[index].subtotal = this.productsInCart[index].price * this.productsInCart[index].quantity;
    },
  },
  computed: {
  },
  watch: {
    productsInCart: {
      handler() {
        this.productCount = this.productsInCart.reduce((acc, current) => {
          return acc + current.quantity;
        }, 0);
        this.grandTotal = this.productsInCart.reduce((acc, current) => {
          return acc + current.subtotal;
        }, 0);
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
