<template>
  <div>
    <metainfo />
    <HeaderBar />
    <router-view />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';

import { mapGetters } from 'vuex';

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
    };
  },
  created() {
  },
  computed: {
    ...mapGetters('cartModule', ['getProductCount']),
    productCount() {
      return this.getProductCount;
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

.custom-height {
  height: calc(100vh - 66px)
}

.btn-chip {
  padding: 0.3rem 1rem !important;
  border-radius: 3rem !important;
  height: 35px;
}

.table-width {
  max-width: 900px !important;
}

.user-avatar {
  border-radius: 50%
}


</style>
