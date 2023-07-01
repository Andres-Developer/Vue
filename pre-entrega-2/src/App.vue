<template>
  <div>
    <metainfo />
    <HeaderBar />
    <router-view />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import productsStore from './stores/productsStore';
import cartStore from './stores/cartStore';

export default {
  name: 'App',
  components: {
    HeaderBar
  },
  metaInfo() {
    return {
      title: this.cartStore.productCount ? `🍕 Pizzería (${this.cartStore.productCount})` : `🍕 Pizzería`
    };
  },
  data() {
    return {
      productsStore,
      cartStore,
    };
  },
  created() {
    this.productsStore.getProducts();
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
./utils/loadingTools