const { Router }  = require('express');
const { check } = require('express-validator');
const { usuariosGet,usuariosPost,usuariosPut,usuariosDelete } = require('../controllers/users');
const { esRoleValido,emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');


const router = Router()


    // get
  router.get('/', usuariosGet )


  // post
  router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
  
  ],usuariosPost)



  // put
  router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
  ], usuariosPut )  


  // delete
  router.delete('/', usuariosDelete )  

  


module.exports = router

