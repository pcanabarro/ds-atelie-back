const express = require('express')
const ProductsController = require('../controllers/productsController.js')

module.exports = class Router {
  static getRouter() {
    const router = express.Router().all('/api')

    router.get('/health', (req, res) => { res.status(200).json({ data: req.url })})
    router.get('/ping', (req, res) => { res.status(200).json({ data: 'Pong!' })})

    router.get('/products/seedDatabase', ProductsController.seed)
    router.get('/products', ProductsController.getProducts)
    router.get('/products/:id', ProductsController.getProductById)
    router.get('/products/category/:id', ProductsController.getProductByCategory)
    router.post('/products', ProductsController.createProduct)
    router.delete('/products/:myId', ProductsController.createProduct)

    return router
  }
}
