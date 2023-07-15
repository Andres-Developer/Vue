<template>
  <div class="h1 mt-5 mb-5">Resumen de orden</div>
  <div v-if="this.productsInCart.length !== 0 || this.isOrderGenerated">
    <div v-if="this.isReadyForCheckout">
      <div v-if="!this.isOrderGenerated" class="container">
        <div class="row gap-4">
          <CartProductTable class="col border" />
          <div class="col">
            <FormKit type="form" id="billing-user-form" submit-label="Register" @submit="handleCheckoutClick"
              :actions="false" v-model="formData" incomplete-message="Por favor completa todos los campos"
              :classes="{ form: '$reset' }">
              <div class="outer-container">
                <h5 class="mb-4">Diligencia el siguiente formulario para crear la orden </h5>
                <FormKit type="text" name="firstname" label="Nombre" placeholder="Ingresa tu nombre"
                  :value="this.user.firstname" help="¿Cómo quieres que te llamemos?" validation="required|length:3"
                  :validation-messages="{
                    length: 'Debes ingresar al menos 3 caracteres',
                    required: 'Por favor ingresa un nombre',
                  }" />
                <FormKit type="text" name="lastname" label="Apellido" placeholder="Ingresa tu apellido"
                  :value="this.user.lastname" help="¿Cuál es tu apellido?" validation="required|length:3"
                  :validation-messages="{
                    length: 'Debes ingresar al menos 3 caracteres',
                    required: 'Por favor ingresa un apellido',
                  }" />
                <FormKit type="text" name="email" label="e-mail" placeholder="usuario@email.com" :value="this.user.email"
                  help="¿Cuál es tu email?" validation="required|email" validation-visibility="dirty"
                  :validation-messages="{
                    email: 'Ingresa un email en formato válido',
                    required: 'Por favor ingresa un e-mail',
                  }" />
                <FormKit type="text" name="address" label="Dirección" placeholder="Ingresa dirección de entrega"
                  help="¿Cuál es la dirección de entraga?" validation="required|length:3" :validation-messages="{
                    length: 'Debes ingresar al menos 3 caracteres',
                    required: 'Por favor ingresa una dirección para la entrega',
                  }" />
                <div class="d-flex mt-4 justify-content-evenly align-items-end">
                  <div>
                    <b-button variant="secondary" to="/cart" class="btn-chip" @click="this.handleBackToCart">Modificar
                      carrito</b-button>
                  </div>
                  <FormKit type="submit" label="Crear orden"
                    :classes="{ outer: '$reset', input: 'btn-chip d-flex align-items-center' }" />
                </div>
              </div>
              <div v-if="registerFail" class="text-danger h5"> El usuario ya se encuentra registrado </div>
            </FormKit>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="h2 mt-5 mb-5 text-primary"> ¡Orden generada satisfactoriamente! </div>
        <div class="h5 mt-5"> Redirigiendo al listado de órdenes de compra...</div>
      </div>
    </div>
    <div v-else>
      <div class="h3 mb-5 text-primary">Debes confirmar la el carrito de compras</div>
      <b-button variant="secondary" to="/cart" class="btn-chip" @click="this.handleBackToCart">Volver al
        carrito</b-button>
    </div>
  </div>
  <div v-else>
    <div class="h3 mb-5 text-danger">No tienes productos en el carrito</div>
    <b-button variant="secondary" to="/" class="btn-chip">Volver al listado de productos</b-button>
  </div>
</template>

<script>
import CartProductTable from '@/components/CartProductTable.vue';


import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CartContent',
  emits: [],
  components: {
    CartProductTable,
  },
  props: {
  },
  metaInfo() {
    return {
      title: this.productCount ? `🛒 Tu compra  (${this.productCount})` : `🛒 Tu compra`
    };
  },
  data() {
    return {
      formData: {},
      isOrderGenerated: false,
    };
  },
  created() {
  },

  methods: {
    ...mapActions('cartModule', ['clearCart', 'setIsReadyForCheckout']),
    ...mapActions('userModule', ['addOrder']),

    async handleCheckoutClick() {
      if (!this.user) {
        if (confirm('Debes iniciar sesión para poder realizar la compra')) {
          this.$router.push({ name: 'login-user' });
          return;
        }
      } else {
        await this.addOrder({ ...this.formData });
        this.isOrderGenerated = true;
        this.clearCart();
        await new Promise(resolve => setTimeout(() => {
          this.$router.push({ name: this.user.isAdmin ? 'self-orders' : 'client' });
          this.setIsReadyForCheckout(false);
          resolve;
        }, 2500));
      }
    },
    handleBackToCart() {
      this.setIsReadyForCheckout(false);
    },
  },
  computed: {
    ...mapGetters('cartModule', ['getProductCount', 'getProductsInCart', 'getIsReadyForCheckout']),
    ...mapGetters('userModule', ['getUser', 'getLoading']),
    user() {
      return this.getUser;
    },
    loading() {
      return this.getLoading;
    },
    productCount() {
      return this.getProductCount;
    },
    productsInCart() {
      return this.getProductsInCart;
    },
    isReadyForCheckout() {
      return this.getIsReadyForCheckout;
    },

  },
};
</script>

<style scoped></style>
