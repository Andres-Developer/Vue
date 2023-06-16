<template>
  <div>
    <HeaderBar />
    <div class="container">
      <div class="h1">Disfruta de nuestras exquisitas Pizzas Artesanales</div>
    </div>
    <router-view />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';

export default {
  name: 'App',
  components: {
    HeaderBar
  }
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
