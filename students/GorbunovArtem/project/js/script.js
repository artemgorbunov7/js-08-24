const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function sendRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest;
  
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }

        }
    }

    xhr.open('GET', `${API}${url}`, true);
  
    xhr.send();
  });
}

Vue.component('goods-list', {
  props: ['goods'],
  template: `
  <div v-if="!goods.lenght" class="goods-list">
    <div class="goods-item" v-for="item in goods" v-bind:key="item.id_product">
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
      <button @click="addToBasket(item)" class="cart-button">Buy</button>
    </div>
  </div>
  <div v-else class="goods-list__empty">Нет данных</div>
  `
})

Vue.component('basket', {
  props: ['basket'],
  template: `
    <div v-if="isBasketVisible" class="basket">
      <div class ="basket-item" v-for="basketItem in basket" v-bind:key="basket.id_product">
        <h3>{{ basketItem.product_name }}</h3>
        <p>{{ basketItem.price }}</p>
      <button @click="removeFromBasket(basketItem.id_product)" class="cart-button">Удалить</button>
      </div>
      </div>
  `
});

Vue.component('search', {
  props: ['value'],
  template: `
    <input type="text" class="search" v-model="searchText" v-bind:value="value""/>
  `
})

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    searchText: '',
    basket: [],
    isBasketVisible: false,
    isError: false,
  },

  created() {
    this.fetchGoods();
  },

  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchText, 'i');
      return this.goods.filter(item => regexp.test(item.product_name));
    },

    total() {
      return this.goods.reduce((acc, cur) => acc + cur.price, 0);
    },

  },

  methods: {
    
    fetchGoods() {
      return new Promise((resolve, reject) => {
        sendRequest('/catalogData.json')
          .then((goods) => {
            this.goods = goods;
            resolve();
          })
          .catch((err) => {
            this.isError = true;
            reject(err);
          });
      });
    },

    

    addToBasket(item){
      this.basket.push(item);
      },
    
    removeFromBasket(id){
      this.basket = this.basket.filter(({ id_product })=>id_product !== id);
    },

  },
});
