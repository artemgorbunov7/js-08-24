'use strict';
//
/* const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];
  
  const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><div class="item-img">image</div><h3>${title}</h3><p>${price}</p><button>Добавить</button></div>`;
  };
  
  const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
  }
  
  renderGoodsList(goods); */


function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
    
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}


class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><div class="item-img">image</div><h3>${this.product_name}</h3><p>${this.price}</p><button>Добавить</button></div>`;
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }
    
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
            cb();
        })
    }
    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
          const goodItem = new GoodsItem(good.product_name, good.price);
          listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
      }

    //метод, определяющий суммарную стоимость всех товаров.
    getSumPriceGoods() {
        let sumPrice = 0;
        for (let good in this.goods) {
            sumPrice += good.price;
        }
        return sumPrice;
    }
}

searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
  });

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});


//пустые классы для корзины товаров и элемента корзины товаров.
class Basket {
    constructor() {
        this.goods = [];
    }
    renderBasketItem() {}
    addBasketItem() {}
    removeBasketItem() {}
    renderBasketSumPrice() {}
}
class BasketItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {}
}