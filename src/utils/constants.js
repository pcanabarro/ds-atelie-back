export default {
  QUERIES: {
    ALL_PRODUCTS: 'SELECT * FROM products;',
    SPECIFIC_PRODUCTS: 'SELECT * FROM products WHERE $1;',
    CREATE_PRODUCT: 'INSERT INTO products VALUES($1);'
  }
}