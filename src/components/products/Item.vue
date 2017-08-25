<template>
    <section class="big-product">
        <div class="container">
            <div class="row">
                <div class="col-sm-4 product">
                    <img v-if="hasImages()" :src="data.images[0].name" alt="t-shirt" class="img-responsive img-rounded">
                    <img v-if="!hasImages()" :src="'//dummyimage.com/600x681/fff/000.png&text=Bild+folgt'" class="img-responsive img-rounded">
                </div>
                <div class="col-sm-8 info">
                    <div class="info-wrapper">
                        <h2>{{ data.name }}</h2>
                        <p class="lead">
                            {{ data.description }}
                        </p>

                        <div class="alert alert-danger col-xs-12 col-sm-6" v-if="this.variantError">Bitte wähle eine Größe aus.</div>

                        <ul class="product-info list-unstyled has-error">

                            <li class="size has-error" v-if="hasVariants()">
                                <variant v-bind:variants="data.variants" v-on:variantChanged="variantHasChanged"></variant>
                            </li>
                            <li class="amount">
                                <amount v-on:amountChanged="amountHasChanged"></amount>
                            </li>
                            <li class="price">
                                {{ outputPrice }}
                            </li>
                        </ul>
                    </div>
                    <a v-on:click.prevent="addToCart" class="add-to-cart btn btn-unique" v-bind:class="{ successfullyAddedToCart: this.successfullyAdded }">{{ addToBasketButtonValue }} <i v-if="!this.successfullyAdded" class="icon-cart-1"></i><i v-if="this.successfullyAdded" class="icon-like"></i></a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

  import Variant from './Variant';
  import Amount from './Amount';

  export default {
    components: {
      variant: Variant,
      amount: Amount,
    },
    name: 'Product',
    data() {
      return {
        price: this.data.basePrice,
        amount: 1,
        variant: null,
        basePrice: this.data.basePrice,
        loading: false,
        variantError: false,
        successfullyAdded: false,
      };
    },
    props: {
      data: {},
    },
    methods: {
      hasImages() {
        return (this.data.images.length > 0);
      },
      hasVariants() {
        return (this.data.variants.length > 1);
      },
      isVariantSelected() {
        return (this.hasVariants() && this.variant !== null);
      },
      variantHasChanged(variant) {
        // eslint-disable-next-line
        this.variant = variant;
        this.calculatePrice();
        this.variantError = false;
      },
      amountHasChanged(amount) {
        this.amount = amount;
        this.calculatePrice();
      },
      calculatePrice() {
        if (this.variant === null) {
          this.price = this.basePrice;
        } else {
          this.price = this.variant.price;
        }
      },
      resetSuccessfullyAdded() {
        const self = this;
        setTimeout(() => {
          self.successfullyAdded = false;
        }, 2000);
      },
      addToCart() {
        if (this.hasVariants()) {
          if (!this.isVariantSelected()) {
            this.variantError = true;
            return;
          }
          this.variantError = false;
        }
        // eslint-disable-next-line
        this.loading = true;
        const postData = {
          productId: this.data.id,
          amount: this.amount,
          price: this.price,
          variant: this.variant,
        };
        // eslint-disable-next-line
        this.$http.post(`/api/cart/${this.cartKey}`, postData).then((response) => {
          this.loading = false;
          this.$store.commit('increment', this.amount);
          this.successfullyAdded = true;
          this.resetSuccessfullyAdded();
        }, (response) => {
          // eslint-disable-next-line
          console.log(response);
          this.loading = false;
        });
      },
    },
    computed: {
      totalPrice() {
        return parseFloat(this.price * this.amount).toFixed(2);
      },
      outputPrice() {
        return `${this.totalPrice} €`;
      },
      cartKey() {
        return this.$localStorage.get('cartKey');
      },
      addToBasketButtonValue() {
        if (this.loading) {
          return 'Bitte warten';
        }
        return (this.successfullyAdded ? 'Erfolgreich. Danke!' : 'In den Warenkorb');
      },
    },
  };
</script>
