import Database from '../connections/database.js'
import constants from '../utils/constants.js'

export default class ProductsController {
  static getProducts = (req, res) => {
    try {
      result = Database.query(constants.QUERIES.ALL_PRODUCTS)
      res.status(200).json({ data: result.rows })
    } catch (e) {
      console.error('error fetching products list', e.message)
    }
  }
}