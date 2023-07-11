<template>
  <b-table-simple responsive class="container mb-5">
    <b-thead>
      <b-tr variant="light">
        <b-th>Fecha de creación: </b-th>
        <b-th colspan="2">{{ this.formattedDate(order.dateOfPurchase) }}</b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-thead>
      <b-tr variant="light">
        <b-th>Producto</b-th>
        <b-th>Precio</b-th>
        <b-th>Cantidad</b-th>
        <b-th>Total</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="product in order.products" :key="product.id" class="align-middle">
        <b-td sticky-column class="d-flex justify-content-start gap-2 align-items-center">
          <router-link :to="{ name: 'product-detail-id', params: { id: product.id } }">
            <img :src="product.image + '/?random=' + product.id" alt="pizza">
            {{ product.title }}
          </router-link>
        </b-td>
        <b-td>$ {{ product.price }}</b-td>
        <b-td>
          {{ product.quantity }}
        </b-td>
        <b-td> $ {{ product.subtotal.toFixed(2) }}</b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr variant="light">
        <b-th colspan="3" class="text-end">Total: </b-th>
        <b-th>$ {{ order.grandTotal.toFixed(2) }}</b-th>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
</template>

<script>
import { formattedDate } from '@/utils/dateTools';

export default {
  name: 'OrderTable',
  components: {
  },
  props: {
    order: Object,
  },
  data() {
    return {
    };
  },
  methods: {
    formattedDate,
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
