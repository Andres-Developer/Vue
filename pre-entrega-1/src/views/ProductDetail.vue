<template>
  <div class="custom-height container d-flex justify-content-center align-items-center">
    <b-card no-body class="overflow-hidden" style="width: 640px; height: 400px;">
      <b-row class="g-0">
        <b-col md="6">
          <b-card-img :src="product.image" alt="Image" class="rounded-0" />
        </b-col>
        <b-col md="6">
          <b-card-body :title="product.title">
            <b-card-text>
              {{ product.description }}

              <div v-if="checkSelectedProduct">
                <div class="mt-4">Has añadido <strong>{{ localQuantity }} </strong> pizzas al carrito por:</div>
                <div class="h4"> $ {{ getProductFromCart.subtotal }}</div>
                <b-button variant="success" style="pointer-events: none;">Agregada!</b-button>
                <div type="button" @click="[deleteToCartHandleClick(product.id)]">X Eliminar</div>
              </div>
              <div v-else>

                <div class="d-flex justify-content-center align-items-center">
                  <b-button @click="substractLocalQuantity" variant="light">
                    -
                  </b-button>
                  <div>{{ localQuantity }}</div>
                  <b-button @click="addLocalQuantity" variant="light">
                    +
                  </b-button>
                  <div class="fs-3"> $ {{ localPrice || product.price }}</div>
                </div>
                <b-button variant="danger" @click="[addToCartHandleClick({ ...product, quantity: localQuantity })]">
                  <div class="d-flex justify-content-center align-items-center gap-2">
                    <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
                    <div class="fs-5"> Agregar al carrito </div>
                  </div>
                </b-button>
              </div>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import products from '../data/products.json';

export default {
  name: 'ProductDetail',
  components: {
    // ComponentName
  },
  props: {
    productsInCart: Array,
  },
  data() {
    return {
      product: {},
      productFromCart: {},
      localQuantity: 1,
      localPrice: 0,
    };
  },
  created() {
    this.product = products.find((product) => product.id === this.id);
    if (this.checkSelectedProduct) {
      this.localQuantity = this.getProductFromCart.quantity;
      this.localPrice = this.getProductFromCart.subtotal;
    }
  },

  methods: {
    addToCartHandleClick(product) {
      console.log(product);
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
