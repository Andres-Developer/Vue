<template>
  <div>
    <!-- <img :src="this.product.image" alt="pizza" width="60"> -
    {{ this.product.title }} -
    $ {{ this.product.price }} -
    {{ this.product.quantity }} -->
  </div>
  <b-table-simple responsive>
    <b-thead>
      <b-tr variant="light">
        <b-th>Producto</b-th>
        <b-th>Precio</b-th>
        <b-th>Cantidad</b-th>
        <b-th>Total</b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="product in productsInCart" :key="product.id">
        <b-th sticky-column>
          <img :src="product.image" alt="pizza" width="60">
          {{ product.title }}
        </b-th>
        <b-td>$ {{ product.price }}</b-td>
        <b-td>
          <b-button variant="light">
            -
          </b-button>          
          {{ product.quantity }}
          <b-button variant="light">
            +
          </b-button>    
        </b-td>
        <b-td>total</b-td>
        <b-td>
          <b-button variant="light">
            🗑️
          </b-button>
        </b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr variant="light">
        <b-th>Total: </b-th>
        <b-th colspan="2"></b-th>
        <b-th>$ Total</b-th>
        <b-th></b-th>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
</template>

<script>
// import ComponentName from './ComponentName.vue'

export default {
  name: 'CartProductTable',
  components: {
    // ComponentName
  },
  props: {
    product: Object,
    productsInCart: Array,
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
