<template>
    <div class="variant-selector">
        <v-select :on-change="changeVariant" :options="variants"></v-select>
    </div>
</template>

<script>
  import vSelect from 'vue-select';

  export default {
    components: { vSelect },
    name: 'Variant',
    data() {
      return {};
    },
    props: {
      variants: {},
    },
    methods: {
      changeVariant(selected) {
        // eslint-disable-next-line
        this.$emit('variantChanged', this.variants[selected.value]);
      },
    },
    created() {
      this.variants.forEach(
        (itm, k) => {
          // eslint-disable-next-line
          itm.label = itm.name;
          // eslint-disable-next-line
          itm.value = k;
        });
    },
  };
</script>
