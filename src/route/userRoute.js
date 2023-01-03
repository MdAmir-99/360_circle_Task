const express = require( 'express' );
const router = express.Router();
const { createUser, loginUser, changePassword } = require( '../controller/userController' );



// User Routing

router.post( '/register', createUser )
    .post( '/login', loginUser )
    .patch( '/recoverPassword/:userId', changePassword )



module.exports = router;
