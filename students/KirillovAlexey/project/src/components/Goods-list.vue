<template>
  <div class="goods-list" >
    <div v-for="good in goods" :key="good.product_name">
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
      <button @click="$emit('add-item', good)">Add to cart</button>
    </div>
    </div>

  </div>

</template>

<script>

export default {
name: "Goods-list",

  props: {
    goods : Array,
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  justify-content: space-around;
}
.goods-item {
  border: 1px solid black;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  border-radius: 5px;
  width: 100px;
  height: 150px;
  text-align: center;
}
</style>