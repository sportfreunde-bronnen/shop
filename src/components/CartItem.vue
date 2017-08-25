<template>
    <div class="cart-item">
        <div class="row">
            <div class="col-xs-6">
                <div class="product-overview clearfix">
                    <div class="product-img pull-left">
                        <img v-if="imageExists" :src="data.product.images[0].name" alt="t-shirt" class="img-responsive">
                        <img v-if="!imageExists" :src="'//dummyimage.com/200x227/fff/000.png&text=Bild+folgt'" alt="t-shirt" class="img-responsive">
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
            <div class="col-xs-12 text-left">
                <br/>
                <a class="cursor-pointer" v-on:click.prevent="deleteFromCart" v-if="!this.deletion">Artikel aus Warenkorb entfernen</a>
                <a v-if="this.deletion">Artikel wird entfernt...</a>
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
      data() {
        return {
          deletion: false,
        };
      },
      computed: {
        totalPrice() {
          return (this.data.price * this.data.amount).toFixed(2);
        },
        imageExists() {
          return (this.data.product.images.length > 0);
        },
      },
      methods: {
        deleteFromCart() {
          this.deletion = true;
          this.$emit('productDeleted', this.data);
        },
      },
    };
</script>
