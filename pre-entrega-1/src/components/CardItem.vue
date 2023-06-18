<template>
  <b-card :title="product.title" :img-src="product.image" img-alt="Image"
    img-top tag="article" class="m-2 card-style">
    <b-card-text>
      {{ product.description }}
    </b-card-text>
    <div class="h4"> $ {{ product.price }}</div>
    <div v-if="this.productsInCart.some((Eproduct) => Eproduct.id === product.id)">
      <b-button variant="success">Agregada!</b-button>
      <div type="button" @click="[deleteToCartHandleClick(product.id)]">X Eliminar</div>
    </div>
    <b-button v-else variant="danger" @click="[addToCartHandleClick(product)]">
      <div class="d-flex justify-content-center align-items-center gap-2">
        <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
        <div class="fs-5"> Agregar al carrito </div>
      </div>
    </b-button>
  </b-card>
</template>

<script>

export default {
  name: 'CardItem',
  emits: ['add-to-cart'],
  components: {
  },
  props: {
    product: Object,
    productsInCart: Array,
  },
  data() {
    return {
    };
  },

  methods: {
    addToCartHandleClick(product) {
      // console.log('handleClick:', product);
      this.$emit('add-to-cart', product);
    },
    deleteToCartHandleClick(id) {
      // console.log('handleClick:', product);
      this.$emit('delete-to-cart', id);
    },
  },
  computed: {

  },

};
</script>

<style scoped>
.card-style {
  width: 18rem;
  min-width: 18rem;
  height: 35rem;
}
</style>
