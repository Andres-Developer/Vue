<template>
  <div v-if="this.isUserAuthenticated && this.user?.isAdmin">
    <div class="h2 mt-5 mb-3">Órdenes del cliente: </div>
    <div v-if="!this.loading">
      <div v-if="this.client">
        <div class="h4 mb-5 text-success">
          {{ this.client.firstname + " " + this.client.lastname }}
          <img :src="this.client.avatar" alt="client" height="60" class="user-avatar">
        </div>
        <div to="/" class="btn btn-secondary btn-chip mb-4" @click="() => $router.push('/admin/client-orders')">Volver
        </div>
        <div v-if="!this.clientOrders.length" class="h5 mt-5 pt-5 text-secondary"> Todavía no ha creado órdenes de compra
        </div>
        <div v-else>
          <div class="container d-flex flex-column justify-content-center table-width">
            <OrderTable v-for="order in this.clientOrders" :key="order.id" :order="order" />
          </div>

        </div>
      </div>
      <div v-else class="h5 mt-5 pt-5 text-danger"> Cliente no encontrado </div>
    </div>
    <div v-else class="h5 mt-5 pt-5">Loading...</div>
  </div>
  <div v-else>
    <div class="h1 mt-5 mb-5 text-danger">No autorizado</div>
    <LoginUser />
  </div>
</template>

<script>
import OrderTable from '@/components/OrderTable.vue';
import LoginUser from './LoginUser.vue';
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'ClientOrdersList',
  components: {
    LoginUser,
    OrderTable
  },
  props: {
  },
  data() {
    return {
      clientOrders: [],
    };
  },
  created() {
    (async () => {
      await this.getClientFromAPI(this.id);
      this.clientOrders = this.client?.orders;
    })();
  },
  methods: {
    ...mapActions('userModule', ['getClientFromAPI'])
  },
  computed: {
    ...mapGetters('userModule', ['getClient', 'getLoading']),
    ...mapGetters('userModule', ['getUser', 'getIsUserAuthenticate']),
    user() {
      return this.getUser;
    },
    isUserAuthenticated() {
      return this.getIsUserAuthenticate;
    },
    client() {
      return this.getClient;
    },
    id() {
      return this.$route.params.id;
    },
    loading() {
      return this.getLoading;
    }
  },
};
</script>

<style scoped></style>
