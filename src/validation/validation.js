const mongoose = require( 'mongoose' );
const isValidField = ( value ) =>
{
    if ( typeof value == 'undefined' || typeof value == null ) return false;
    else if ( typeof value == 'string' && value.trim().length == 0 ) return false;
    return true;
}

const isValidLength = ( val ) =>
{
    return Object.keys( val ).length > 0
}

const isValidObjectId = ( id ) =>
{
    return mongoose.Types.ObjectId.isValid( id )
}



module.exports = { isValidField, isValidLength, isValidObjectId }