const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const Router = require('./routes/router.js')

dotenv.config()

class App {
  constructor() {
    this._app = express()
    this._port = process.env.SERVER_PORT || 3000
    this._app.use(cors())
    this._app.use(express.json())
    this._app.use('/api', Router.getRouter())
    console.log('DSAtelie back-end running at port:', this._port)
  }

  start() {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    this._app.listen(this._port)
  }
}

module.exports = new App().start()
