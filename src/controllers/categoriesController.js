const Database = require('../connections/database.js')
const constants = require('../utils/constants.js')

module.exports = class CategoriesController {
  // GET localhost:3001/api/categories
  static getCategories = async (req, res) => {
    try {
      const result = await Database.query(constants.QUERIES.ALL_CATEGORIES)
      res.status(200).json({ data: result })
    } catch (e) {
      console.error('error fetching categories list', e.message)
      res.status(500).json({ data: e })
    }
  }

  // GET localhost:3001/api/categories/1
  static getCategoryById = async (req, res) => {
    const { id } = req.params

    try {
      const result = await Database.query(constants.QUERIES.SPECIFIC_ID_CATEGORY, [id])
      res.status(200).json({ data: result })
    } catch (e) {
      console.error('error fetching category', e.message)
      res.status(500).json({ data: e })
    }
  }

  // POST localhost:3001/api/categories
  static createCategory = (req, res) => {
    const category = req.body
    // {
    //   categoria_nome: "ANEIS",
    // }

    try {
      Database.query(constants.QUERIES.CREATE_CATEGORY, [category.categoria_nome])
      console.log(`Category ${category.categoria_nome} created!`)
      res.status(200).json({ data: "Category Created" })
    } catch (e) {
      console.error('error creating Category', e.message)
      res.status(500).json({ data: e.message })
    }
  }

  // DELETE localhost:3001/api/categories/1
  static deleteCategoryById = (req, res) => {
    const { id } = req.params

    try {
      Database.query(constants.QUERIES.DELETE_CATEGORY, [id])
      console.log(`Category ${id} deleted!`)
      res.status(200).json({ data: `Category ${id} Deleted` })
    } catch (e) {
      console.error('error deleting Category', e.message)
      res.status(500).json({ data: e })
    }
  }
}