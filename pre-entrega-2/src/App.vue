<template>
  <div>
    <metainfo />
    <HeaderBar />
    <router-view />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
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
      cartStore,
    };
  },
  created() {
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

.btn-chip {
  padding: 0.3rem 1rem !important;
  border-radius: 3rem !important;
  height: 35px;
}
.table-width {
  max-width: 900px !important;
}

.user-avatar{
  border-radius:50%
}
</style>
