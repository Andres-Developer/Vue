<template>
<div>Contenido del carrito</div>
</template>

<script>
// import ComponentName from './ComponentName.vue'

export default {
name: 'CartContent',
  components: {
    // ComponentName
  },
  props: {
    productCount: Number,
  },
  metaInfo() {
    return {
      title: this.productCount ? `🛒 Tu compra  (${this.productCount})` : `🛒 Tu compra`
    };
  },
  data() { 
   return {
   }
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

<style scoped>

</style>
