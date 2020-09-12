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

class GoodsItem {
  constructor({ id_product, product_name, price }) {
    this.id = id_product;
    this.title = product_name;
    this.price = price;
  }

  render() {
    return `
      <div class="goods-item" data-id="${this.id}">
        <h3>${this.title}</h3>
        <p>${this.price} руб.</p>
        <button name="add-to-basket">Buy</button>
      </div>
    `;
  }
}

class GoodsList {
  constructor(basket) {
    this.basket = basket;
    this.goods = [];
    this.filteredGoods = [];
    this.fetchGoods()
      .then(() => {
        this.render();
      })
      .catch((err) => {
        console.log('[ERROR]', err);
      });

    document.querySelector('.goods-list').addEventListener('click', (event) => {
      if (event.target.name === 'add-to-basket') {
        const id = event.target.parentElement.dataset.id;
        const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(id));
        this.basket.addItem(item);
      }
    });

    document.querySelector('.search').addEventListener('input', (event) => {
      this.filterGoods(event.target.value);
    });
  }

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
  }

  total() {
    return this.goods.reduce((acc, cur) => acc + cur.price, 0);
  }

  filterGoods(value) {
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter(item => regexp.test(item.product_name));
    this.render();
  }

  render() {
    const goodsList = this.filteredGoods.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
  }
}

class Basket {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {

  }

  addItem(item) {
    const itemIndex = this.goods.findIndex((goodsItem) => goodsItem.id_product === item.id_product);
    if (itemIndex !== -1) {
      this.goods[itemIndex].quantity++;
    } else {
      this.goods.push({ ...item, quantity: 1 });
    }
    console.log(this.goods);
  }

  removeItem(id) {
    const itemIndex = this.goods.findIndex((goodsItem) => goodsItem.id_product === id);
    if (itemIndex !== -1) {
      this.goods.splice(itemIndex, 1);
    }
  }

  getBasketItems() {
    return this.goods;
  }

  total() {

  }

  render() {

  }
}

class BasketItem {
  constructor(item, basket) {
    this.item = item;
    this.basket = basket;
  }

  addItem() {
    this.basket.addItem(this.item.id);
  }

  removeItem() {
    this.basket.removeItem(this.item.id);
  }

  add() {
    this.item.quantity += 1;
  }

  render() {

  }
}

const basket = new Basket();
const goodsList = new GoodsList(basket);