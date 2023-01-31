const { Schema,model } = require('mongoose')


const UsuarioSchema = Schema({
  nombre:{
    type: String,
    required:[true, 'el nombre es obligarorio']
  },


  correo:{
    type: String,
    required:[true, 'el correo es obligarorio'],
    unique: true
  },
  

  password:{
    type: String,
    required:[true, 'el password es obligarorio'],
  },
  
  img:{
    type: String,
  },
  
  rol:{
    type: String,
    required:true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  
  estado:{
    type: String,
    default: true
  },
  
  google:{
    type: Boolean,
    default: false
  },


})

UsuarioSchema.methods.toJSON = function(){
  const { __v,password, ...usuario } = this.toObject();
  return usuario
}

module.exports =  model( 'Usuario', UsuarioSchema )