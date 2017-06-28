<template>
    <div class="product-quantity">
        <div class="minus-btn" v-on:click="decreaseAmount">
            <i class="icon-android-remove"></i>
        </div>
        <input type="text" :value="amount" class="quantity">
        <div class="plus-btn" v-on:click="increaseAmount">
            <i class="icon-android-add"></i>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Amount',
    data() {
      return {
        amount: 1,
      };
    },
    methods: {
      increaseAmount() {
        this.amount += 1;
        this.$emit('amountChanged', this.amount);
      },
      decreaseAmount() {
        if (this.amount - 1 === 0) {
          return;
        }
        this.amount -= 1;
        this.$emit('amountChanged', this.amount);
      },
    },
  };
</script>
