<template>
  <b-card img-alt="Image" img-top tag="article" class="m-2 card-style">
    <img :src="product.image + '/?random=' + product.id" alt="" height="180">
    <div class="h4">{{ product.title }}</div>
    <b-card-text>
      <!-- {{ product.description }} -->
    </b-card-text>
    <div class="h4"> $ {{ product.price }}</div>
    <div class="d-flex flex-column gap-2">
      <b-button variant="primary" :to="{ name: 'product-detail-id', params: { id: product.id } }" class="fs-5">
        + info</b-button>
      <div v-if="checkSelectedProduct">
        <b-button variant="success" style="pointer-events: none;" class="w-100 fs-5">Agregada!</b-button>
        <div type="button" @click="[deleteToCartHandleClick(product.id)]" class="mt-2">🗑️ Eliminar</div>
      </div>
      <div v-else>
        <b-button variant="danger" @click="[addToCartHandleClick(product)]" class="w-100">
          <div class="d-flex justify-content-center align-items-center gap-2">
            <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
            <div class="fs-5"> Agregar al carrito </div>
          </div>
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
import cartStore from '@/stores/cartStore';

export default {
  name: 'CardItem',
  emits: [],
  components: {
  },
  props: {
    product: Object,
  },
  data() {
    return {
      cartStore,
      productsInCart: cartStore.productsInCart,
    };
  },
  methods: {
    addToCartHandleClick(product) {
      this.cartStore.addProductToCart(product);
    },
    deleteToCartHandleClick(id) {
      this.cartStore.deleteProductFromCart(id);
    },
  },
  computed: {
    checkSelectedProduct() {
      return this.productsInCart.some((Eproduct) => Eproduct.id === this.product.id);
    },
  },
};
</script>

<style scoped>
.card-style {
  width: 18rem;
  min-width: 18rem;
  height: 26rem;
}
</style>
