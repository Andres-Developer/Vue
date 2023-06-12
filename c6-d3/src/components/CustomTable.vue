<template>
  <table class="table table-striped" :class="colorTabla">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Artículo</th>
        <th scope="col">Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(elemento) in lista" :key="elemento.id">
        <th scope="row">{{ elemento.id }}</th>
        <td>{{ elemento.articulo }}</td>
        <td>$\{{ elemento.precio }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    colorTabla: String,
    lista: Array,
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
