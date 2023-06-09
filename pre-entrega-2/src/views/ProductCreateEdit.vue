<template>
  <div class="h1 mt-5">{{ this.creationProduct ? 'Creación' : 'Edición' }} de producto</div>
  <div v-if="!this.productsStore.loading" class="container d-flex justify-content-center align-items-center">
    <FormKit type="form" id="product-edition" submit-label="Register" @submit="submitHandler"
      @click="cleanUpdatedMessage" :actions="false" v-model="formData"
      incomplete-message="Por favor completa todos los campos">
      <div class="container-message-confirmation" >
        <div v-if="updated || creationSuccess" class="success">¡ {{ this.creationSuccess ? 'Creación' : 'Edición' }}
          exitosa!</div>
      </div>
      <div v-if="product" class="row product-edition-container">
        <div class="col-md-5 d-flex align-items-center justify-content-center p-3">
          <b-card-img v-if="!this.creationProduct" loading="lazy" class="product-image rounded-0"
            @load="$event.target.style.opacity = 1" :src="product.image + '/?random=' + product.id" alt="Image" />
        </div>
        <div class="col-md-7">
          <FormKit v-if="creationSuccess || !this.creationProduct" type="text" name="id" label="id" placeholder=""
            :value="product.id" disabled />
          <FormKit type="text" name="title" label="Nombre del producto" placeholder="Ingresa un nombre"
            :value="product.title" validation="required|length:3" validation-visibility="dirty" :validation-messages="{
              length: 'Debes ingresar al menos 3 caracteres',
              required: 'Por favor ingresa un nombre del producto',
            }" />
          <FormKit type="textarea" name="description" label="Descripción" placeholder="Ingresa una descripción"
            :value="product.description" validation="required|length:3" validation-visibility="dirty"
            :validation-messages="{
              length: 'Debes ingresar al menos 3 caracteres',
              required: 'Por favor ingresa un descripción del producto',
            }" />
          <FormKit type="number" name="price" label="Precio" placeholder="Ingresa un precio" :value="product.price"
            min="1" validation="required|min:1" validation-visibility="dirty" :validation-messages="{
              min: 'El precio debe ser mayor',
              required: 'Por favor ingresa un precio del producto',
            }" />
          <FormKit type="number" name="stock" label="Stock" placeholder="Ingresa un stock" :value="product.stock" min="0"
            validation="required|min:0" validation-visibility="dirty" :validation-messages="{
              min: 'El stock debe ser mayor',
              required: 'Por favor ingresa un stock del producto',
            }" />
          <FormKit type="url" name="image" label="Imagen" placeholder="Ingresa una imagen" :value="product.image"
            validation="required|url" validation-visibility="dirty" :validation-messages="{
              url: 'Debes ingresar una url válida',
              required: 'Por favor ingresa un imagen del producto',
            }" />
          <div class="d-flex mt-4 justify-content-evenly align-items-end">
            <FormKit type="submit" :label="this.creationProduct ? 'Crear producto' : 'Actualizar'"
              :classes="{ outer: '$reset', input: 'btn-chip p-3 d-flex align-items-center' }"
              @click="() => { this.loginFail = false; }" />
            <div>
              <b-button to="/admin/products-management" class="btn-chip p-3 d-flex align-items-center">Volver </b-button>
            </div>
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
</template>

<script>
import productsStore from '@/stores/productsStore';


export default {
  name: 'ProductCreateEdit',
  components: {

  },
  props: {

  },
  data() {
    return {
      productsStore,
      loading: false,
      updated: false,
      product: null,
      creationProduct: false,
      creationSuccess: false,
      formData: {}
    };
  },
  created() {
    if (this.$route.params.param === 'new') {
      this.product = {};
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
      this.product = await this.productsStore.getProduct(this.id);
    })();

  },
  methods: {
    async submitHandler() {
      this.creationSuccess = false;

      this.formData.price = Number(this.formData.price);
      this.formData.stock = Number(this.formData.stock);

      if (this.creationProduct) {
        this.product = await this.productsStore.createProduct(this.formData);
        this.creationProduct = false;
        this.creationSuccess = true;
        return;
      }

      this.product = await this.productsStore.updateProduct(this.id || this.product.id, this.formData); //  this.product.id: is used after creation product to get the id from Api response in this same view
      this.updated = true;
    },

    cleanUpdatedMessage() {
      this.updated = false;      
    },
  },
  computed: {
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

.container-message-confirmation{
 height: 3.5rem;
}

.success {
  padding: 0.75em;
  border-radius: 0.5em;
  background-color: lightgreen;
}
</style>
