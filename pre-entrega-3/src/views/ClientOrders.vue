<template>
  <div class="h1 mt-5 mb-3">Órdenes de clientes</div>
  <div to="/" class="btn btn-secondary btn-chip mb-5" @click="() => $router.push('/admin')">Volver al panel de
    administración
  </div>
  <b-table-simple @click="cleanDeletedMessage" v-if="!this.loading" responsive class="container table-width">
    <b-thead>
      <b-tr variant="light">
        <b-th>id cliente</b-th>
        <b-th>Avatar</b-th>
        <b-th>Nombres</b-th>
        <b-th>Total órdenes</b-th>
        <b-th></b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="client in this.clientsWithOrders" :key="client.id" class="align-middle">
        <b-td><strong>{{ client.id }}</strong></b-td>
        <b-td sticky-column class="d-flex justify-content-start gap-2 align-items-center">
          <img :src="client.avatar" alt="client" height="60" class="user-avatar">
        </b-td>
        <b-td> {{ client.firstname + " " + client.lastname }}</b-td>
        <b-td>
          {{ client.orders.length }}
        </b-td>
        <b-td>
          <b-button @click="$router.push(`/admin/client-orders/client/${client.id}`)" class="btn-chip" variant="warning">
            Ver órdenes
          </b-button>
        </b-td>
        <b-td>
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
  <div v-else class="h5 mt-5 pt-5">Loading...</div>
</template>

<script>
// import userStore from '@/stores/userStore';
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'ClientOrders',
  components: {
  },
  props: {
  },
  data() {
    return {
      // userStore,
      // clientsWithOrders: []
    };
  },
  created() {
    (async () => {
      await this.getUsersFromAPI();
      await this.getClientOrders();
      // this.clientsWithOrders = await this.userStore.getClientOrders();
    })();
  },
  methods: {
    ...mapActions('userModule', ['getUsersFromAPI','getClientOrders'])
  },
  computed: {
    ...mapGetters('userModule', ['getUsersWithOrders', 'getLoading']),
    clientsWithOrders() {
      return this.getUsersWithOrders;
    },
    loading() {
      return this.getLoading;
    }
  },

};
</script>

<style scoped></style>
