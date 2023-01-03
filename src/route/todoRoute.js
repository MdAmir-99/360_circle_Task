const express = require( 'express' );
const router = express.Router();
const { createTodo, getTodos, editTodo, deleteTodo } = require( '../controller/todoController' );

router.post( '/:userId', createTodo )
    .get( '/:userId', getTodos )  // fetch all todos of specific user
    .put( '/:todoId', editTodo )
    .delete( '/:todoId', deleteTodo )


module.exports = router