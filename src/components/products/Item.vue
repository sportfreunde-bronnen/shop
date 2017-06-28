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
                    <a href="#" class="add-to-cart btn btn-unique">Zum Warenkorb hinzufügen <i class="icon-cart-1"></i></a>
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
        variant: {},
        basePrice: this.data.basePrice,
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
        this.variant = variant;
        this.calculatePrice();
      },
      amountHasChanged(amount) {
        this.amount = amount;
        this.calculatePrice();
      },
      calculatePrice() {
        // eslint-disable-next-line
        if (this.variant.variant === undefined) {
          this.price = this.data.basePrice * this.amount;
        } else {
          this.price = this.variant.variant.price * this.amount;
        }
      },
    },
    computed: {
      outputPrice() {
        return `${this.price} €`;
      },
    },
  };
</script>
