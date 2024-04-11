export default {
  QUERIES: {
    ALL_PRODUCTS: "SELECT * FROM Produtos;",
    SPECIFIC_PRODUCTS: "SELECT * FROM Produtos WHERE ? = ?;",
    CREATE_PRODUCT: "INSERT INTO Produtos (name, category_id, description, price) VALUES($1, $2, $3, $4);"
  }
}