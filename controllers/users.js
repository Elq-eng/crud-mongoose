const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async( req, res = response ) => {

  const { limit = 5 , desde = 0} = req.query;
/*   const usuarios = await Usuario.find({ estado:true})
  .skip( Number(desde))
  .limit(Number(limit))

  const total = await Usuario.countDocuments({estado:true})
 */ 

  const [ total,usuario] = await  Promise.all([
      Usuario.countDocuments({estado:true}),
      Usuario.find({ estado:true})
        .skip( Number(desde))
        .limit(Number(limit))
       ])

  res.json({
   total,
   usuario
  })
    
}

const usuariosPost = async( req, res = response ) => {

  

  const { nombre,correo, password, rol } = req.body
  const usuario = new Usuario(  { nombre,correo, password, rol } )


  // verificar si el correo existe
/*   const existeEmail = await Usuario.findOne( { correo } )
  if ( existeEmail ) {
    return res.status( 400 ).json({
      msg: 'Ese correo ya existe'
    })
  } */


  //encriptar la contrasena
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync( password, salt )

  //guardar en BD
  await usuario.save()

    res.status(200).json({
        'msg': 'Post Api from controller',
        usuario
      })
      
}

const usuariosPut = async( req, res = response ) => {

  const id  = req.params.id
  const { _id,  password, google, correo,...resto } = req.body

  
  if ( password ) {
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync( password, salt )
  }
  
  const usuario = await Usuario.findByIdAndUpdate( id, resto )
  res.json({ usuario })
    
}

const usuariosDelete = ( req, res = response ) => {
    res.status(403).json({
        'msg': 'Delete Api from controller'
      })
      
}
module.exports ={

  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete
}