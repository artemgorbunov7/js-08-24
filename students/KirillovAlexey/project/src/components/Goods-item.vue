<template>
  <div class="goods-item">
    <h3>{{ good.product_name }}</h3>
    <p>{{ good.price }}</p>
  </div>
</template>

<script>
export default {
name: "Goods-item",
  props: {
    good: Object,
  }
}
</script>

<style scoped>

</style>