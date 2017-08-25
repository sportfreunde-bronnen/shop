/* eslint-disable */
<template>
    <div id="div-product-list">
        <transition name="fade">
            <div class="text-center" v-if="loading" key="loading">
                <h3>Artikel werden geladen. Bitte einen Moment Geduld.</h3>
            </div>
            <div v-if="!loading" id="product-list" key="list">
                <product v-for="product in products" :key="product.id" v-bind:data="product"></product>
            </div>
        </transition>
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
        currentCategory: 0,
      };
    },
    created() {
      this.getProducts(0);
      const vthis = this;
      this.$store.subscribe((mutation) => {
        if (mutation.type === 'filterCategory' && mutation.payload !== vthis.currentCategory) {
          this.getProducts(mutation.payload);
          vthis.currentCategory = mutation.payload;
        }
      });
    },
    methods: {
      getProducts(category = 0) {
        this.loading = true;
        let url = '';
        if (category > 0) {
          url = `/api/product?category=${category}`;
        } else {
          url = '/api/product';
        }
        this.$http.get(url).then((response) => {
          // eslint-disable-next-line
          this.products = response.body;
          this.loading = false;
        }, (error) => {
          if (error) {
            // eslint-disable-next-line
            alert('Es ist ein Fehler aufgetreten!');
          }
          this.loading = false;
        });
      },
    },
  };
</script>
