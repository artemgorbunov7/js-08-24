<template>

  <div class="cart" >
    <button class="cart-button" type="button" @click="showCart">Корзина</button>
    <div class="cartStyle" v-if = "isVisibleCart">
    <div class="cart-item"  v-for = "item in cartItems" :key="item.product_name" >
      <p>{{item.product_name}}</p>
      <p>{{item.price}}</p>
      <button @click="$emit('remove-item', item.id_product)">X</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Cart",
  props:['cartItems'],
  data(){
    return {
      isVisibleCart:false
    }
  },

  methods: {

    showCart(){
      console.log(this.isVisibleCart);
      this.isVisibleCart = !this.isVisibleCart;
      console.log(this.isVisibleCart);

    }
  }
}
</script>

<style scoped>

</style>