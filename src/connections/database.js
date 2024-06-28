const pg = require('pg');
const dotenv = require('dotenv');
const constants = require('../utils/constants');

dotenv.config();

class Database {
  constructor() {
    this._client = new pg.Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    this.connect();
    this.createTables();
    // this.seed();

    this._client.on('connect', () => {
      console.log('Connected');
    });

    this._client.on('error', (err) => {
      console.error('Unexpected error', err);
    });
  }

  async connect() {
    try {
      await this._client.connect();
    } catch (err) {
      console.error('Error connecting to the database', err);
    }
  }

  async query(query, params) {
    try {
      const result = await this._client.query(query, params);
      return result.rows;
    } catch (e) {
      console.error('Error executing query', e);
    }
  }

  async seed() {
    try {
      await this.query("INSERT INTO categorias (categoria_nome) VALUES ('Aneis')");
      await this.query("INSERT INTO categorias (categoria_nome) VALUES ('Brincos')");
      await this.query("INSERT INTO categorias (categoria_nome) VALUES ('Colares')");
      await this.query("INSERT INTO categorias (categoria_nome) VALUES ('Conjuntos')");
      await this.query("INSERT INTO categorias (categoria_nome) VALUES ('Pulseiras')");
      await this.query("INSERT INTO categorias (categoria_nome) VALUES ('Masculinos')");

      await this.query("INSERT INTO produtos (produto_nome, produto_preco, produto_descricao, produto_material, produto_categoria_id) VALUES ('Colar de Diamante', 11, 'Diamante', 'Diamante', 1)");
      await this.query("INSERT INTO produtos (produto_nome, produto_preco, produto_descricao, produto_material, produto_categoria_id) VALUES ('Cordinha para Óculos', 22, 'Couro', 'Couro', 2)");
      await this.query("INSERT INTO produtos (produto_nome, produto_preco, produto_descricao, produto_material, produto_categoria_id) VALUES ('Relógio de Pulso', 33, 'Aço Inoxidável', 'Aço Inoxidável', 3)");

      console.log('Seed method executed successfully');
    } catch (err) {
      console.error('Error executing seed method', err);
    }
  }

  async createTables() {
    try {
      await this.query(`
        CREATE TABLE IF NOT EXISTS categorias (
          categoria_id SERIAL PRIMARY KEY,
          categoria_nome VARCHAR(50)
        )
      `);

      await this.query(`
        CREATE TABLE IF NOT EXISTS produtos (
          produto_id SERIAL PRIMARY KEY,
          produto_nome VARCHAR(100),
          produto_preco DECIMAL(10, 2),
          produto_descricao VARCHAR(50),
          produto_material VARCHAR(50),
          produto_categoria_id INT,
          FOREIGN KEY (produto_categoria_id) REFERENCES categorias(categoria_id)
        )
      `);

      console.log('Tables created successfully');
    } catch (err) {
      console.error('Error creating tables', err);
    }
  }
}

module.exports = new Database();
