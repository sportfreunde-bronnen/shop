<template>
    <div class="cart-page-holder">
        <!-- Hero section -->
        <section class="hero">
            <div class="container">
                <h1>Ihr Warenkorb</h1>
                <p class="lead">Viel Spaß!</p>
            </div>
        </section>
        <!-- End Hero section -->

        <!-- Cart section -->
        <section class="cart">
            <div class="container">
                <div class="text-center" v-if="loading">
                    <h3>Produkte werden geladen. Bitte einen Moment Geduld.</h3>
                </div>
                <div class="cart-holder" v-if="!loading">
                    <div class="cart-heading">
                        <div class="row">
                            <div class="col-xs-6">Product</div>
                            <div class="col-xs-2">Price</div>
                            <div class="col-xs-2">Quantity</div>
                            <div class="col-xs-2">Total</div>
                        </div>
                    </div>

                    <div class="cart-body">
                        <div class="row">
                            <div class="col-xs-6">
                                <div class="product-overview clearfix">
                                    <div class="product-img pull-left">
                                        <img src="img/hero-shirt.jpg" alt="t-shirt" class="img-responsive">
                                    </div>
                                    <div class="product-details pull-left">
                                        <h3>Elegant Gray</h3>
                                        <p>X-Large</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-2">
                                <h3>70.00$</h3>
                            </div>

                            <div class="col-xs-2">
                                <div class="product-quantity">
                                    <div class="minus-btn">
                                        <i class="icon-android-remove"></i>
                                    </div>
                                    <input type="text" value="1" class="quantity">
                                    <div class="plus-btn">
                                        <i class="icon-android-add"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-2">
                                <h3>70.00$</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="total-price text-right">
                <div class="container">
                    <h3>Total:</h3>
                    <h2 class="text-primary">70.00$</h2>
                </div>
            </div>
        </section>
        <!-- End Cart section -->

    </div>
</template>

<script>
  export default {
    name: 'CartPage',
    data() {
      return {
        cart: {},
        loading: true,
      };
    },
    created() {
      this.$http.get(`/api/cart/${this.cartKey}`).then((response) => {
        this.cart = response.body;
        this.loading = false;
      }, (response) => {
        // eslint-disable-next-line
        console.log('FEHLER AUFGETRETEN', response);
        this.loading = false;
      });
    },
    computed: {
      cartKey() {
        return this.$localStorage.get('cartKey');
      },
    },
  };
</script>
