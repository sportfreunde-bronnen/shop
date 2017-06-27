/* eslint-disable */
<template>
    <div id="div-product-list">
        <div class="text-center" v-if="loading">
            <h3>Produkte werden geladen. Bitte einen Moment Geduld.</h3>
        </div>
        <div v-if="!loading" id="product-list">
            <product v-for="product in products" :key="product.id" v-bind:data="product"></product>
        </div>
    </div>
</template>

<script>
  import Product from './Item';

  export default {
    components: { Product },
    name: 'ProductList',
    data() {
      return {
        products: [],
        loading: false,
      };
    },
    created() {
      this.loading = true;
      this.$http.get('/api/product').then((response) => {
        this.products = response.body;
        this.loading = false;
      }, (response) => {
        // eslint-disable-next-line
        console.log('FEHLER AUFGETRETEN', response);
        this.loading = false;
      });
    },
  };
</script>
