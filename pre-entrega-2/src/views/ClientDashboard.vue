<template>
  <div v-if="this.userStore.isUserAuthenticated">
    <div class="h1 mt-5 mb-3">Mis órdenes</div>
    <div v-if="this.userStore.user.isAdmin" class="btn btn-secondary btn-chip mb-5"
      @click="() => $router.push('/admin')">Volver al panel de administración </div>
    <div v-else class="btn btn-secondary btn-chip mb-5"
      @click="() => $router.push('/')">Volver al listado de productos</div>
    <OrderTable v-for="order in this.userStore.user?.orders" :key="order.id" :order="order" />
    <div v-if="this.userStore.user.isAdmin" class="btn btn-secondary btn-chip mb-5"
      @click="() => $router.push('/admin')">Volver al panel de administración </div>
    <div v-else class="btn btn-secondary btn-chip mb-5"
      @click="() => $router.push('/')">Volver al listado de productos</div>
  </div>
  <div v-else>
    <div class="h1 mt-5 mb-5 text-danger">No autorizado</div>
    <LoginUser />
  </div>
</template>

<script>
import userStore from '@/stores/userStore';
import LoginUser from './LoginUser.vue';
import OrderTable from '@/components/OrderTable.vue';

export default {
  name: 'ClientDashboard',
  components: {
    OrderTable,
    LoginUser
  },
  props: {
  },
  data() {
    return {
      userStore,
    };
  },
  methods: {
  },
  computed: {
  },
};
</script>

<style scoped></style>
