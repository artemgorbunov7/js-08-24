const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

function makeGETRequestPromise(url) {
  return new Promise((resolve, reject) => {
    let xhr

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(JSON.parse(xhr.responseText))
      }
    }

    xhr.open('GET', url, true)
    xhr.send()
  })
}

class GoodsItem {
  constructor(product_id, product_name, price) {
    this.id = product_id
    this.title = product_name
    this.price = price
  }

  render() {
    return `
      <div class="goods-item" data-id="${this.id}">
        <h3><b>Name: </b>${this.title}</h3>
        <p><b>Price: </b>${this.price}&#36;</p>
        <button class="goods-item__btn" name="add-to-cart">Buy</button>
        <button class="goods-item__btn" name="remove-from-cart">Remove</button>
      </div>
    `
  }
}

class GoodsList {
  constructor(cart) {
    this.goods = []
    this.filteredGoods = []
    this.cart = cart
    this.totalPrice = 0
    this.fetchGoodsPromise()
      .then(() => this.render())

    document.querySelector('.goods-list').addEventListener('click', (event) => {
      if (event.target.name === 'add-to-cart') {
        const id = event.target.parentElement.dataset.id
        const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(id))

        this.cart.add({...item, quantity: 1})
      }
    })

    document.querySelector('.goods-list').addEventListener('click', (event) => {
      if (event.target.name === 'remove-from-cart') {
        const id = event.target.parentElement.dataset.id
        this.cart.remove(parseInt(id))
      }
    })

    document.querySelector('.search').addEventListener('input', (event) => {
      this.filterGoods(event.target.value)
    })

  }

  fetchGoodsPromise() {
    return new Promise((resolve, reject) => {
      makeGETRequestPromise(`${API_URL}/catalogData.json`)
      .then(res => {
        this.goods = res
        this.filteredGoods = res
        resolve()
      })
    })
  }

  filterGoods(value) {
    const regexp = new RegExp(value, 'i')
    this.filteredGoods = this.goods.filter(item => regexp.test(item.product_name))
    this.render()
  }

  _calcTotalPrice() {
    this.totalPrice = 0
    this.filteredGoods.forEach((good) => this.totalPrice += good.price)
  }

  _renderTotalPrice() {
    this._calcTotalPrice()
    return `
      <div class="total-price">
        <b>Total price:</b> ${this.totalPrice}&#36;
      </div>
    `
  }

  render() {
    let listHtml = '';
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml + this._renderTotalPrice();
  }
}

class Cart {
  constructor() {
    this.cart = []
  }

  add(product) {
    const itemIndex = this.cart.findIndex(item => item.id_product === product.id_product)
    if (itemIndex !== -1) this.cart[itemIndex].quantity++
    else this.cart.push(product)
    this.render()
  }

  remove(id) {
    const itemIndex = this.cart.findIndex(item => item.id_product === id)
    if (itemIndex !== -1) this.cart.splice(itemIndex, 1)
    this.render()
  }

  total() {
    return this.cart
  }

  render() {
    const cartPlace = document.querySelector('.cart')

    if (cartPlace) cartPlace.innerHTML = ''

    this.cart.forEach(item => {
      cartPlace.innerHTML += new CartItem(item).render()
    })
  }
}

class CartItem {
  constructor(item) {
    this.title = item.product_name
    this.price = item.price
    this.quantity = item.quantity
  }

  addItem() {
  }

  removeItem() {
  }

  addQuantity() {
  }

  render() {
    return `
      <div class="cart__item">
        <h4><b>Name: </b>${this.title}</h4>
        <p><b>Price: </b>${this.price}&#36;</p>
        <p class="quantity"><b>Quantity: </b>${this.quantity}</p>
      </div>
    `
  }
}

const cart = new Cart()
const list = new GoodsList(cart)
