<template>
  <div class="custom-height container d-flex justify-content-center align-items-center">
    <b-card v-if="!this.loading" no-body class="overflow-hidden" style="width: 640px; max-height: 650px;">
      <div v-if="product" class="row g-0">
        <div class="col-md-6 d-flex flex-column align-items-center justify-content-center p-3">
          <b-card-img loading="lazy" class="product-image rounded-0" @load="$event.target.style.opacity = 1"
            :src="product.image + '/?random=' + product.id" alt="Image" />
          <div class="mt-2"><strong> Stock:</strong> {{ product.stock }}</div>
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <b-card-body :title="product.title">
            <b-card-text>
              {{ product.description }}
              <div v-if="Number(product.stock) === 0">
                <b-button variant="secondary" class="w-100 btn-chip mt-3" disabled>
                  <div class="d-flex justify-content-center align-items-center gap-2">
                    <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
                    <div class="fs-5 "> Agotado </div>
                  </div>
                </b-button>
              </div>
              <div v-else>
                <div v-if="checkSelectedProduct">
                  <div class="mt-4 mb-3 text-success">Has añadido <strong>{{ localQuantity }} </strong> pizzas al carrito
                    por:</div>
                  <div class="h4"> $ {{ localPrice || product.price }}</div>
                  <div type="button" @click="[deleteToCartHandleClick(product.id)]" class="text-danger">🗑️ Eliminar</div>
                  <div class="mt-4 d-flex flex-column gap-3">
                    <b-button to="/cart" variant="success btn-chip" class="fs-5"> 🛒 ir al carrito</b-button>
                  </div>
                </div>
                <div v-else>
                  <div class="d-flex justify-content-center align-items-center mt-5">
                    <b-button @click="subtractLocalQuantity" variant="light">
                      -
                    </b-button>
                    <div>{{ localQuantity }}</div>
                    <b-button @click="addLocalQuantity" variant="light">
                      +
                    </b-button>
                    <div class="fs-3"> $ {{ localPrice || product.price }}</div>
                  </div>
                  <b-button variant="danger" @click="[addToCartHandleClick({ ...product, quantity: localQuantity })]"
                    class="w-100 mt-4 btn-chip">
                    <div class="d-flex justify-content-center align-items-center gap-2">
                      <img alt="add to cart" src="./../assets/add-to-cart.svg" width="25">
                      <div class="fs-5"> Agregar al carrito </div>
                    </div>
                  </b-button>
                </div>
              </div>
              <div @click="() => $router.push('/')" class="w-100 btn btn-secondary fs-5 mt-3 btn-chip">Seguir comprando
              </div>
            </b-card-text>
          </b-card-body>
        </div>
      </div>
      <div v-else-if="(typeof (this.id) === 'number')"> Producto con id <strong>{{ id }}</strong>: NO fue encontrado</div>
      <div v-else> Producto con id: <strong>{{ id }}</strong> no fue encontrado.
        <div> Debes ingresar una id tipo <strong>numérica</strong> </div>
      </div>
    </b-card>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import cartStore from '@/stores/cartStore';
// import productsStore from '@/stores/productsStore';

export default {
  name: 'ProductDetail',
  components: {
  },
  props: {
  },
  data() {
    return {
      // productsStore,
      // cartStore,
      // productsInCart: cartStore.productsInCart,
      // loading: false,
      // product: null,
      localQuantity: 1,
      localPrice: 0,
    };
  },
  created() {
    if (!(typeof (this.id) === 'number')) {
      return null;
    }
    (async () => {
      // this.product = await this.productsStore.getProductFromAPI(this.id);
      await this.getProductFromAPI(this.id);
      this.getProductSelectedFromCart();
    })();
  },
  mounted() {
  },

  methods: {
    ...mapActions('cartModule', ['addProductToCart', 'deleteProductFromCart']),
    ...mapActions('productsModule', ['getProductFromAPI']),

    getProductSelectedFromCart() {
      if (this.checkSelectedProduct) {
        this.localQuantity = this.getProductFromCart.quantity;
        this.localPrice = this.getProductFromCart.subtotal;
      }
    },
    addToCartHandleClick(product) {
      // this.cartStore.addProductToCart(product);
      this.addProductToCart(product);
    },
    deleteToCartHandleClick(id) {
      // this.cartStore.deleteProductFromCart(id);
      this.deleteProductFromCart(id);
    },
    addLocalQuantity() {
      if (this.localQuantity < this.product.stock) {
        this.localQuantity += 1;
      }
    },
    subtractLocalQuantity() {
      if (this.localQuantity > 1) {
        this.localQuantity -= 1;
      }
    },
  },
  computed: {
    ...mapGetters('cartModule', ['getProductsInCart', 'getIsSelectedProduct', 'getSingleProductFromCart']),
    ...mapGetters('productsModule', ['getLoading', 'getProduct']),
    product() {
      return this.getProduct;
    },
    loading() {
      return this.getLoading;
    },

    id() {
      return (Number(this.$route.params.id) || this.$route.params.id);
    },
    checkSelectedProduct() {
      // return this.productsInCart.some((Eproduct) => Eproduct.id === this.product.id);
      return this.getIsSelectedProduct(this.product);
    },
    getProductFromCart() {
      // return this.productsInCart.find((Eproduct) => Eproduct.id === this.product.id);
      // return this.getProductsInCart.find((Eproduct) => Eproduct.id === this.product.id);
      return this.getSingleProductFromCart(this.product);
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
.product-image {
  /* height: 16rem;
  width: 14rem;
  object-fit: cover; */
  opacity: 0;
  transition: opacity 1s ease;
  max-width: 360px;
}

.custom-height {
  height: calc(100vh - 66px)
}

.btn-chip {
  height: 2.7rem;
}

.padding {
  padding: 0.5rem;
}
</style>
