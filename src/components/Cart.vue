<template>
    <div class="cart-page-holder subpage">

        <!-- Hero section -->
        <section class="hero">
            <div class="container">
                <h1>Ihr Warenkorb</h1>
            </div>
        </section>
        <!-- End Hero section -->

        <section style="padding-top: 50px; padding-bottom: 200px;" class="cart" v-if="this.loading && !this.cartCheckedOut">
            <div class="container">
                <div class="text-center" v-if="loading">
                    <h3>Warenkorb wird geladen</h3>
                </div>
            </div>
        </section>

        <section style="padding-top: 0; padding-bottom: 200px;" class="cart" v-if="this.cartCheckedOut">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="alert alert-success">
                            Vielen Dank für Ihre Bestellung. Für Details zur Lieferung und Bezahlung erhalten Sie in Kürze eine E-Mail. Ihre Sportfreunde!
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cart section -->
        <section class="cart" v-if="this.hasItems() && !this.cartCheckedOut">
            <div class="container">
                <div class="text-center" v-if="loading">
                    <h3>Produkte werden geladen. Bitte einen Moment Geduld.</h3>
                </div>
                <div class="cart-holder" v-if="!loading">
                    <div class="cart-heading">
                        <div class="row">
                            <div class="col-xs-6">Artikel</div>
                            <div class="col-xs-2">Preis</div>
                            <div class="col-xs-2">Anzahl</div>
                            <div class="col-xs-2">Betrag</div>
                        </div>
                    </div>

                    <div class="cart-body">
                        <cart-item v-on:productDeleted="productDeleted" v-for="item in cart.items" :key="item.id" v-bind:data="item" ref="cartItem"></cart-item>

                        <div class="cart-item">
                            <div class="row">
                                <div class="col-xs-10">
                                    <div class="product-overview clearfix">
                                        <h3>Versandkostenpauschale</h3>
                                    </div>
                                </div>

                                <div class="col-xs-2">
                                    <h3>6.00 €</h3>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="total-price text-right">
                <div class="container">
                    <h2 class="text-primary">Gesamt: {{ calculateTotalAmount() }} €</h2>
                </div>
            </div>

        </section>

        <section v-if="!this.hasItems() && !this.loading">
            <div class="container">
                <div class="col-xs-12">
                    Ihr Warenkorb ist leer.
                </div>
            </div>
        </section>

        <section class="shipping" v-if="this.hasItems() && !this.cartCheckedOut">

            <div class="container">

                <div class="form-holder">
                    <div class="shipping-main">
                        <h3>Rechnungsadresse</h3>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="alert alert-danger" v-if="showErrorMessage">
                                    Bitte vervollständige die rot umrandeten Angaben.
                                </div>
                            </div>
                            <div class="col-sm-6" v-bind:class="{ 'has-error': errors.has('firstname') }">
                                <input type="text" name="firstname" class="form-control" placeholder="Vorname" v-model="user.firstname" v-validate="'required'" aria-required="true">
                            </div>
                            <div class="col-sm-6" v-bind:class="{ 'has-error': errors.has('lastname') }">
                                <input type="text" name="lastname" class="form-control" placeholder="Nachname" v-model="user.lastname" v-validate="'required'" required="required" aria-required="true">
                            </div>
                            <div class="col-sm-6" v-bind:class="{ 'has-error': errors.has('email') }">
                                <input type="email" name="email" class="form-control" placeholder="E-Mail Addresse" v-model="user.email" v-validate="'required|email'" required="required" aria-required="true">
                            </div>
                            <div class="col-sm-6" v-bind:class="{ 'has-error': errors.has('phone') }">
                                <input type="text" name="phone" class="form-control" placeholder="Telefon (für Rückfragen)" v-model="user.phone" v-validate="'required'" required="" aria-required="true">
                            </div>
                            <div class="col-sm-6" v-bind:class="{ 'has-error': errors.has('street') }">
                                <input type="text" name="street" class="form-control" placeholder="Straße/Hausnummer" v-model="user.street" v-validate="'required'" required="" aria-required="true">
                            </div>
                            <div class="col-sm-2" v-bind:class="{ 'has-error': errors.has('zip') }">
                                <input type="text" name="zip" class="form-control" placeholder="PLZ" maxlength="5" v-model="user.zipcode" v-validate="'required'" required="" aria-required="true">
                            </div>
                            <div class="col-sm-4" v-bind:class="{ 'has-error': errors.has('city') }">
                                <input type="text" name="city" class="form-control" placeholder="Ort" v-model="user.city" v-validate="'required'" required="" aria-required="true">
                            </div>
                            <div class="col-sm-12">
                                <input type="checkbox" id="another-address" v-model="user.variantDelivery">
                                <label for="another-address">Abweichende Lieferadresse?</label>
                            </div>
                        </div>
                    </div>

                    <transition name="fade">
                        <div v-if="this.variantDeliveryAddressNeeded" class="shipping-alternative">
                            <h3>Lieferadresse</h3>
                            <div class="row">
                                <div class="col-sm-6" v-bind:class="{ 'has-error': errors.has('delivery-firstname') }">
                                    <input type="text" name="delivery-firstname" class="form-control" placeholder="Vorname" v-validate="`${user.variantDelivery ? 'required' : ''}`" v-model="user.delivery.firstname" required="required" aria-required="true">
                                </div>
                                <div class="col-sm-6" v-bind:class="{ 'has-error': errors.has('delivery-lastname') }">
                                    <input type="text" name="delivery-lastname" class="form-control" placeholder="Nachname" v-validate="`${user.variantDelivery ? 'required' : ''}`" v-model="user.delivery.lastname" required="required" aria-required="true">
                                </div>
                                <div class="col-sm-6" v-bind:class="{ 'has-error': errors.has('delivery-street') }">
                                    <input type="text" name="delivery-street" class="form-control" placeholder="Straße/Hausnummer" v-validate="`${user.variantDelivery ? 'required' : ''}`" v-model="user.delivery.street" required="" aria-required="true">
                                </div>
                                <div class="col-sm-2" v-bind:class="{ 'has-error': errors.has('delivery-zip') }">
                                    <input type="text" name="delivery-zip" class="form-control" placeholder="PLZ" maxlength="5" v-validate="`${user.variantDelivery ? 'required' : ''}`" v-model="user.delivery.zipcode" required="" aria-required="true">
                                </div>
                                <div class="col-sm-4" v-bind:class="{ 'has-error': errors.has('delivery-city') }">
                                    <input type="text" name="delivery-city" class="form-control" placeholder="Ort" v-model="user.delivery.city" v-validate="`${user.variantDelivery ? 'required' : ''}`" required="" aria-required="true">
                                </div>
                            </div>
                        </div>
                    </transition>

                    <div class="payment-method">
                        <hr/>
                        <h3>Bezahlung/Versand</h3>
                        <div class="row">
                            <div class="col-xs-12">
                                Die Bezahlung erfolgt per Vorkasse. Hierzu erhalten Sie im Anschluss an Ihre Bestellung eine E-Mail mit der Kontoverbindung. Da jedes Produkt individuell für Sie
                                hergestellt wird, beträgt die Lieferzeit aktuell <b>vier Wochen</b>.
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 text-center">
                            <button type="submit" class="oder-now btn btn-unique" id="shipping-submit" v-on:click.prevent="submitForm()"><i class="icon-shipping-truck"></i> {{ this.checkoutButtonText }}</button>
                        </div>
                    </div>
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
        user: {
          variantDelivery: false,
          delivery: {},
        },
        showErrorMessage: false,
        cartCheckedOut: false,
        checkoutLoading: false,
      };
    },
    beforeCreate() {
    },
    mounted() {
      this.getItems();
    },
    methods: {
      productDeleted(cartItem) {
        this.$http.delete(`/api/cart/item/${this.cartKey}/${cartItem.id}`).then((response) => {
          if (response) {
            this.getItems();
          }
        }, (error) => {
          if (error) {
            return false;
          }
          return false;
        });
      },
      getItems() {
        this.$http.get(`/api/cart/${this.cartKey}`).then((response) => {
          this.cart = response.body;
          this.loading = false;
          this.calculateItemCount();
        }, (error) => {
          if (error) {
            this.loading = false;
          }
        });
      },
      hasItems() {
        if (this.cart.items === undefined || this.cart.items === null) {
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
        // Shipping costs
        totalAmount += 6;
        return totalAmount.toFixed(2);
      },
      calculateItemCount() {
        let amount = 0;
        if (!this.hasItems()) {
          this.$store.commit('initial', 0);
          return;
        }
        // eslint-disable-next-line
        for (let item of this.cart.items) {
          amount += parseInt(item.amount, 10);
        }
        this.$store.commit('initial', amount);
      },
      submitForm() {
        if (!this.checkoutLoading) {
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.checkoutLoading = true;
              this.showErrorMessage = false;
              this.$http.post(`/api/cart/checkout/${this.cartKey}`, this.user).then((response) => {
                // eslint-disable-next-line
                if (response.body.status === 0) {
                  this.$localStorage.set('cartKey', response.body.newCartKey);
                  this.cartCheckedOut = true;
                  this.$store.commit('initial', 0);
                  this.checkoutLoading = false;
                }
              }, (error) => {
                if (error) {
                  // eslint-disable-next-line
                  console.log(error);
                  this.checkoutLoading = false;
                }
              });
            } else {
              this.showErrorMessage = true;
            }
          });
          return false;
        }
        return true;
      },
    },
    computed: {
      cartKey() {
        return this.$localStorage.get('cartKey');
      },
      variantDeliveryAddressNeeded() {
        return (this.user.variantDelivery === true);
      },
      checkoutButtonText() {
        return (this.checkoutLoading) ? 'Bitte warten' : 'Kostenpflichtig bestellen';
      },
    },
  };
</script>
