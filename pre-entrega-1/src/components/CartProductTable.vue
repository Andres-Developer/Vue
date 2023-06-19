<template>
  <b-table-simple responsive class="container table-width ">
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
        <b-th sticky-column class="d-flex justify-content-start gap-2 align-items-center">
          <img :src="product.image" alt="pizza" width="60">
          {{ product.title }}
        </b-th>
        <b-td>$ {{ product.price }}</b-td>
        <b-td>
          <b-button @click="substractProductQuantityHandleClick(product.id)" variant="light">
            -
          </b-button>
          {{ product.quantity }}
          <b-button @click="addProductQuantityHandleClick(product.id)" variant="light">
            +
          </b-button>
        </b-td>
        <b-td> $ {{ product.subtotal.toFixed(2) }}</b-td>
        <b-td>
          <b-button @click="deleteProductHandleClick(product.id)" variant="light">
            🗑️
          </b-button>
        </b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr variant="light">
        <b-th colspan="3" class="text-end">Total: </b-th>
        <b-th>$ {{ this.grandTotal.toFixed(2) }}</b-th>
        <b-th></b-th>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
</template>

<script>

export default {
  name: 'CartProductTable',
  emits: ['add-product-quantity', 'substract-product-quantity', 'delete-to-cart'],
  components: {
  },
  props: {
    product: Object,
    productsInCart: Array,
    grandTotal: Number,
  },
  data() {
    return {
    };
  },

  methods: {
    addProductQuantityHandleClick(id) {
      this.$emit('add-product-quantity', id);
    },
    substractProductQuantityHandleClick(id) {
      this.$emit('substract-product-quantity', id);
    },
    deleteProductHandleClick(id) {
      this.$emit('delete-to-cart', id);
    },
  },
  computed: {

  },

};
</script>

<style scoped>
.table-width {
  min-width: 400px;
  max-width: 700px;
}
</style>
