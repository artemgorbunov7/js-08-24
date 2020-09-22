<template>
  <div class="search">
    <input type="text" class="goods-search" v-model = "searchText"/>
    <button class="search-button" type="button" @click="filter">Искать</button>
  </div>
</template>

<script>
export default {
name: "Search",
  props:['items'],
  data() {
    return {
      filteredItems: [],
      searchText: ''
    }
  },
  methods: {
    filter() {
      const regexp = new RegExp(this.searchText, 'i');
      this.filteredItems = this.items.filter(item => regexp.test(item.product_name));
      this.$emit('update', this.filteredItems)
      console.log(this.filteredItems);
    }
  }
}
</script>

<style scoped>

</style>