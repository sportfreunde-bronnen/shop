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
                            Vielen Dank für Deine Bestellung. Du erhälst in Kürze eine Bestellbestätigung per E-Mail.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cart section -->
        <section class="cart" v-if="this.hasItems() && !this.cartCheckedOut">
            <div class="container">
                <div class="text-center" v-if="loading">
                    <h3>Artikel werden geladen. Bitte einen Moment Geduld.</h3>
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
                                Wir ziehen den oben angezeigten Betrag direkt von Deinem Konto ein. Hierfür genügt uns die Angabe Deiner IBAN, die wir selbstverständlich <b>absolut vertraulich</b> behandeln werden.
                            </div>
                            <div class="col-xs-12 col-md-6" v-bind:class="{ 'has-error': hasIbanError, 'has-success': !hasIbanError }">
                                <div v-if="this.hasIbanError" class="alert alert-danger">Das ist keine gültige IBAN. Vertippt?</div>
                                <input type="text" name="iban" class="form-control" placeholder="Ihre IBAN" v-model="user.iban" required="required" aria-required="true">
                            </div>
                        </div>
                    </div>

                    <div class="delivery">
                        <hr/>
                        <h3>Versand/Lieferzeit</h3>
                        <div class="row">
                            <div class="col-xs-12">
                                Da jeder Artikel individuell für Dich hergestellt wird, beträgt die Lieferzeit aktuell <b>ca. vier Wochen</b>.
                            </div>
                        </div>
                    </div>

                    <div class="legal">
                        <hr/>
                        <h3>Datenschutz</h3>
                        <div class="row">
                            <div class="col-xs-12" v-if="this.hasLegalError">
                                <div class="alert alert-danger">
                                    Bitte akzeptiere unseren Datenschutzhinweis.
                                </div>
                            </div>
                            <div class="col-xs-12" v-bind:class="{ 'has-error': this.hasLegalError }">
                                <input type="checkbox" id="legal-hint" name="legal-hint" v-model="user.legalHintAccepted">
                                <label for="legal-hint">
                                    Ich erkläre mich damit einverstanden, dass die Sportfreunde Bronnen 1949 e.V. meine Angaben für die Bearbeitung meiner Bestellung verwenden. Eine Weitergabe an Dritte findet nicht statt, es sei denn geltende Datenschutzvorschriften rechtfertigen eine Übertragung oder die Sportfreunde Bronnen 1949 e.V. sind dazu gesetzlich verpflichtet. Sie können Ihre erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Im Falle des Widerrufs werden Ihre Daten umgehend gelöscht. Ihre Daten werden ansonsten gelöscht, wenn wir Ihre Anfrage bearbeitet haben oder der Zweck der Speicherung entfallen ist. Sie können sich jederzeit über die zu Ihrer Person gespeicherten Daten informieren. Weitere Informationen zum Datenschutz finden Sie auch in der Datenschutzerklärung dieser Webseite.
                                </label>
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
  /* eslint-disable */
  import iban from 'iban';
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
          iban: '',
          legalHintAccepted : false,
        },
        showErrorMessage: false,
        cartCheckedOut: false,
        checkoutLoading: false,
        hasIbanError: false,
        hasLegalError: false,
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
              if (!iban.isValid(this.user.iban)) {
                this.$scrollTo('div.payment-method', 500, {
                  offset: -150,
                  easing: 'ease-in',
                });
                this.hasIbanError = true;
                return false;
              } else {
                this.hasIbanError = false;
              }
              if (this.user.legalHintAccepted === false) {
                this.hasLegalError = true;
                return false;
              }
              this.hasIbanError = false;
              this.checkoutLoading = true;
              this.showErrorMessage = false;
              this.$http.post(`/api/cart/checkout/${this.cartKey}`, this.user).then((response) => {
                // eslint-disable-next-line
                if (response.body.status === 0) {
                  this.$localStorage.set('cartKey', response.body.newCartKey);
                  this.cartCheckedOut = true;
                  this.$store.commit('initial', 0);
                  this.checkoutLoading = false;
                  return true;
                }
                return false;
              }, (error) => {
                if (error) {
                  // eslint-disable-next-line
                  console.log(error);
                  this.checkoutLoading = false;
                  return false;
                }
                return false;
              });
            } else {
              this.showErrorMessage = true;
              this.$scrollTo('div.shipping-main', 500, {
                offset: -150,
                easing: 'ease-in',
              });
              return false;
            }
            return false;
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

<style>
    div.legal label {
        font-size: 1.4rem ! important;
    }

    div.legal .has-error > label {
        color: #d43f3a ! important;
    }
</style>
