const { Schema, model } = require( 'mongoose' );
const ObjectId = Schema.Types.ObjectId;
const todoSchema = new Schema( {
    title: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20,
    },
    description: {
        type: String,
        required: true,
        unique: true,
        maxLength: 350,
    },
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
} )


module.exports = model( 'todo', todoSchema )