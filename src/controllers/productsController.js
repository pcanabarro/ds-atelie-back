import Database from '../connections/database.js'
import constants from '../utils/constants.js'

export default class ProductsController {
  static seed = async (req, res) => {
    try {
      result = await Database.seed()
      console.log(result)
      res.status(200).json({data: result})
    } catch (e) {
      console.log(e)
      res.status(500).json({data: e})
    }
  }
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
    // {
    //   name: "",
    //   category_id: 1,
    //   description: "the lazy fox",
    //   price: 2.3
    // }

    try {
      Database.query(constants.QUERIES.CREATE_PRODUCT, ( product.name, product.category_id, product.description, product.price ))
      console.log(`product ${product} created!`)
      res.status(200).json({ data: "Product Created" })
    } catch (e) {
      console.error('error fetching products list', e.message)
      res.status(500).json({ data: e })
    }
  }
}