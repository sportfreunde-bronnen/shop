<template>
    <header class="header">
        <!-- Top Bar -->

        <!-- End Top Bar -->

        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <router-link :to="{ name: 'index' }" class="navbar-brand">
                        <img class="sfb-logo" src="../../assets/img/logo_sfb.png" alt="SFB Merchandising">
                    </router-link>
                    <div class="navbar-buttons">
                        <button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle navbar-btn">Menu<i class="fa fa-align-justify"></i></button>
                    </div>
                </div>
                <div id="navigation" class="collapse navbar-collapse navbar-right">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <router-link :to="{ name: 'index' }">Startseite</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'shoppingcart' }" class="cart">
                                <i class="icon-cart-1"></i>
                                <span class="items">{{ cartItems }}</span>
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
    data() {
      return {
        cartItems: 2,
      };
    },
  };
</script>

<style scoped>
    img.sfb-logo {
        height: 78px;
        width: auto;
    }
</style>
