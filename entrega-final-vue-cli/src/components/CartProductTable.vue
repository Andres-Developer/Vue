<template>
  <b-table-simple class="table-mod">
    <b-thead>
      <b-tr variant="light">
        <b-th>id</b-th>
        <b-th>Producto</b-th>
        <b-th v-if="!this.isReadyForCheckout">Stock</b-th>
        <b-th>Precio</b-th>
        <b-th>Cantidad</b-th>
        <b-th>Total</b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="product in this.productsInCart" :key="product.id" class="align-middle">
        <b-td> {{ product.id }}</b-td>
        <b-td sticky-column class="d-flex justify-content-start gap-2 align-items-center">
          <router-link :to="{ name: 'product-detail-id', params: { id: product.id } }">
            <img :src="product.image + '/?random=' + product.id" alt="pizza">
            {{ product.title }}
          </router-link>
        </b-td>
        <b-td v-if="!this.isReadyForCheckout"> {{ product.stock }}</b-td>

        <b-td>$ {{ product.price }}</b-td>
        <b-td>
          <b-button v-if="!this.isReadyForCheckout" @click="subtractProductQuantityHandleClick(product.id)"
            variant="light">
            -
          </b-button>
          {{ product.quantity }}
          <b-button v-if="!this.isReadyForCheckout" @click="addProductQuantityHandleClick(product.id)" variant="light">
            +
          </b-button>
        </b-td>
        <b-td> $ {{ product.subtotal.toFixed(2) }}</b-td>
        <b-td>
          <b-button v-if="!this.isReadyForCheckout" @click="deleteProductHandleClick(product.id)" variant="light">
            🗑️
          </b-button>
        </b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr variant="light">
        <b-th colspan="3" class="text-end">Total: </b-th>
        <b-th></b-th>
        <b-th v-if="!this.isReadyForCheckout"></b-th>
        <b-th>$ {{ this.grandTotal.toFixed(2) }}</b-th>
        <b-th></b-th>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CartProductTable',
  emits: [],
  components: {
  },
  props: {
    product: Object,
  },
  data() {
    return {
    };
  },

  methods: {
    ...mapActions('cartModule', ['addProductQuantity', 'subtractProductQuantity', 'deleteProductFromCart']),

    addProductQuantityHandleClick(id) {
      this.addProductQuantity(id);
    },
    subtractProductQuantityHandleClick(id) {
      this.subtractProductQuantity(id);
    },
    deleteProductHandleClick(id) {
      if (window.confirm("¿Estás seguro de eliminar este producto del carrito?")
      ) {
        this.deleteProductFromCart(id);
      }
    },
  },
  computed: {
    ...mapGetters('cartModule', ['getGrandTotal', 'getProductsInCart', 'getIsReadyForCheckout']),
    productsInCart() {
      return this.getProductsInCart;
    },
    isReadyForCheckout() {
      return this.getIsReadyForCheckout;
    },
    grandTotal() {
      return this.getGrandTotal;
    },
  },

};
</script>

<style scoped>

.table-mod{
  height: 0px !important;
}

tr {
  height: 62.5px !important;
}

tr td {
  height: 62.5px;
}

td img {
  max-height: 62.5px !important;
  width: 60px;
}

a {
  text-decoration: none;
}

a:link {
  color: black
}

a:visited {
  color: black;
}
</style>
