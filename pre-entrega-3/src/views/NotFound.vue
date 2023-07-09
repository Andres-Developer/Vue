<template>
  <div class="custom-height d-flex flex-column justify-content-center align-items-center text-big">
    <div>404</div>
    <div>Ruta no encontrada</div>
    <button type="button" class="btn btn-primary mt-5 btn-chip" @click="() => $router.push('/')">Volver a productos</button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
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
.custom-height {
  height: calc(100vh - 66px)
}

.text-big {
  font-size: 5rem;
  line-height: 5.5rem;
}
.btn-chip {
  padding: 1rem 2rem;
  border-radius: 4rem;
  font-size: 2rem  
}
</style>
