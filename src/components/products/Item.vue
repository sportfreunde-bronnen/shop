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
                            <li class="size">
                                <div class="product-quantity">
                                    <div class="minus-btn">
                                        <i class="icon-android-remove"></i>
                                    </div>
                                    <input type="text" value="1" class="quantity">
                                    <div class="plus-btn">
                                        <i class="icon-android-add"></i>
                                    </div>
                                </div>
                            </li>
                            <li class="price">
                                {{ price }}
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

  export default {
    components: {
      variant: Variant,
    },
    name: 'Product',
    data() {
      return {
        price: 0,
        variant: '',
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
      variantHasChanged(test) {
        // eslint-disable-next-line
        console.log(test);
      },
    },
  };
</script>
