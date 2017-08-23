<template>
    <div class="cart-page-holder">
        <!-- Hero section -->
        <section class="hero">
            <div class="container">
                <h1>Ihr Warenkorb</h1>
            </div>
        </section>
        <!-- End Hero section -->

        <!-- Cart section -->
        <section class="cart" v-if="this.hasItems()">
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
                        <cart-item v-for="item in cart.items" :key="item.id" v-bind:data="item" ref="cartItem"></cart-item>
                    </div>
                </div>
            </div>

            <div class="total-price text-right">
                <div class="container">
                    <h2 class="text-primary">Gesamt: {{ calculateTotalAmount() }} €</h2>
                </div>
            </div>
        </section>
        <!-- End Cart section -->

    </div>
</template>

<script>
  import CartItem from './CartItem';

  export default {
    components: { CartItem },
    name: 'CartPage',
    data() {
      return {
        cart: {},
        loading: true,
      };
    },
    beforeCreate() {
      // eslint-disable-next-line
      console.log("SICHER");
    },
    mounted() {
      this.$http.get(`/api/cart/${this.cartKey}`).then((response) => {
        this.cart = response.body;
        this.loading = false;
      }, (response) => {
        // eslint-disable-next-line
        console.log('FEHLER AUFGETRETEN', response);
        this.loading = false;
      });
    },
    methods: {
      hasItems() {
        if (this.cart.items === undefined) {
          return false;
        }
        return (this.cart.items.length > 0);
      },
      calculateTotalAmount() {
        let totalAmount = 0.00;
        // eslint-disable-next-line
        for (let item of this.cart.items) {
          totalAmount += (item.price * item.amount);
        }
        // eslint-disable-next-line
        return totalAmount.toFixed(2);
      },
    },
    computed: {
      cartKey() {
        return this.$localStorage.get('cartKey');
      },
    },
  };
</script>
