const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
  let xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}

function makeGETRequestPromise(url) {
  return new Promise((resolve, reject) => {
    let xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(xhr.responseText)
      }
    }

    xhr.open('GET', url, true);
    xhr.send();
  });
}

class FetchButton {
  constructor(goodsList, btnText, fetchFn, renderFn) {
    this.goodsList = goodsList
    this.text = btnText
    this.fetch = fetchFn
    this.render = renderFn
  }

  create(fetchFrom) {
    const btn = document.createElement('button')

    btn.classList.add('fetch-btn')
    btn.innerHTML = this.text

    btn.addEventListener('click', () => {
      if (this.text.includes('return')) {
        this.fetch.call(this.goodsList)
          .then(() => this.render.call(this.goodsList, fetchFrom))
      } else {
        this.fetch.call(this.goodsList, () => {
          this.render.call(this.goodsList, fetchFrom)
        })
      }
    })
    return btn
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.totalPrice = 0
  }

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb()
    })
  }

  fetchGoodsPromise(cb) {
    makeGETRequestPromise(`${API_URL}/catalogData.json`)
      .then(res => JSON.parse(res))
      .then(res => this.goods = res)
      .then(() => cb())
  }

  fetchGoodsReturnPromise() {
    return makeGETRequestPromise(`${API_URL}/catalogData.json`)
      .then(res => JSON.parse(res))
      .then(res => this.goods = res)
  }

  fetchGoodsFetch(cb) {
    fetch(`${API_URL}/catalogData.json`)
      .then(res => res.json())
      .then(res => this.goods = res)
      .then(() => cb())
  }

  _calcTotalPrice() {
    this.goods.forEach((good) => this.totalPrice += good.price)
  }

  _renderTotalPrice() {
    this._calcTotalPrice()

    const div = document.createElement('div')

    div.classList.add('total-price')
    div.innerHTML = `<b>Total price:</b> ${this.totalPrice}&#36;`

    return div
  }

  render(fetchFrom) {
    const fromHtml = `<h3 class='from-html'>${fetchFrom}</h3>`
    this.totalPrice = 0
    document.querySelector('.goods-list').innerHTML = fromHtml
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price, 1);
      document.querySelector('.goods-list').appendChild(goodItem.render())
      ;
    });
    document.querySelector('.goods-list').appendChild(this._renderTotalPrice())
    document.querySelector('.goods-list').appendChild(document.createElement('hr'))
  }

  renderGoodsPromise(fetchFrom) {
    const fromHtml = `<h3 class='from-html'>${fetchFrom}</h3>`
    document.querySelector('.goods-list').innerHTML += fromHtml
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price, 1);
      document.querySelector('.goods-list').appendChild(goodItem.render())
    });
    document.querySelector('.goods-list').appendChild(this._renderTotalPrice())
    document.querySelector('.goods-list').appendChild(document.createElement('hr'))
  }

  renderGoodsReturnPromise(fetchFrom) {
    const fromHtml = `<h3 class='from-html'>${fetchFrom}</h3>`
    document.querySelector('.goods-list').innerHTML += fromHtml
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price, 1);
      document.querySelector('.goods-list').appendChild(goodItem.render())
    });
    document.querySelector('.goods-list').appendChild(this._renderTotalPrice())
    document.querySelector('.goods-list').appendChild(document.createElement('hr'))
  }

  renderGoodsFetch(fetchFrom) {
    const fromHtml = `<h3 class='from-html'>${fetchFrom}</h3>`
    document.querySelector('.goods-list').innerHTML += fromHtml
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price, 1);
      document.querySelector('.goods-list').appendChild(goodItem.render())
    });
    document.querySelector('.goods-list').appendChild(this._renderTotalPrice())
    document.querySelector('.goods-list').appendChild(document.createElement('hr'))
  }
}

class GoodsItem {
  constructor(title, price, quantity) {
    this.product_name = title;
    this.price = price;
    this.quantity = quantity;
  }

  _addToCart() {
    const CartInstance = new Cart()
    const cartItem = new CartItem(this.product_name, this.price, this.quantity)
    CartInstance.add(cartItem)
    CartInstance.render()
  }

  _removeFromCart() {
    const CartInstance = new Cart()
    CartInstance.remove()
    console.log(CartInstance.cart)
  }

  render() {
    const div = document.createElement('div')
    const name = document.createElement('h3')
    const price = document.createElement('p')
    const addBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    name.innerHTML = `<b>Name: </b>${this.product_name}`
    price.innerHTML = `<b>Price: </b>${this.price}&#36;`

    div.classList.add('goods-item')

    addBtn.innerText = 'Add'
    addBtn.classList.add('goods-item__btn')
    addBtn.addEventListener('click', () => {
      this._addToCart()
    })

    removeBtn.innerText = 'Remove'
    removeBtn.classList.add('goods-item__btn')
    removeBtn.addEventListener('click', () => {
      this._removeFromCart()
    })

    div.appendChild(name)
    div.appendChild(price)
    div.appendChild(addBtn)
    div.appendChild(removeBtn)

    return div
  }
}

class CartItem {
  constructor(title, price, quantity) {
    this.title = title
    this.price = price
    this.quantity = quantity
  }

  addItem() {
    this.cart.addItem(this.name)
  }

  removeItem() {
    this.cart.removeItem(this.name)
  }

  addQuantity() {
    const CartInstance = new Cart()
    this.quantity += 1
    CartInstance.render()
  }

  render() {
    const div = document.createElement('div')
    const btn = document.createElement('button')

    btn.innerHTML = '+'
    btn.addEventListener('click', () => {
      this.addQuantity()
    })

    div.innerHTML = `
      <h4><b>Name: </b>${this.title}</h4>
      <p><b>Price: </b>${this.price}</p>
      <p class="quantity"><b>Quantity: </b>${this.quantity}</p>
    `
    div.classList.add('cart__item')
    div.appendChild(btn)

    return div
  }
}

class Cart {
  cart = []

  constructor() {
    if (Cart._instance) {
      return Cart._instance
    }
    Cart._instance = this
  }

  fetchGoods() {

  }

  add(product) {
    this.cart.push(product)
  }

  remove(product) {
    this.cart.splice(this.cart.indexOf(product, 1))
  }

  total() {

  }

  render() {
    const cartPlace = document.querySelector('.cart')

    if (cartPlace) cartPlace.innerHTML = ''

    this.cart.forEach(item => {
      cartPlace.appendChild(item.render())
    })
  }
}

const CartInstance = new Cart()

const list = new GoodsList();

const btn1 = new FetchButton(list, 'Fetch (http)', list.fetchGoods, list.render)
const btn2 = new FetchButton(list, 'Fetch (promise)', list.fetchGoodsPromise, list.renderGoodsPromise)
const btn3 = new FetchButton(list, 'Fetch (return promise)', list.fetchGoodsReturnPromise, list.renderGoodsReturnPromise)
const btn4 = new FetchButton(list, 'Fetch (fetch)', list.fetchGoodsFetch, list.renderGoodsFetch)

document.querySelector('.btns-wrp').appendChild(btn1.create('From http'))
document.querySelector('.btns-wrp').appendChild(btn2.create('From promise'))
document.querySelector('.btns-wrp').appendChild(btn3.create('From a returned promise'))
document.querySelector('.btns-wrp').appendChild(btn4.create('From fetch'))
