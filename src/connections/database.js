import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

class Database {
  constructor() {
    this._pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    })

    this._pool.on('error', (err, client) => {
      console.error('Unexpected error', err)
    })
  }

  async query(text, params) {
    const client = await this._pool.connect()
    try {
      return await client.query(query, params)
    } catch (e) {
      console.error('error executing query', e)
    }finally {
      client.release()
    }
  }

  async seed() {
    try {
      await this.query("INSERT INTO Categorias (nome) VALUES ('Joias')")
      await this.query("INSERT INTO Categorias (nome) VALUES ('Acessórios')")
      await this.query("INSERT INTO Categorias (nome) VALUES ('Produtos Masculinos')")

      await this.query("INSERT INTO Produtos (nome, categoria_id, material, preco) VALUES ('Colar de Diamante', 1, 'Diamante', 5000.00)")
      await this.query("INSERT INTO Produtos (nome, categoria_id, material, preco) VALUES ('Cordinha para Óculos', 2, 'Couro', 20.00)")
      await this.query("INSERT INTO Produtos (nome, categoria_id, material, preco) VALUES ('Relógio de Pulso', 3, 'Aço Inoxidável', 200.00)")

      console.log('Seed method executed successfully')
    } catch (err) {
      console.error('Error executing seed method', err)
    }
  }

  async createTables() {
    try {
      await this.query(`
        CREATE TABLE IF NOT EXISTS Categorias (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(50)
        )
      `)

      await this.query(`
        CREATE TABLE IF NOT EXISTS Produtos (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100),
          categoria_id INT,
          material VARCHAR(50),
          preco DECIMAL(10, 2),
          FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
        )
      `)

      console.log('Tables created successfully')
    } catch (err) {
      console.error('Error creating tables', err)
    }
  }

}

export default new Database
