<template>
    <div>
        <hr/>
        <h3 class="heading-center">Was darf es sein?</h3>
        <a class="add-to-cart btn btn-unique" v-bind:class="{ active: (0 == currentCategory) }" v-on:click="setFilter(0);">Alles</a>
        <a class="add-to-cart btn btn-unique" v-bind:class="{ active: (2 == currentCategory) }" v-on:click="setFilter(2);">Was für den Kopf</a>
        <a class="add-to-cart btn btn-unique" v-bind:class="{ active: (1 == currentCategory) }" v-on:click="setFilter(1);">Was für den Astralkörper</a>
        <a class="add-to-cart btn btn-unique" v-bind:class="{ active: (3 == currentCategory) }" v-on:click="setFilter(3);">Egal. Hauptsache trinkbar</a>
        <hr/>
    </div>
</template>

<script>

  export default {
    name: 'ProductFilter',
    data() {
      return {
        currentCategory: 0,
      };
    },
    props: {
      variants: {},
    },
    methods: {
      setFilter(filter) {
        this.$store.commit('filterCategory', filter);
        this.currentCategory = filter;
      },
    },
    created() {

    },
  };
</script>
