const { createApp } = Vue;

const app = Vue.createApp({
  data() {
    return {
      contador: 0,
    };
  },
  methods: {
    suma() {
      this.contador++;
    },
    resta() {
      this.contador--;
    }
  },  
}).mount('#app');