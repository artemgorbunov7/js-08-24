<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String,
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
