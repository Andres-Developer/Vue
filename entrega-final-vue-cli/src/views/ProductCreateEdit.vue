<template>
  <div v-if="this.isUserAuthenticated && this.user?.isAdmin">
    <div class="h1 mt-5">{{ this.creationProduct || this.creationSuccess ? 'Creación' : 'Edición' }} de producto</div>
    <div v-if="!this.loading || this.clickedSubmit" class="container d-flex justify-content-center align-items-center">
      <FormKit type="form" id="product-edition" submit-label="Register" @submit="submitHandler"
        @click="cleanUpdatedMessage" :actions="false" v-model="formData"
        incomplete-message="Por favor completa todos los campos">
        <div class="container-message-confirmation">
          <div v-if="updated || creationSuccess" class="success">¡ {{ this.creationSuccess ? 'Creación' : 'Edición' }}
            exitosa!</div>
        </div>
        <div v-if="this.product" class="row product-edition-container">
          <div class="col-md-5 d-flex align-items-center justify-content-center p-3">
            <b-card-img v-if="!this.creationProduct" loading="lazy" class="product-image rounded-0"
              @load="$event.target.style.opacity = 1" :src="this.product.image + '/?random=' + this.product.id"
              alt="Image" />
          </div>
          <div class="col-md-7">
            <FormKit v-if="creationSuccess || !this.creationProduct" type="text" name="id" label="id" placeholder=""
              :value="this.product.id" disabled />
            <FormKit type="text" id="title" name="title" label="Nombre del producto" placeholder="Ingresa un nombre"
              :value="this.product.title" validation="required|length:3" validation-visibility="dirty"
              :validation-messages="{
                length: 'Debes ingresar al menos 3 caracteres',
                required: 'Por favor ingresa un nombre del producto',
              }" />
            <FormKit type="textarea" id="description" name="description" label="Descripción"
              placeholder="Ingresa una descripción" :value="this.product.description" validation="required|length:3"
              validation-visibility="dirty" :validation-messages="{
                length: 'Debes ingresar al menos 3 caracteres',
                required: 'Por favor ingresa un descripción del producto',
              }" />
            <FormKit type="number" id="price" name="price" label="Precio" placeholder="Ingresa un precio"
              :value="this.product.price" min="1" validation="required|min:1" validation-visibility="dirty"
              :validation-messages="{
                min: 'El precio debe ser mayor',
                required: 'Por favor ingresa un precio del producto',
              }" />
            <FormKit type="number" id="stock" name="stock" label="Stock" placeholder="Ingresa un stock"
              :value="this.product.stock" min="0" validation="required|min:0" validation-visibility="dirty"
              :validation-messages="{
                min: 'El stock debe ser mayor',
                required: 'Por favor ingresa un stock del producto',
              }" />
            <FormKit type="url" id="image" name="image" label="Imagen" placeholder="Ingresa una imagen"
              :value="this.product.image" validation="required|url" validation-visibility="dirty" :validation-messages="{
                url: 'Debes ingresar una url válida',
                required: 'Por favor ingresa un imagen del producto',
              }" />
            <div class="d-flex mt-4 justify-content-evenly align-items-end">
              <div>
                <b-button to="/admin/products-management" class="btn-chip p-3 d-flex align-items-center">Volver
                </b-button>
              </div>
              <FormKit v-if="this.creationProduct || !this.creationSuccess" type="submit"
                :label="this.creationProduct ? 'Crear producto' : 'Actualizar'"
                :classes="{ outer: '$reset', input: 'btn-chip p-3 d-flex align-items-center' }"
                @click="() => { this.loginFail = false; }" />                
              <FormKit v-else type="button" label="Crear otro producto"
                :classes="{ outer: '$reset', input: 'btn-chip p-3 d-flex align-items-center' }"
                @click="() => { this.resetForm(); this.creationProduct = true; this.creationSuccess = false; }"
                :disabled="false" />
            </div>
          </div>
        </div>
        <div v-else-if="(typeof (this.id) === 'number')" class="product-edition-container"> Producto con id <strong>
            {{ id }} </strong>: No fue encontrado</div>
        <div v-else>
          <div v-if="this.id">Producto con id: <strong>{{ id }}</strong> no fue encontrado</div>
          <div> Debes ingresar una id tipo <strong>numérica</strong> </div>
        </div>
      </FormKit>
    </div>
    <div v-else class="container h5 custom-height d-flex justify-content-center align-items-center">Loading...</div>
  </div>
  <div v-else>
    <div class="h1 mt-5 mb-5 text-danger">No autorizado</div>
    <LoginUser />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoginUser from './LoginUser.vue';

export default {
  name: 'ProductCreateEdit',
  components: {
    LoginUser
  },
  props: {
  },
  data() {
    return {
      updated: false,
      creationProduct: false,
      creationSuccess: false,
      formData: {},
      isDisabled: false,
      componentKey: 0,
      clickedSubmit: false,
    };
  },
  created() {
    if (this.$route.params.param === 'new') {
      this.clearProduct();
      this.creationProduct = true;
      return;
    }
    if (this.id === null) {
      return null;
    }
    if (!(typeof (this.id) === 'number')) {
      return null;
    }
    (async () => {
      await this.getProductFromAPI(this.id);
    })();

  },
  methods: {
    ...mapActions('productsModule', ['getProductFromAPI', 'createProduct', 'updateProduct', 'clearProduct']),
    resetForm() {
      this.$formkit.get('title').input();
      this.$formkit.get('description').input();
      this.$formkit.get('price').input();
      this.$formkit.get('stock').input();
      this.$formkit.get('image').input();
    },
    async submitHandler() {
      this.clickedSubmit = true;
      this.creationSuccess = false;

      this.formData.price = Number(this.formData.price);
      this.formData.stock = Number(this.formData.stock);

      if (this.creationProduct) {
        await this.createProduct(this.formData);
        this.isDisabled = true;
        this.creationProduct = false;
        this.creationSuccess = true;
        return;
      }
      await this.updateProduct({ id: this.id || this.product.id, product: this.formData }); //  this.product.id: is used after creation product to get the id from Api response in this same view
      this.updated = true;
    },

    cleanUpdatedMessage() {
      this.updated = false;
    },
  },
  computed: {
    ...mapGetters('productsModule', ['getLoading', 'getProduct']),
    ...mapGetters('userModule', ['getUser', 'getIsUserAuthenticate']),
    user() {
      return this.getUser;
    },
    isUserAuthenticated() {
      return this.getIsUserAuthenticate;
    },
    product() {
      if (this.$route.params.param === 'new' && !this.clickedSubmit) {
        return {};
      }
      return this.getProduct || {};
    },
    loading() {
      return this.getLoading;
    },
    id() {
      if (!this.$route.params.id) {
        return null;
      }
      return (Number(this.$route.params.id) || this.$route.params.id);
    },
  },

};
</script>

<style >
.my-label,
.my-help {
  text-align: start;
}

.my-legend {
  text-align: start;
  width: 60px;
}

.product-edition-container {
  width: 950px;
  height: auto;
  border: 1px solid #e4e4e4;

  padding: 1.5em;
  border-radius: 1em;
  margin: 0 auto 1em auto;
}

.product-image {
  opacity: 0;
  transition: opacity 1s ease;
  max-width: 360px;
}

.custom-height {
  height: calc(100vh - (66px + 45px + 48px + 8px))
}

.container-message-confirmation {
  height: 3.5rem;
}

.success {
  padding: 0.75em;
  border-radius: 0.5em;
  background-color: lightgreen;
}
</style>
