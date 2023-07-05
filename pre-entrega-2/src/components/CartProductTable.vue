<template>
  <b-table-simple>
    <b-thead>
      <b-tr variant="light">
        <b-th>id</b-th>
        <b-th>Producto</b-th>
        <b-th>Stock</b-th>
        <b-th>Precio</b-th>
        <b-th>Cantidad</b-th>
        <b-th>Total</b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="product in productsInCart" :key="product.id" class="align-middle">
        <b-td> {{ product.id }}</b-td>
        <b-td sticky-column class="d-flex justify-content-start gap-2 align-items-center">
          <router-link :to="{ name: 'product-detail-id', params: { id: product.id } }">
            <img :src="product.image + '/?random=' + product.id" alt="pizza">
            {{ product.title }}
          </router-link>
        </b-td>
        <b-td> {{ product.stock }}</b-td>

        <b-td>$ {{ product.price }}</b-td>
        <b-td>
          <b-button @click="subtractProductQuantityHandleClick(product.id)" variant="light">
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
        <b-th></b-th>
        <b-th></b-th>
        <b-th>$ {{ this.cartStore.grandTotal.toFixed(2) }}</b-th>
        <b-th></b-th>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
</template>

<script>
import cartStore from '@/stores/cartStore';

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
      cartStore,
      productsInCart: cartStore.productsInCart,
    };
  },

  methods: {
    addProductQuantityHandleClick(id) {
      this.cartStore.addProductQuantity(id);
    },
    subtractProductQuantityHandleClick(id) {
      this.cartStore.subtractProductQuantity(id);
    },
    deleteProductHandleClick(id) {
      if (window.confirm("¿Estás seguro de eliminar este producto del carrito?")
      ) {
        this.cartStore.deleteProductFromCart(id);
      }
    },
  },
  computed: {

  },

};
</script>

<style scoped>

tr td {
  height: 62.5px;
}

td img {
  max-height: 62.5px;
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
