<template>
  <div v-if="this.isUserAuthenticated">
    <div class="h1 mt-5 mb-3">Mis órdenes</div>
    <div v-if="this.user.isAdmin" class="btn btn-secondary btn-chip mb-5" @click="() => $router.push('/admin')">
      Volver al panel de administración </div>
    <div v-else class="btn btn-secondary btn-chip mb-5" @click="() => $router.push('/')">Volver al listado de productos
    </div>
    <div v-if="this.user?.orders?.length > 0">
      <OrderTable v-for="order in this.user?.orders" :key="order.id" :order="order" />
    </div>
    <div v-else class="h4 mb-5"> 
      {{ this.user?.firstname }} tienes {{ this.user?.orders?.length }} órdenes de compra
    </div>
    <div v-if="this.user.isAdmin" class="btn btn-secondary btn-chip mb-5" @click="() => $router.push('/admin')">
      Volver al panel de administración </div>
    <div v-else class="btn btn-secondary btn-chip mb-5" @click="() => $router.push('/')">Volver al listado de productos
    </div>
  </div>
  <div v-else>
    <div class="h1 mt-5 mb-5 text-danger">No autorizado</div>
    <LoginUser />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    }
  },
};
</script>

<style scoped></style>
