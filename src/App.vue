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
              <p>&copy; 2017 ShirtStore.com. All rights reserved.</p>
            </div>
            <div class="col-sm-6 text-right">
              <p>Template By <a href="https://ondrejsvestka.cz/" target="_blank">Ondrej Svestka</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- End Footer -->

    <!-- End scroll to top button -->
    <div id="scrollTop">
      <i class="fa fa-angle-up"></i>
    </div>
    <!-- End scroll to top button -->
  </div>
</template>

<script>
  import TopBar from './components/layout/TopBar';
  import PageHeader from './components/layout/PageHeader';

  export default {
    components: { TopBar, PageHeader },
    name: 'app',
    created() {
      // eslint-disable-next-line
      let cartKey = this.$localStorage.get('cartKey');
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
  };
</script>

<style>
</style>
