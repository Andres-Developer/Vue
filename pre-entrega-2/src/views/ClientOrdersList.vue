<template>
  <div class="h2 mt-5 mb-3">Órdenes del cliente: </div>
  <div v-if="!this.userStore.loading">
    <div v-if="singleUser">
      <div class="h4 mb-5 text-success">
        {{ this.singleUser.firstname + " " + this.singleUser.lastname }}
        <img :src="this.singleUser.avatar" alt="client" height="60">
      </div>
      <div to="/" class="btn btn-secondary btn-chip mb-4" @click="() => $router.push('/admin/client-orders')">Volver
      </div>
      <div v-if="!this.clientOrders.length" class="h5 mt-5 pt-5 text-secondary"> Todavía no ha creado órdenes de compra </div>
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
import userStore from '@/stores/userStore';

export default {
  name: 'ClientOrdersList',
  components: {
    OrderTable
  },
  props: {
  },
  data() {
    return {
      userStore,
      singleUser: null,
      clientOrders: [],
    };
  },
  created() {
    (async () => {
      this.singleUser = await this.userStore.getSingleUser(this.id);
      this.clientOrders = this.singleUser?.orders;
      // console.log(this.clientOrders);
      console.log("single user: ", this.singleUser);
    })();
  },
  methods: {
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },

};
</script>

<style scoped>
</style>
