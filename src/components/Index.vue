<template>
  <div id="hello subpage">
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
        <h2 class="heading-center">Unsere Artikel</h2>
        <p class="lead">
          Im Folgenden erhälst Du eine Auswahl der verfügbaren Vereinsartikel. Nach Auswahl der entsprechenden Größe (falls vorhanden)
          genügt ein Klick auf "In den Warenkorb", um den Artikel in Deinen Warenkorb zu legen.
        </p>
        <product-filter></product-filter>
      </div>
    </section>
    <!-- End Intro Section -->

    <product-list></product-list>

    <!-- Contact Section -->
    <section class="contact">
      <div class="container text-center">
        <hr/>
        <h2 class="heading-center">Kontaktmöglichkeiten</h2>
        <p class="lead">
          Bei Fragen zum Shop, Wünschen nach neuen Artikeln und allen weiteren Anfragen nutze bitte
          die E-Mail Adresse <strong>shop@sf-bronnen.de</strong>.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
  import ProductList from './products/List';
  import ProductFilter from './products/Filter';

  export default {
    components: {
      ProductFilter,
      ProductList },
    name: 'index',
    data() {
      return {};
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
