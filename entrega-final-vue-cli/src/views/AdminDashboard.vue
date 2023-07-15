<template>
  <div v-if="this.isUserAuthenticated && this.user?.isAdmin">
    <div class="h1 mt-5 mb-5">Panel de administración</div>
    <div class="vw-100 d-flex justify-content-center gap-5">
      <BCard title="Edita o crea nuevos productos" img-src="https://picsum.photos/600/300/?image=23" img-alt="Image"
        img-top tag="article" style="max-width: 20rem;">
        <BButton @click="() => $router.push('/admin/products-management')" variant="primary" class="btn-chip">
          Administración
          de productos</BButton>
      </BCard>
      <BCard title="Mira las órdenes de los clientes" img-src="https://picsum.photos/600/300/?image=4" img-alt="Image"
        img-top tag="article" style="max-width: 20rem;">
        <BButton @click="() => $router.push('/admin/client-orders')" variant="primary" class="btn-chip">Ver órdenes de
          clientes</BButton>
      </BCard>
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


export default {
  name: 'AdminDashboard',
  components: {
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
