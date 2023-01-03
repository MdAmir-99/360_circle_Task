const express = require( 'express' );
const mongoose = require( 'mongoose' );
const dotenv = require( 'dotenv' );
const userRoute = require( './route/userRoute' )
const todoRoute = require( './route/todoRoute' )
const cors = require( 'cors' );
dotenv.config( {
    path: './config.env'
} )

const PORT = process.env.PORT || 8080;
const app = express();

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

mongoose.set( 'strictQuery', true );
mongoose.connect( process.env.DB_CON, { useNewUrlParser: true } )
    .then( () => console.log( 'DB is Connected Successfully ✔' ) )
    .catch( ( err ) => console.log( err.message ) );

app.use( '/user', userRoute );
app.use( '/todo', todoRoute );
app.listen( PORT, ( err ) =>
{
    if ( err )
        console.log( err.message );
    else
        console.log( `Server @ 🚀 http://localhost:${ PORT }` )
} )