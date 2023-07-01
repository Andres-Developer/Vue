<template>
  <div class="custom-height container d-flex justify-content-center align-items-center">
    <b-card v-if="!loading" no-body class="overflow-hidden" style="width: 640px; max-height: 650px;">
      <b-row class="g-0">
        <b-col md="6">
          <b-card-img :src="product.image + '/?random=' + product.id" alt="Image" class="rounded-0" />
        </b-col>
        <b-col md="6">
          <b-card-body :title="product.title">
            <b-card-text>
              {{ product.description }}
              <div v-if="checkSelectedProduct">
                <div class="mt-4 mb-3 text-success">Has añadido <strong>{{ localQuantity }} </strong> pizzas al carrito
                  por:</div>
                <div class="h4"> $ {{ localPrice }}</div>
                <div type="button" @click="[deleteToCartHandleClick(product.id)]" class="text-danger">🗑️ Eliminar</div>
                <div class="mt-4 d-flex flex-column gap-3">
                  <b-button to="/cart" variant="success" class="fs-5"> 🛒 ir al carrito</b-button>
                </div>
              </div>
              <div v-else>
                <div class="d-flex justify-content-center align-items-center mt-5">
                  <b-button @click="substractLocalQuantity" variant="light">
                    -
                  </b-button>
                  <div>{{ localQuantity }}</div>
                  <b-button @click="addLocalQuantity" variant="light">
                    +
                  </b-button>
                  <div class="fs-3"> $ {{ localPrice || product.price }}</div>
                </div>
                <b-button variant="danger" @click="[addToCartHandleClick({ ...product, quantity: localQuantity })]"
                  class="mt-4">
                  <div class="d-flex justify-content-center align-items-center gap-2">
                    <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
                    <div class="w-100 fs-5"> Agregar al carrito </div>
                  </div>
                </b-button>
              </div>
              <b-button variant="secondary" to="/" class="w-100 fs-5 mt-3">Seguir comprando</b-button>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <div v-else>LOADING...</div>
  </div>
</template>

<script>
import { getRequest } from '@/services/httpRequests';
import { loadingWithTimeout } from '@/utils/loadingTools';

export default {
  name: 'ProductDetail',
  components: {
  },
  props: {
    productsInCart: Array,
    products: Array,
  },
  data() {
    return {
      loading: false,
      product: {},
      productFromCart: {},
      localQuantity: 1,
      localPrice: 0,
    };
  },
  created() {
    this.getProduct();
  },
  mounted() {
  },

  methods: {
    async getProduct() {
      const BASE_URL = process.env.VUE_APP_BASE_URL;
      const ENDPOINT = `/products/${this.id}`;
      this.loading = true;
      this.product = await getRequest(BASE_URL + ENDPOINT);
      this.loading = await loadingWithTimeout(100);
      this.getProductSelectedFromCart();
    },
    getProductSelectedFromCart() {
      if (this.checkSelectedProduct) {
        this.localQuantity = this.getProductFromCart.quantity;
        this.localPrice = this.getProductFromCart.subtotal;
      }
    },
    addToCartHandleClick(product) {
      this.$emit('add-to-cart', product);
    },
    deleteToCartHandleClick(id) {
      this.$emit('delete-to-cart', id);
    },
    addLocalQuantity() {
      this.localQuantity += 1;
    },
    substractLocalQuantity() {
      if (this.localQuantity > 1)
        this.localQuantity -= 1;
    },
  },
  computed: {
    id() {
      return Number(this.$route.params.id);
    },
    logProducts() {
      return console.log("productos: ", this.products);
    },
    checkSelectedProduct() {
      return this.productsInCart.some((Eproduct) => Eproduct.id === this.product.id);
    },
    getProductFromCart() {
      return this.productsInCart.find((Eproduct) => Eproduct.id === this.product.id);
    },
    totalLocalPrice() {
      return (this.localQuantity * this.product.price).toFixed(2);
    },
  },
  watch: {
    localQuantity() {
      this.localPrice = this.totalLocalPrice;
    },
  },

};
</script>

<style scoped>
.custom-height {
  height: calc(100vh - 66px)
}
</style>
