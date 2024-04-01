export default {
  QUERIES: {
    ALL_PRODUCTS: 'SELECT * FROM produtos;',
    SPECIFIC_PRODUCTS: 'SELECT * FROM produtos WHERE $1;',
    CREATE_PRODUCT: 'INSERT INTO produtos (name, category_id, description, price) VALUES($1, $2, $3, $4);'
  }
}