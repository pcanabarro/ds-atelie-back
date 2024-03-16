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
}

export default new Database
