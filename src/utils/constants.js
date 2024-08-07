module.exports = {
  QUERIES: {
    ALL_PRODUCTS: "SELECT * FROM produtos;",
    SPECIFIC_ID_PRODUCTS: "SELECT * FROM produtos WHERE produto_id = $1;",
    SPECIFIC_CATEGORY_PRODUCTS: "SELECT * FROM produtos WHERE produto_categoria_id = $1;",
    CREATE_PRODUCT: "INSERT INTO produtos (produto_nome, produto_preco, produto_descricao, produto_material, produto_categoria_id) VALUES($1, $2, $3, $4, $5);",
    DELETE_PRODUCT: "DELETE FROM produtos WHERE produto_id = $1;",
    CREATE_CATEGORY: "INSERT INTO categorias (categoria_nome) VALUES ($1)",
    ALL_CATEGORIES: "SELECT * FROM categorias;",
    SPECIFIC_ID_CATEGORY: "SELECT * FROM categorias WHERE categoria_id = $1;",
    DELETE_CATEGORY: "DELETE FROM categorias WHERE categoria_id = $1;",
  }
}