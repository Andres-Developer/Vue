<template>
  <div>
    {{ this.product.id }} -
    {{ this.product.title }} - 
    {{ this.product.price }} -
    {{ this.product.quantity }}
  </div>
</template>

<script>
// import ComponentName from './ComponentName.vue'

export default {
  name: 'CartProduct',
  components: {
    // ComponentName
  },
  props: {
    product: Object,
  },
  data() {
    return {
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
