const { Schema, model } = require( 'mongoose' );
const userSchema = new Schema( {
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    }
} )

userSchema.pre( 'save', function ()
{
    this.confirmPassword = undefined;
} )

module.exports = model( 'user', userSchema )