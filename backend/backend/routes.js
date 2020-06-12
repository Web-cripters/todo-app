const express = require('express'),
      TODO = require('./todo'),
      todo = express.Router()


todo.delete('/deleteTodo',(req,res)=>{
  const todoId = req.query.todo_id
  TODO.findByIdAndRemove(todoId)
  .then(()=>{
    res.json({
      todoId,
      message:"Todo Removed from list Successfully"
    })
  })
  .catch(err=>{
    res.json({
      err
    })
  })
})
todo.patch('/updateTodo',(req,res)=>{
  const todoId = req.query.todo_id
  console.log(todoId)
  TODO.findByIdAndUpdate(todoId,req.body)
    .then(todo=>{
      console.log(todo)
      res.json({
        todo
      })
    })
    .catch(err=>{
      res.json({err})
    })
})
todo.get('/getTodo',(req,res)=>{
  const todoId = req.query.todo_id
  TODO.findById(todoId)
  .then(todo=>{
    res.json({
      todo
    })
  })
  .catch(err=>{
    res.json({err})
  })
})
todo.get('/getAllTodos',(req,res)=>{
  console.log('get all todos')
  TODO.find({})
    .then(todos=>{
      console.log(todos)
      res.json({
        todos
      })
    })
  .catch(err=>{
    console.log(err)
    res.json({
      success:false,
      err
    })
  })
})
todo.post('/addTodo',(req,res)=>{
  console.log(req.body)
  const newTodo =  new TODO(req.body)
  newTodo
  .save()
  .then((todo)=>{
    console.log(todo)
    res.json({
      success:true,
      message:"Added Todo to database",
      todo
    })
  })
  .catch(err=>{
    res.json({
      success:false,
      message:"Cannot Added to Database error occured!"
    })
  })

})

module.exports = todo