<template>
    <div class="cart-item">
        <div class="row">
            <div class="col-xs-6">
                <div class="product-overview clearfix">
                    <div class="product-img pull-left">
                        <img v-if="data.product.images.length > 0" :src="data.product.images[0].name" alt="t-shirt" class="img-responsive">
                        <h3 v-if="data.product.images.length == 0">Kein Bild</h3>
                    </div>
                    <div class="product-details pull-left">
                        <h3>{{ data.product.name }}</h3>
                        <p v-if="data.variant !== null">{{ data.variant.name }}</p>
                    </div>
                </div>
            </div>

            <div class="col-xs-2">
                <h3>{{ data.price }} €</h3>
            </div>

            <div class="col-xs-2">
                <div class="product-quantity">
                    <h3>{{ data.amount }}x</h3>
                </div>
            </div>

            <div class="col-xs-2">
                <h3>{{ totalPrice }} €</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <hr/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'CartItem',
      props: {
        data: {},
      },
      computed: {
        totalPrice() {
          return (this.data.price * this.data.amount).toFixed(2);
        },
      },
    };
</script>
