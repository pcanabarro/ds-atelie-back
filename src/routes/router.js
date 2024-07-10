const express = require('express')
const ProductsController = require('../controllers/productsController.js')
const CategoriesController = require('../controllers/categoriesController.js')

module.exports = class Router {
  static getRouter() {
    const router = express.Router().all('/api')

    router.get('/health', (req, res) => { res.status(200).json({ data: req.url })})
    router.get('/ping', (req, res) => { res.status(200).json({ data: 'Pong!' })})

    router.get('/products/seed', ProductsController.seed)
    router.get('/products', ProductsController.getProducts)
    router.get('/products/:id', ProductsController.getProductById)
    router.get('/products/category/:id', ProductsController.getProductByCategory)
    router.post('/products', ProductsController.createProduct)
    router.delete('/products/:id', ProductsController.deleteProductById)

    router.get('/categories', CategoriesController.getCategories)
    router.get('/categories/:id', CategoriesController.getCategoryById)
    router.post('/categories', CategoriesController.createCategory)
    router.delete('/categories/:id', CategoriesController.deleteCategoryById)

    return router
  }
}