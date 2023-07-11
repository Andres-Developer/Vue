<template>
  <div v-if="this.isUserAuthenticated && this.user?.isAdmin">
    <div class="h1 mt-5 mb-3">Administración de productos</div>
    <div class="container">
      <div class="d-flex justify-content-center gap-2 mb-1">
        <div class="btn btn-success btn-chip" @click="() => $router.push('/admin/product/new')">+ Crear Producto</div>
        <div to="/" class="btn btn-secondary btn-chip" @click="() => $router.push('/admin')">Volver al panel de
          administración
        </div>
      </div>
      <EditProductsTable />
      <div class="d-flex mt-5 justify-content-center gap-2 mb-5">
        <div class="btn btn-success btn-chip" @click="() => $router.push('/admin/product/new')">+ Crear Producto</div>
        <div to="/" class="btn btn-secondary btn-chip" @click="() => $router.push('/admin')">Volver al panel de
          administración
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="h1 mt-5 mb-5 text-danger">No autorizado</div>
    <LoginUser />
  </div>
</template>

<script>
import EditProductsTable from '@/components/EditProductsTable.vue';
import LoginUser from './LoginUser.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductsManagement',
  components: {
    LoginUser,
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
    ...mapGetters('userModule', ['getUser', 'getIsUserAuthenticate']),
    user() {
      return this.getUser;
    },
    isUserAuthenticated() {
      return this.getIsUserAuthenticate;
    },
  },

};
</script>

<style scoped></style>
