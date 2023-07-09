<template>
  <div class="d-flex justify-content-center align-items-center container-message-confirmation">
    <div class="success " v-if="this.deletedSuccess">¡Eliminación exitosa!</div>
  </div>
  <b-table-simple @click="cleanDeletedMessage" v-if="!this.productsStore.loading" responsive
    class="container table-width mt-2">
    <b-thead>
      <b-tr variant="light">
        <b-th>id</b-th>
        <b-th>Producto</b-th>
        <b-th>Precio</b-th>
        <b-th>Stock</b-th>
        <b-th>Acción</b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="product in this.productsStore.products" :key="product.id" class="align-middle">
        <b-td><strong>{{ product.id }}</strong></b-td>
        <b-td sticky-column class="d-flex justify-content-start gap-2 align-items-center">
          <router-link :to="{ name: 'product-detail-id', params: { id: product.id } }">
            <img :src="product.image + '/?random=' + product.id" alt="pizza">
            {{ product.title }}
          </router-link>
        </b-td>
        <b-td>$ {{ product.price }}</b-td>
        <b-td :variant="product.stock === 0 && 'danger'">
          {{ product.stock }}
        </b-td>
        <b-td>
          <b-button @click="editProductHandleClick(product.id)" variant="light">
            📝
          </b-button>
        </b-td>
        <b-td>
          <b-button @click="deleteProductHandleClick(product.id)" variant="light">
            🗑️
          </b-button>
        </b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr variant="light">
        <b-th colspan="3" class="text-end">
        </b-th>
        <b-th>
        </b-th>
        <b-th></b-th>
        <b-th></b-th>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
  <div v-else>Loading...</div>
</template>

<script>
import productsStore from '@/stores/productsStore';

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
      productsStore,
      deletedSuccess: false,
    };
  },

  methods: {
    async deleteProductHandleClick(id) {
      if (window.confirm("¿Estás seguro de eliminar este producto?")
      ) {
        this.deletedSuccess = await this.productsStore.deleteProduct(id);
      }
    },
    editProductHandleClick(id) {
      this.$router.push({ name: 'admin-edit-product', params: { id } });
    },
    cleanDeletedMessage() {
      this.deletedSuccess = false;
    },
  },
  created() {
    this.productsStore.getProducts();
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

.success {
  min-width: 700px;
}
</style>
