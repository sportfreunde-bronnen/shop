<template>
    <section class="big-product">
        <div class="container">
            <div class="row">
                <div class="col-sm-4 product">
                    <img v-if="hasImages()" :src="data.images[0].name" alt="t-shirt" class="img-responsive">
                </div>
                <div class="col-sm-8 info">
                    <div class="info-wrapper">
                        <h2>{{ data.name }}</h2>
                        <p class="lead">
                            {{ data.description }}
                        </p>

                        <ul class="product-info list-unstyled">

                            <li class="size" v-if="hasVariants()">
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
                    <a v-if="!loading" v-on:click.prevent="addToCart" class="add-to-cart btn btn-unique">In den Warenkorb <i class="icon-cart-1"></i></a>
                    <a v-if="loading" href="#" class="add-to-cart btn btn-unique">Einen Moment bitte.. <i class="icon-cart-1"></i></a>
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
      variantHasChanged(variant) {
        // eslint-disable-next-line
        this.variant = variant;
        this.calculatePrice();
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
      addToCart() {
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
    },
  };
</script>
