// const { Schema } = require( 'mongoose' );
const Todo = require( '../model/todoModel' );
const User = require( '../model/userModel' );
const { isValidObjectId } = require( '../validation/validation' );

const createTodo = async ( req, res ) =>
{
    try
    {
        const { userId } = req.params;
        const { title, description } = req.body;

        if ( !title && !description )
            return res.status( 400 ).send( { status: false, message: 'All Fields are Mandetory !' } )

        if ( !isValidObjectId( userId ) )
            return res.status( 400 ).send( { status: false, message: 'invalid UserId !' } )

        // title exist or not
        const isDuplicateTitle = await Todo.find( { title } );
        if ( isDuplicateTitle.length > 0 )
            return res.status( 409 ).send( { status: false, message: 'Please enter Unique Title !' } )

        if ( title.length > 20 || description.length > 350 )
            return res.status( 400 ).send( { status: false, message: 'Title length should be less then 20 OR desription length should be less then 350' } )

        const passData = { userId, title, description };
        const todoData = await Todo.create( passData );
        return res.status( 201 ).send( { status: true, message: 'Task Added Successfully !', data: todoData } )

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )

    }
}

const getTodos = async ( req, res ) =>
{
    try
    {
        const { userId } = req.params;

        if ( !isValidObjectId( userId ) )
            return res.status( 400 ).send( { status: false, message: 'invalid UserId !' } )

        const fetchTodo = await Todo.find( { $and: [ { userId }, { isDeleted: false } ] } );
        if ( fetchTodo.length === 0 )
            return res.status( 404 ).send( { status: false, message: "No Task Added in Your Account" } )

        return res.status( 200 ).send( { status: true, data: fetchTodo } );

    } catch ( error )
    {
        console.log( error )
        return res.status( 500 ).send( { status: false, message: error.message } )

    }
}

const editTodo = async ( req, res ) =>
{
    try
    {
        const { todoId } = req.params;
        const { title, description } = req.body;
        const passData = {};

        if ( !isValidObjectId( todoId ) )
            return res.status( 400 ).send( { status: false, message: 'invalid Task ID !' } )

        if ( title )
        {
            if ( title.length > 20 )
                return res.status( 400 ).send( { status: false, message: "Title length should be less then 20 characters !" } )
            else
            {
                const isTitleExist = await Todo.findOne( { title } )
                if ( isTitleExist )
                    return res.status( 409 ).send( { status: false, message: 'Title Should be Unique !' } )
                passData[ 'title' ] = title;
            }
        }

        if ( description )
        {
            if ( description.length > 350 )
            {
                return res.status( 400 ).send( { status: false, message: "description length should be less then 350 characters !" } )
            }
            else
            {
                passData[ 'description' ] = description;
            }
        }

        await Todo.findByIdAndUpdate( todoId, passData, { new: true } );
        return res.status( 200 ).send( { status: true, message: "Task Updated Successfully !" } )

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )

    }
}

const deleteTodo = async ( req, res ) =>
{
    try
    {
        const { todoId } = req.params
        if ( !isValidObjectId( todoId ) )
            return res.status( 400 ).send( { status: false, message: 'invalid Task ID !' } )

        await Todo.findByIdAndUpdate( todoId, { isDeleted: true }, { new: true } )
        return res.status( 200 ).send( { status: true, message: "Task Deleted Successfully !" } )

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )

    }
}

module.exports = { createTodo, getTodos, editTodo, deleteTodo }