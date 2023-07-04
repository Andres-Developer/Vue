<template>
  <div class="h1 mt-5 mb-3">Listado de productos</div>
  <div class="container">
    <div class="btn btn-success btn-chip mb-4" @click="()=> $router.push('admin/product/new')">+ Crear Producto</div>
    <EditProductsTable />
    <div class="d-flex mt-5 justify-content-center gap-5">
      <b-button variant="secondary" to="/">Volver al listado general</b-button>
      <!-- <b-button variant="primary" to="/checkout" disabled>ir a pagar</b-button> -->
    </div>
  </div>
</template>

<script>
import EditProductsTable from '@/components/EditProductsTable.vue';


export default {
  name: 'AdminDashboard',
  components: {
    EditProductsTable
  },
  props: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
};
</script>

<style scoped>
.btn-chip {
  padding: 0.3rem 1rem !important;
  border-radius: 3rem !important;
  height: 35px;
}
</style>
