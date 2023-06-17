<template>
  <b-card v-for="product in products" :key="product.id" :title="product.title" :img-src="product.image" img-alt="Image"
    img-top tag="article" class="m-2 card-style">
    <b-card-text>
      {{ product.description }}
    </b-card-text>
    <div class="h4"> $ {{ product.price }}</div>
    <b-button v-if="this.productsInCart.some((Eproduct) => Eproduct.id === product.id)"
      variant="success">Agregada!</b-button>
    <b-button v-else variant="danger" @click="[handleClick(product)]">
      <div class="d-flex justify-content-center align-items-center gap-2">
        <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
        <div class="fs-5"> Agregar al carrito </div>
      </div>
    </b-button>
  </b-card>
</template>

<script>
// import ComponentName from './ComponentName.vue'

export default {
  name: 'CardItem',
  emits: ['add-to-cart'],
  components: {
    // ComponentName
  },
  props: {
    products: Array,
    productsInCart: Array,
  },
  data() {
    return {
      isSelected: false,
    };
  },

  methods: {
    handleClick(product) {
      // console.log('handleClick:', product);
      this.isSelected = this.productsInCart.some((Eproduct) => Eproduct.id === product.id);
      console.log('selectedProduct:', this.isSelected);
      if (!this.isSelected) {
        this.$emit('add-to-cart', product);
      }
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
