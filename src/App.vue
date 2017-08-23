<template>
  <div id="app">

    <top-bar></top-bar>

    <page-header></page-header>

    <router-view></router-view>

    <!-- Footer -->
    <footer>
      <div class="copyrights">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <p>&copy; 2017 Sportfreunde Bronnen 1949 e.V.</p>
            </div>
            <div class="col-sm-6 text-right">
              Made with <3 in Laupheim
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- End Footer -->

  </div>
</template>

<script>
  import TopBar from './components/layout/TopBar';
  import PageHeader from './components/layout/PageHeader';

  export default {
    components: { TopBar, PageHeader },
    name: 'app',
    created() {
      this.cartKeyHandling();
    },
    updated() {
      this.cartKeyHandling();
    },
    methods: {
      cartKeyHandling() {
        const cartKey = this.$localStorage.get('cartKey');
        if (cartKey === null) {
          // eslint-disable-next-line
          this.$http.post('/api/cart', {}).then((response) => {
            this.$localStorage.set('cartKey', response.body.key);
          }, (response) => {
            // eslint-disable-next-line
            console.log('FEHLER AUFGETRETEN', response);
          });
        }
      },
    },
  };
</script>

<style>
</style>
