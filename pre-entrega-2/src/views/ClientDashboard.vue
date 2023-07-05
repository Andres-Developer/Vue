<template>
  <div class="h1 mt-5 mb-5">Mis órdenes</div>
  <OrderTable v-for="order in this.userStore.user?.orders" :key="order.id" :order="order"/>
</template>

<script>
import userStore from '@/stores/userStore';
import OrderTable from '@/components/OrderTable.vue';

export default {
  name: 'ClientDashboard',
  components: {
    OrderTable
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
