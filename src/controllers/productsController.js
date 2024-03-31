import Database from '../connections/database.js'
import constants from '../utils/constants.js'

export default class ProductsController {
  static getProducts = async (req, res) => {
    try {
      result = await Database.query(constants.QUERIES.ALL_PRODUCTS)
      res.status(200).json({ data: result.rows })
    } catch (e) {
      console.error('error fetching products list', e.message)
      res.status(500).json({ data: e })
    }
  }

  static createProduct = (req, res) => {
    const { product } = req.body
    try {
      Database.query(constants.QUERIES.CREATE_PRODUCT, (product.name, product.price))
      console.log(`product ${product} created!`)
      res.status(200).json({ data: "Product Created" })
    } catch (e) {
      console.error('error fetching products list', e.message)
      res.status(500).json({ data: e })
    }
  }
}