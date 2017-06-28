<template>
  <div id="hello">
    <!-- Hero Section -->
    <section class="home-hero">
      <div class="container">

        <div class="text">
          <div class="content">
            <h1>Vereinsartikel</h1>
            <p class="hero-text">der Sportfreunde Bronnen 1949 e.V. <strong>einfach, schnell und sicher</strong> bestellen.</p>
          </div>
        </div>

      </div>
    </section>
    <!-- End Hero Section -->


    <!-- Intro Section -->
    <section class="intro">
      <div class="container text-center">
        <h2 class="heading-center">Unsere Produkte</h2>
        <p class="lead">
          Im Folgenden erhalten Sie eine Auswahl der verfügbaren Vereinsartikel. Nach Auswahl der entsprechenden Größe (falls vorhanden)
          genügt ein Klick auf "In den Warenkorb", um das Produkt Ihrem Warenkorb hinzuzufügen.
        </p>
      </div>
    </section>
    <!-- End Intro Section -->

    <product-list></product-list>

    <!-- Services Section -->
    <section class="services">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="service">
              <div class="icon">
                <i class="icon-truck"></i>
              </div>
              <div class="text">
                <h4>Advanced Shipping</h4>
                <p>Free shipping over 300$</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="service">
              <div class="icon">
                <i class="icon-headset"></i>
              </div>
              <div class="text">
                <h4>Premium Support</h4>
                <p>Free shipping over 300$</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="service">
              <div class="icon">
                <i class="icon-replay-arrow"></i>
              </div>
              <div class="text">
                <h4>30 Day Return</h4>
                <p>Free shipping over 300$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Services Section -->

    <!-- Contact Section -->
    <section class="contact">
      <div class="container text-center">
        <h2 class="heading-center">Contact Us</h2>
        <p class="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

        <div class="row">
          <div class="form-holder col-md-10 col-md-offset-1">
            <form id="contact-form" action="#" method="post">
              <div class="row">
                <div class="col-sm-6">
                  <label for="username">Your Name</label>
                  <input type="text" name="username" id="username" required>
                </div>
                <div class="col-sm-6">
                  <label for="email">Your Email</label>
                  <input type="email" name="email" id="email" required>
                </div>
                <div class="col-sm-12">
                  <label for="message">How can we help you?</label>
                  <textarea name="message" id="message" required></textarea>
                </div>
                <div class="col-sm-12 text-right submit-holder">
                  <button type="submit">Send <i class="fa fa-circle"></i></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import ProductList from './products/List';

  export default {
    components: { ProductList },
    name: 'index',
    data() {
      return {};
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
