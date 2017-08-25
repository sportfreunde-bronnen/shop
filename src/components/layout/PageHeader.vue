<template>
    <header class="header">
        <!-- Top Bar -->

        <!-- End Top Bar -->

        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <router-link :to="{ name: 'index' }" class="navbar-brand">
                    </router-link>
                    <div class="navbar-buttons">
                        <button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle navbar-btn">Menu<i class="fa fa-align-justify"></i></button>
                    </div>
                </div>
                <div id="navigation" class="collapse navbar-collapse navbar-right">
                    <ul class="nav navbar-nav">
                        <li class="sfb hidden-xs">
                            <router-link :to="{ name: 'index' }">Sportfreunde Bronnen 1949 e.V.</router-link>
                        </li>
                        <li class="">
                            <router-link :to="{ name: 'index' }">Produkte</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'shoppingcart' }" class="cart">
                                <i class="icon-cart-1"></i>
                                <span class="items">{{ cartCount }}</span>
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
  };
</script>

<style scoped>
    img.sfb-logo {
        height: 78px;
        width: auto;
    }
</style>
