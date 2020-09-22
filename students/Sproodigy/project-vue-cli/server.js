const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.use(express.static('.'))
app.use(cors())
app.use(express.json())

function getCatalogData(req, res) {
  fs.readFile('./catalog.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('readFile Error', err)
      res.status(500).send('ServerError')
      return
    }

    const catalog = JSON.parse(data)
    res.json(catalog)
  })
}

function getCartData(req, res) {
  fs.readFile('./cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('readFile Error', err)
      res.status(500).send('ServerError')
      return
    }

    const cart = JSON.parse(data)
    res.json(cart)
  })
}

function addGoodToCart(req, res) {
  fs.readFile('./cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('readFile Error', err)
      res.status(500).send('ServerError')
      return
    }

    const cart = JSON.parse(data)
    const action = 'Item added to cart!'
    const itemIndex = cart.findIndex(good => good.id === req.body.id)
    const itemName = req.body.product_name

    if (itemIndex !== -1) {
      cart[itemIndex].quantity++
    } else {
      cart.push({ ...req.body, quantity: 1 })
    }

    fs.writeFile('./cart.json', JSON.stringify(cart, null, 2), (err) => {
      if (err) {
        console.log('Error writeFile: ', err)
        return
      }
      saveLogActions(req, res, action, itemName)
      res.send(action)
    })
  })
}

function removeGoodFromCart(req, res) {
  fs.readFile('./cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('readFile Error', err)
      res.status(500).send('ServerError')
      return
    }

    const cart = JSON.parse(data)
    const action = 'Item removed from cart!'
    const itemIndex = cart.findIndex(good => good.id === req.body.id)
    const itemName = req.body.product_name

    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 0) {
        cart[itemIndex].quantity--
      }

      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1)
      }
      saveLogActions(req, res, action, itemName)
    }

    fs.writeFile('./cart.json', JSON.stringify(cart, null, 2), (err) => {
      if (err) {
        console.log('Error writeFile: ', err)
        return
      }
      res.send(action)
    })
  })
}

function saveLogActions(req, res, action, itemName) {
  fs.readFile('./stat.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('readFile Error', err)
      res.status(500).send('ServerError')
      return
    }

    const stat = JSON.parse(data)
    const date = new Date().toLocaleDateString()
    const newEntry = {
      good: itemName,
      data: {
        [date]: {
          [action]: 1,
        }
      },
    }

    const matchEntry = stat.find(item => item.good === itemName)

    if (matchEntry) {
      if (!matchEntry.data[date]) {
        matchEntry.data[date] = { [action]: 1 }
      } else if (!matchEntry.data[date][action]) {
        matchEntry.data[date][action] = 1
      } else if (matchEntry.data[date][action]) {
        matchEntry.data[date][action]++
      }
    } else {
      stat.push(newEntry)
    }

    fs.writeFile('./stat.json', JSON.stringify(stat, null, 2), (err) => {
      if (err) {
        console.log('Error writeFile: ', err)
        return
      }
    })
  })
}

app.get('/catalog', (req, res) => {
  getCatalogData(req, res)
})

app.get('/cart', (req, res) => {
  getCartData(req, res)
})

app.post('/addToCart', (req, res) => {
  addGoodToCart(req, res)
})

app.delete('/removeFromCart', (req, res) => {
  removeGoodFromCart(req, res)
})

app.listen(3000, () => {
  console.log('server is running on port 3000!')
})
