import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

class Database {
  constructor() {
    this._pool = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    })

    this.createDatabase()
    this.createTables()
    this.seed()

    this._pool.on('error', (err) => {
      console.error('Unexpected error', err)
    })
  }

  async query(sql, values) {
    return new Promise((resolve, reject) => {
      this._pool.query(sql, values, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async seed() {
    try {
      await this.query("INSERT INTO Categorias (nome) VALUES ('Joias');")
      await this.query("INSERT INTO Categorias (nome) VALUES ('Acessórios');")
      await this.query("INSERT INTO Categorias (nome) VALUES ('Produtos Masculinos');")

      // await this.query("INSERT INTO Produtos (nome, categoria_id, descricao, preco) VALUES ('Colar de Diamante', 1, 'Diamante', 5000.00)")
      // await this.query("INSERT INTO Produtos (nome, categoria_id, descricao, preco) VALUES ('Cordinha para Óculos', 2, 'Couro', 20.00)")
      // await this.query("INSERT INTO Produtos (nome, categoria_id, descricao, preco) VALUES ('Relógio de Pulso', 3, 'Aço Inoxidável', 200.00)")

      console.log('Seed method executed successfully')
    } catch (err) {
      console.error('Error executing seed method', err)
    }
  }

  async createTables() {
    try {
      await this.query(`
        CREATE TABLE IF NOT EXISTS Categorias (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(50)
        )
      `)

      await this.query(`
        CREATE TABLE IF NOT EXISTS Produtos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(50),
          categoria_id INT,
          descricao VARCHAR(100),
          preco DECIMAL(10, 2),
          FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
        )
      `)

      console.log('Tables created successfully')
    } catch (err) {
      console.error('Error creating tables', err)
    }
  }

  async createDatabase() {
    try {
      await this.query("CREATE DATABASE ds-atelie;")

      console.log('Database created successfully')
    } catch (err) {
      console.error('Error creating tables', err)
    }
  }
}

export default new Database()
