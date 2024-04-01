import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

class Database {
  constructor() {
    this._pool = mysql.createPool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    })

    this.createTables()
    this.seed()

    this._pool.on('error', (err) => {
      console.error('Unexpected error', err)
    })
  }

  async query(sql, values) {
    return new Promise((resolve, reject) => {
      this._pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error getting connection from pool', err)
          reject(err)
        } else {
          connection.query(sql, values, (error, results, fields) => {
            connection.release()
            if (error) {
              console.error('Error executing query', error)
              reject(error)
            } else {
              resolve(results)
            }
          })
        }
      })
    })
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
}

export default new Database()
