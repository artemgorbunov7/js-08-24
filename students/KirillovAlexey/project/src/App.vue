<template>
  <div id="app">
    <header>
      <Search v-bind:items="goods" @update="onChildUpdate"/>
      <Cart :cartItems="cartItems" :apiurl="api_url" @remove-item="removeFromCart"/>
    </header>
    <GoodsList v-bind:goods="filteredGoods" @add-item="addToCart"/>


  </div>
</template>

<script>
import GoodsList from './components/Goods-list.vue'
import Search from "@/components/Search";
import Cart from "@/components/Cart";

//const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

export default {
  name: 'App',
  components: {
    GoodsList,
    Search,
    Cart
  },
  created() {
    this.fetchGoods();
    this.fetchCart();
  },
  data() {
    return {
      goods: [],
      filteredGoods: [],
      cartItems: [],
      api_url: 'http://localhost:3000'
    }
  },
  methods: {
    fetchGoods() {
      return new Promise((resolve, reject) => {
        fetch(`${this.api_url}/data`)
            .then((res) => {
              return res.json();
            })
            .then((goods) => {
              this.goods = goods;
              this.filteredGoods = goods;
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
      });
    },
    fetchCart(){
      return new Promise((resolve, reject) => {
        fetch(`${this.api_url}/cart`)
            .then((res) => {
              return res.json();
            })
            .then((goods) => {
              this.cartItems = goods;
              console.log(goods);
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
      });
    },
    onChildUpdate(changed){
      console.log('here' + changed)
      this.filteredGoods = changed;
    },
    showCart(){
      this.isVisibleCart = !this.isVisibleCart;
      /*if (this.cart.isVisibleCart){
        console.log("cart is visible. Fetch it");
        this.fetchCart();
      }*/
    },
    addToCart(item){
      fetch(`${this.api_url}/addToCart`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(() => {
            this.cartItems.push(item);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    removeFromCart(id) {
      //
      fetch(`${this.api_url}/removeItem/${id}`)
          .then(() => {
            this.cartItems = this.cartItems.filter(({ id_product }) => id_product !== id);
          })
          .catch((err) => {
            console.log(err);
          });

      }

    },


}
</script>

<style>
#app {


}
.cart-item {
  border: 1px solid black;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  border-radius: 5px;
  width: 100px;
  height: 150px;
  text-align: center;



}
header {
  background-color: #FFA07A;
  opacity: 0.75;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  border: 1px solid black;
  height: 50px;

}
.cart-button {
  position: absolute;
  right: 15px;
  border-radius: 25px;
  width: 100px;
  height: 40px;

}
.cartStyle {
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  padding: 10px;
  position: absolute;
  top: 70px;
  right: 15px;
  width: 300px;
  border-radius: 10px;
}
</style>
