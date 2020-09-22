<template>
  <div id="app">
    <Header class="header">
      <Search class="search">
        <SearchText v-model="searchLine" />
        <SearchBtn @filter-goods="filterGoods"/>
      </Search>
      <HeaderButton @show-cart="showCart" />
      <Cart v-show="isVisibleCart" :cart="cart">
        <CartItem
          v-for="item in cart"
          :key="item.id"
          :item="item"
        />
      </Cart>
    </Header>
    <main class="main">
      <GoodsList :filteredGoods="filteredGoods">
        <GoodsItem
          v-for="item in filteredGoods"
          :key="item.id"
          :id="item.id"
          :item="item"
          @add-to-cart="addToCart"
          @remove-from-cart="removeFromCart"
        />
        <Error v-if="isError" />
      </GoodsList>
      <TotalPrice :totalPrice="totalPrice"/>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        API_URL: 'http://localhost:3000',
        API_URL_GET_CATALOG: 'catalog',
        API_URL_GET_CART: 'cart',
        API_URL_POST_CART: 'addToCart',
        API_URL_REMOVE_FROM_CART: 'removeFromCart',
        goods: [],
        filteredGoods: [],
        cart: [],
        searchLine: '',
        isVisibleCart: false,
        isError: false,
      }
    },
    created() {
      this.fetchGoods()
      this.fetchCart()
    },
    computed: {
      totalPrice() {
        return this.goods.reduce((acc, good) => acc + good.price, 0)
      },
      checkGoodsListLength() {
        return this.filteredGoods.length
      },
      checkCartLength() {
        return this.cart.length
      },
    },
    methods: {
      fetchGoods() {
        fetch(`${this.API_URL}/${this.API_URL_GET_CATALOG}`)
          .then(goods => goods.json())
          .then(goods => this.goods = goods)
          .then(goods => this.filteredGoods = goods)
          .catch(err => {
            console.log(err)
            this.isError = true
          })
      },
      fetchCart() {
        fetch(`${this.API_URL}/${this.API_URL_GET_CART}`)
          .then(goods => goods.json())
          .then(goods => this.cart = goods)
          .catch(err => {
            console.log(err)
          })
      },
      filterGoods() {
        const regexp = new RegExp(this.searchLine, 'i')
        this.filteredGoods = this.goods.filter((good) => {
          return regexp.test(good.product_name)
        })
      },
      addToCart(event) {
        const matchId = parseInt(event.target.parentElement.id)
        const matchGood = this.goods.find(good => good.id === matchId)

        fetch(`${this.API_URL}/${this.API_URL_POST_CART}`, {
          method: 'POST',
          body: JSON.stringify(matchGood),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => this.fetchCart())
        .catch(err => console.log('Error while post good: ', err))
      },
      removeFromCart(event) {
        const matchId = parseInt(event.target.parentElement.id)
        const matchGood = this.goods.find(good => good.id === matchId)

        fetch(`${this.API_URL}/${this.API_URL_REMOVE_FROM_CART}`, {
          method: 'DELETE',
          body: JSON.stringify(matchGood),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => this.fetchCart())
        .catch(err => console.log('Error while delete good: ', err))
      },
      showCart() {
        this.isVisibleCart = !this.isVisibleCart
      }
    }
  }
</script>
<style>
body {
  height: 100%;
  background: #6B8FD4;
  margin: 0;
  font-family: normal, Roboto, sans-serif;
}
</style>
