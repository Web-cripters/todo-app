import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions'
import { TodoService } from '../services/todo.service';
import { map, concatMap,exhaustMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class TodoEffects {



  constructor(
    private actions$: Actions,
    private todoService:TodoService
    ) {}
    createTodo$ = createEffect(()=>{
      return this.actions$.pipe(
        ofType(TodoActions.addTodo),
        exhaustMap(action =>
          this.todoService.addTODO(action).pipe(
            map(result=>TodoActions.addTodoSuccess({payload:result})),
            catchError(err=>of(TodoActions.addTodoFailure(err)))
        ))
      )
    })
  updateTodo$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      exhaustMap((action)=>{
        console.log(action)
       return this.todoService.updateTodo(action.todo).pipe(
        tap(console.log),
        map((todo:any)=>{
          console.log(todo)
          return TodoActions.updateTodoSuccess({todo})
        }),
        catchError(err=>of(TodoActions.updateTodoFailure({err})))
      )
      })
    )
  })
  loadTodo$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(TodoActions.loadTodo),
      exhaustMap((action)=>
      this.todoService.getTodo(action.todoId).pipe(
        tap(console.log),
        map((todo:any)=> {
          console.log(todo)
          return TodoActions.loadTodoSuccess({payload:todo})
        }),
        catchError(err=>of(TodoActions.loadTodoFailure({err})))

      ))
    )
  })
  loadTodos$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      exhaustMap(()=>
      this.todoService.getTodos().pipe(
        tap(console.log),
        map((todos:any)=>{
          console.log(todos.todos)
          return TodoActions.loadTodosSuccess({todos:todos.todos})
        }),
        catchError(err=>of(TodoActions.loadTodosFailure({err})))
      ))
    )
  })
  deleteTodo$ = createEffect(()=>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      exhaustMap((action)=>
        this.todoService.deleteTodo(action.todoId).pipe(
          tap(console.log),
          map((todoId:any)=>{
            console.log(todoId)
            return TodoActions.deleteTodoSuccess({todoId:todoId.todoId})
          }),
          catchError(err=>of(TodoActions.deleteTodoFailure({err})))
        ))
    )
  )

}
