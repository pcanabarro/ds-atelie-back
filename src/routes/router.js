import express from 'express'
import ProductsController from '../controllers/productsController.js'

export default class Router {
  static getRouter() {
    const router = express.Router().all('/api')

    router.get('/health', (req, res) => { res.status(200).json({ data: req.url })})
    router.get('/ping', (req, res) => { res.status(200).json({ data: 'Pong!' })})

    router.get('/products', ProductsController.getProducts)
    router.get('/seed', ProductsController.seed)
    router.post('/products', ProductsController.createProduct)
    return router
  }
}