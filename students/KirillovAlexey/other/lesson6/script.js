const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/*
/catalogData.json – получить список товаров;
/getBasket.json – получить содержимое корзины;
/addToBasket.json – добавить товар в корзину;
/deleteFromBasket.json – удалить товар из корзины.
 */

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

        xhr.open('GET', `${API_URL}${url}`, true);

        xhr.send();
    });
}


const app = new Vue({
    el: '#app',
    data: {
       goods: [],
        filteredGoods: [],
        //searchLine:'',
        cart: [],

    },
    created() {
        this.fetchGoods();



    },
    computed: {

       /* filtered() {
            console.log('hello');
            console.log(this.filteredItems);
            return filteredItems;
        }*/
    },
    methods: {
        fetchGoods() {
            return new Promise((resolve, reject) => {
                sendRequest('/catalogData.json')
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
        /*filter() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(item => regexp.test(item.product_name));
        },*/
        fetchCart() {

            new Promise((resolve, reject) => {
                sendRequest('/getBasket.json')
                    .then((cart) => {
                        this.cart = cart.contents;
                        this.cart.isVisibleCart = true;
                        resolve;
                    })
                    .catch((err) => {
                       reject(err);
                    });
            });
        },
        onChildUpdate(changed){
            console.log('here' + changed)
            this.filteredGoods = changed;
        }
    }


});

Vue.component('goods-list', {
    props: ['goods'],
    template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" v-bind:good="good"></goods-item>
    </div>
  `
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
    </div>
  `
});

Vue.component('empty',{
   props:['filtered'],
   template:`
   <p v-if="filtered.length==0">Нет данных</p>
   `
});

/*
<!--<input type="text" class="goods-search" v-model = "searchLine"/>
        <button class="search-button" type="button" @click="filter">Искать</button>-->
 */
Vue.component('search', {

    data() {
        return {
            filteredItems: [],
            searchText: ''
        }
    },
    props:['items'],
   template:`
   <div class="search">
        <input type="text" class="goods-search" v-model = "searchText"/>
        <button class="search-button" type="button" @click="filter">Искать</button>
   </div>
   `
   ,
   methods: {
       filter() {
           const regexp = new RegExp(this.searchText, 'i');


           this.filteredItems = this.items.filter(item => regexp.test(item.product_name));
           this.$emit('update', this.filteredItems)
           console.log(this.filteredItems);
       },
   }


});











