import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import Router from './routes/router.js'

dotenv.config()

class App {
  constructor() {
    this._app = express()
    this._port = process.env.PORT || 3000
    this._app.use(cors())
    this._app.use(express.json())
    this._app.use('/api', Router.getRouter())
    console.log('DSAtelie back-end running at port:', this._port)
  }

  start() {
    this._app.listen(this._port)
  }
}

export default new App().start()
