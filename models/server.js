const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

    constructor() {
      this.app = express()
      this.port = process.env.PORT
      this.usuariosPatch = '/api/usuarios'

      // conectar db 
      this.conectarDB()


      //Middlewares
      this.middlewares()

      // Rutas de mi aplicacion 
      this.routes()
    }
    
    middlewares() {
      
      //CORS
      this.app.use( cors() )

      // Parseo y lectura del body
      this.app.use( express.json())


      // Directorio publico
      this.app.use(express.static('public'))

    }

    routes(){

      this.app.use( this.usuariosPatch , require( '../routes/users.routes' ))

    }

    listen(){

      this.app.listen( this.port, () => {
        console.log( 'listening port ' + this.port );
      }) 
        
    }


    async conectarDB() {
      await dbConnection();
    }


}

module.exports = Server;