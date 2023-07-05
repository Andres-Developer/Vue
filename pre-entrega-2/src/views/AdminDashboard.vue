<template>
  <div class="h1 mt-5 mb-5">Panel de administración</div>

  <div class="vw-100 d-flex justify-content-center">
    <BCard title="Edita o crea nuevos productos" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
      tag="article" style="max-width: 20rem;">
      <BButton @click="() => $router.push('/admin/products-management')" variant="primary" class="btn-chip">Administración
        de Productos</BButton>
    </BCard>
  </div>
</template>

<script>



export default {
  name: 'AdminDashboard',
  components: {

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

<style scoped>
.btn-chip {
  padding: 0.3rem 1rem !important;
  border-radius: 3rem !important;
  height: 35px;
}
</style>
