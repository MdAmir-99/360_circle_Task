const User = require( '../model/userModel' );
const { isValidField, isValidLength } = require( '../validation/validation' );
const { isValidName, isValidEmail, isValidNumber, isValidPassword } = require( '../validation/userValidation' );
const CryptoJs = require( 'crypto-js' );
const jwt = require( 'jsonwebtoken' )
const dotenv = require( 'dotenv' );
dotenv.config( { path: './config.env' } )
const createUser = async ( req, res ) =>
{
    try
    {
        const input = req.body;
        const { fullName, email, confirmPassword, mobile } = input;
        let { password } = input;

        if ( !isValidLength( input ) )
            return res.status( 400 ).send( { status: false, message: "please Enter mandatory fileds" } )

        if ( !isValidField( fullName ) &&
            !isValidField( email ) &&
            !isValidField( password ) &&
            !isValidField( confirmPassword ) &&
            !isValidField( mobile ) )
            return res.status( 400 ).send( { status: false, message: 'please fill Mandatory Fields' } )

        if ( !isValidName( fullName ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid Name" } )

        if ( !isValidEmail( email ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid Email" } )

        if ( !isValidNumber( mobile ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid mobile number" } )

        // password Validations
        if ( !isValidPassword( password ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid password" } )

        if ( !isValidPassword( confirmPassword ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid password" } )

        if ( password !== confirmPassword )
            return res.status( 400 ).send( {
                status: false, message: "Password & Confirm password is not matched !"
            } );

        const encPassword = CryptoJs.AES.encrypt( password, process.env.AES_KEY ).toString()

        input.password = encPassword


        // Check Duplicacy

        const isExistUser = await User.findOne( { $or: [ { email }, { mobile } ] } )

        if ( isExistUser )
            return res.status( 409 ).send( { stats: false, message: "You already registered Please Login" } )


        const userData = await User.create( input );
        return res.status( 201 ).send( { status: true, message: 'User Registered Succussfully !', data: userData } )

    } catch ( error )
    {
        console.log( error )
        return res.status( 500 ).send( { status: false, message: error.message } )
    }

}

const loginUser = async ( req, res ) =>
{
    try
    {
        const input = req.body;
        const { email, password } = input;

        if ( !isValidField( email ) && !isValidField( password ) )
            return res.status( 400 ).send( { status: false, message: "please Fill the fileds !" } )

        if ( !isValidEmail( email ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid Email or password !" } )

        if ( !isValidPassword( password ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid Email or password !" } )


        // check User is Exist or not

        const isUserExist = await User.findOne( { email } ).lean();
        if ( !isUserExist )
            return res.status( 401 ).send( { status: false, message: "Username or password Incorrect !" } )

        const decPassword = CryptoJs.AES.decrypt( isUserExist.password, process.env.AES_KEY ).toString( CryptoJs.enc.Utf8 )

        if ( password !== decPassword )
            return res.status( 401 ).send( { status: false, message: "please Enter valid Email or password !" } )

        let payload = {
            userId: isUserExist._id,
            exp: Math.floor( Date.now() / 1000 ) + 24 * 60 * 60,
            iat: Math.floor( Date.now() / 1000 ),
        };
        const token = jwt.sign( payload, process.env.JWT_SEC_KEY )
        isUserExist[ 'token' ] = token;

        return res.status( 200 ).send( { status: true, message: 'loggedin Successfully !', data: isUserExist } )

    } catch ( error )
    {
        console.log( error )
        return res.status( 500 ).send( { status: false, message: error.message } )
    }

}

const changePassword = async ( req, res ) =>
{
    try
    {
        const { userId } = req.params;
        let { password, confirmPassword, email } = req.body;

        if ( !isValidEmail( email ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid Email !" } )

        const isAccountExist = await User.find( { email } );
        if ( isAccountExist.length === 0 )
            return res.status( 400 ).send( { status: false, message: "No Account Found with this Email !" } )

        if ( !isValidPassword( password ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid password !" } )

        if ( !isValidPassword( confirmPassword ) )
            return res.status( 400 ).send( { status: false, message: "please Enter valid ConfirmPassword !" } )

        if ( password !== confirmPassword )
            return res.status( 400 ).send( { status: false, message: "password and confirm password is not matched !" } )

        password = CryptoJs.AES.encrypt( password, process.env.AES_KEY ).toString()

        await User.findByIdAndUpdate( userId, { password }, { new: true } )
        return res.status( 200 ).send( { status: true, message: "password Updated Successfully !" } )

    } catch ( error )
    {
        console.log( error )
        return res.status( 500 ).send( { status: false, message: error.message } )
    }

}

module.exports = { createUser, loginUser, changePassword };