<template>
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
</template>

<script>
import OrderTable from '@/components/OrderTable.vue';
import { mapActions, mapGetters } from 'vuex';
// import userStore from '@/stores/userStore';

export default {
  name: 'ClientOrdersList',
  components: {
    OrderTable
  },
  props: {
  },
  data() {
    return {
      // userStore,
      // singleUser: null,
      clientOrders: [],
    };
  },
  created() {
    (async () => {
      // this.singleUser = await this.userStore.getSingleUser(this.id);
      await this.getClientFromAPI(this.id);
      this.clientOrders = this.client?.orders;
    })();
  },
  methods: {
    ...mapActions('userModule', ['getClientFromAPI'])
  },
  computed: {
    ...mapGetters('userModule', ['getClient', 'getLoading']),
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
