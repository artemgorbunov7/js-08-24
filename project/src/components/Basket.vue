<template>
  <div v-if="isBasketVisible" class="basket">
    <div
      class="basket__item"
      v-for="basketItem in basket"
      v-bind:key="basketItem.id"
    >
      <h4>{{ basketItem.name }}</h4>
      <p>{{ basketItem.price }}</p>
      <p>Количество: {{ basketItem.quantity }}</p>
      <button @click="$emit('remove-item', basketItem.id)">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Basket',
    props: ['isBasketVisible', 'basket'],
};
</script>
