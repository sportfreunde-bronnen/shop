<template>
    <div>
        <hr/>
        <h3 class="heading-center">Was darf es sein?</h3>
        <a class="add-to-cart btn btn-unique" v-on:click="setFilter(0);">Alles</a>
        <a class="add-to-cart btn btn-unique" v-on:click="setFilter(2);">Was für den Kopf</a>
        <a class="add-to-cart btn btn-unique" v-on:click="setFilter(1);">Was für den Astralkörper</a>
        <a class="add-to-cart btn btn-unique" v-on:click="setFilter(3);">Egal. Hauptsache trinkbar</a>
        <hr/>
    </div>
</template>

<script>

  export default {
    name: 'ProductFilter',
    data() {
      return {};
    },
    props: {
      variants: {},
    },
    methods: {
      setFilter(filter) {
        this.$store.commit('filterCategory', filter);
      },
    },
    created() {

    },
  };
</script>
