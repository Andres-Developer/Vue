<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/" href="#">Home</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="me-auto">
        <!-- <b-nav-item :to="{ name: 'quienes-somos' }" href="#" class="me-auto">Quienes somos</b-nav-item> -->
        <!-- <b-nav-item :to="{ name: 'post-id', params: { id: 1 } }" href="#" class="me-auto">Post numero 1</b-nav-item> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "HeaderBar",
};
</script>

<style scoped></style>