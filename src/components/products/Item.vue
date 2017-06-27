<template>
    <section class="big-product">
        <div class="container">
            <div class="row">
                <div class="col-sm-4 product">
                    <img src="static/images/Bierkrug_Frontansicht.jpg" alt="t-shirt" class="img-responsive">
                </div>
                <div class="col-sm-8 info">
                    <div class="info-wrapper">
                        <h2>{{ data.name }}</h2>
                        <p class="lead">
                            {{ data.description }}
                        </p>

                        <ul class="product-info list-unstyled">
                            <li class="size">
                                <select class="item-size" title="Choose Your Size">
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="x-large">X-Large</option>
                                </select>
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
                                70.00$
                            </li>
                        </ul>
                    </div>
                    <a href="#" class="add-to-cart btn btn-unique">add to cart <i class="icon-cart-1"></i></a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'Product',
    data() {
      return {
      };
    },
    props: {
      data: {},
    },
  };
</script>
