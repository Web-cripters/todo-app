import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromTodo from '../store/todo.reducer'
import * as TodoActions from '../store/todo.actions'
import * as TodoSelectors from '../store/todo.selectors'
import { Observable } from 'rxjs';
import { Todo } from '../store/todo.model';
import { TodoService } from '../services/todo.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = ['title','deadline', 'description', 'priority','Options'];
  todos$:Observable<Todo[]>;
  error$:Observable<String>;
  constructor(
    private store$:Store<fromTodo.State>,
    private todoService:TodoService
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(TodoActions.loadTodos())
    this.todos$ = this.store$.pipe(select(TodoSelectors.selectTodos))
    // this.error$ = this.store$.pipe(select(TodoSelectors.selectTodoError));
  }
  editTodo(todo:Todo){
    console.log(todo)
    const todoId = todo._id
    this.store$.dispatch(TodoActions.loadTodo({todoId}))
  }
  deleteTodo(todo:Todo){
    console.log(todo)
    if(confirm("Are you Sure You want to delete the user?")){
      this.store$.dispatch(TodoActions.deleteTodo({todoId:todo._id}))
    }
  }

}
