<template>
    <header class="header">
        <!-- Top Bar -->

        <!-- End Top Bar -->

        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <router-link :to="{ name: 'index' }" class="navbar-brand">Sportfreunde Bronnen 1949 e.V.</router-link>
                    <div class="navbar-buttons">
                        <button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle navbar-btn">Menu<i class="fa fa-align-justify"></i></button>
                    </div>
                </div>
                <div id="navigation" class="collapse navbar-collapse navbar-right">
                    <ul class="nav navbar-nav">
                        <li class="">
                            <router-link :to="{ name: 'index' }">Artikel</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'shoppingcart' }" class="cart">
                                <i class="icon-cart-1"></i>
                                <transition name="fade">
                                    <span class="items">{{ cartCount }}</span>
                                </transition>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
  export default {
    name: 'PageHeader',
    computed: {
      cartCount() {
        return this.$store.state.count;
      },
      cartKey() {
        return this.$localStorage.get('cartKey');
      },
    },
    mounted() {
      if (this.cartKey === null) {
        return;
      }
      this.$http.get(`/api/cart/itemcount/${this.cartKey}`).then((response) => {
        // eslint-disable-next-line
        this.$store.commit('initial', response.body.amount);
      }, (response) => {
        // eslint-disable-next-line
        console.log('FEHLER AUFGETRETEN', response);
        this.loading = false;
      });
    },
    watch: {
      // eslint-disable-next-line
      $route: (to, from) => {
        // eslint-disable-next-line
        $('.navbar-toggle').click();
      },
    },
  };
</script>

<style scoped>
    img.sfb-logo {
        height: 78px;
        width: auto;
    }
</style>
