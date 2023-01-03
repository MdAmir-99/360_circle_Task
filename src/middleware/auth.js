const jwt = require( 'jsonwebtoken' );
const dotenv = require( 'dotenv' );
dotenv.config( { path: './config.env' } );


const authentication = function ( req, res, next )
{
    try
    {
        let token = req.headers.authorization
        if ( !token ) return res.status( 401 ).send( { status: false, message: "token must be present in the request header" } );
        const newToken = token.split( " " )
        token = newToken[ 1 ]

        jwt.verify( token, process.env.JWT_SEC_KEY, function ( err, decodedToken )
        {
            if ( err ) return res.status( 401 ).send( { status: false, message: "token is not valid" } );
            else
            {
                req.loggedinUser = decodedToken.userId
                next();
            }
        } );

    } catch ( err )
    {
        return res.status( 500 ).send( { status: false, message: err.message } )
    }
}



module.exports = { authentication }