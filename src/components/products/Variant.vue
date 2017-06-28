<template>
    <div class="variant-selector">
        <select class="item-size" v-model="selected" v-on:change="changeVariant">
            <option v-for="variant in variants" v-bind:value="{ variant }">{{ variant.name }}</option>
        </select>
    </div>
</template>

<script>
  export default {
    name: 'Variant',
    data() {
      return {
        selected: '',
      };
    },
    props: {
      variants: {},
    },
    methods: {
      changeVariant() {
        // eslint-disable-next-line
        this.$emit('variantChanged', this.selected);
      },
    },
  };
</script>
