<template>
  <div class="h1 mt-5 mb-3">Administración de productos</div>
  <div class="container">
    <div class="d-flex justify-content-center gap-2 mb-4">
      <div class="btn btn-success btn-chip" @click="() => $router.push('/admin/product/new')">+ Crear Producto</div>
      <div to="/" class="btn btn-secondary btn-chip" @click="() => $router.push('/admin')">Volver al panel de administración
      </div>
    </div>

    <EditProductsTable />
    <div class="d-flex mt-5 justify-content-center gap-2 mb-5">
      <div class="btn btn-success btn-chip" @click="() => $router.push('/admin/product/new')">+ Crear Producto</div>
      <div to="/" class="btn btn-secondary btn-chip" @click="() => $router.push('/admin')">Volver al panel de administración
      </div>
    </div>
  </div>
</template>

<script>
import EditProductsTable from '@/components/EditProductsTable.vue';

export default {
  name: 'ProductsManagement',
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

<style scoped></style>
