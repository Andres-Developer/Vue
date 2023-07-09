<template>
  <div img-alt="Image" tag="article"
    class="m-2 card-style d-flex flex-column justify-content-between gap-2 border p-3 rounded-3">
    <div class="container-image-description-card">
      <img loading="lazy" class="product-image" @load="$event.target.style.opacity = 1"
        :src="product.image + '/?random=' + product.id" alt="" height="180">
      <div class="h4">{{ product.title }}</div>
    </div>
    <div class="container-body-card">
      <div class="h4"> $ {{ product.price }}</div>
      <div class="d-flex flex-column gap-2">
        <b-button variant="primary" :to="{ name: 'product-detail-id', params: { id: product.id } }"
          class="fs-5 btn-chip p-3 d-flex justify-content-center align-items-center">
          + info</b-button>
        <div v-if="Number(product.stock) === 0" class="btn-container">
          <b-button variant="secondary" class="w-100 btn-chip" disabled>
            <div class="d-flex justify-content-center align-items-center gap-2">
              <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
              <div class="fs-5 "> Agotado </div>
            </div>
          </b-button>
        </div>
        <div v-else class="">
          <div v-if="checkSelectedProduct">
            <b-button variant="success" class="w-100 fs-5 btn-chip">Agregada!</b-button>
            <div type="button" @click="[deleteToCartHandleClick(product.id)]" class="mt-2">🗑️ Eliminar</div>
          </div>
          <div v-else class=" btn-container">
            <b-button variant="danger" @click="[addToCartHandleClick(product)]" class="w-100 btn-chip">
              <div class="d-flex justify-content-center align-items-center gap-2">
                <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
                <div class="fs-5 "> Agregar al carrito </div>
              </div>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
.product-image {
  /* height: 16rem;
  width: 14rem;
  object-fit: cover; */
  opacity: 0;
  transition: opacity 1s ease;
}

.card-style {
  width: 18rem;
  min-width: 18rem;
  height: 28rem;
}

.btn-chip {
  height: 2.7rem;
}

.container-image-description-card {
  height: 15rem;
}

.container-body-card {
  height: 10rem;
}

.btn-container {
  height: 5rem;
}
</style>
