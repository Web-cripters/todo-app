import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Store } from '@ngrx/store';
import * as fromTodo from '../store/todo.reducer'
import * as TodoActions from '../store/todo.actions'
interface Priority {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  priorities: Priority[] = [
    {value: 'low-0', viewValue: 'Low'},
    {value: 'medium-1', viewValue: 'Medium'},
    {value: 'high-2', viewValue: 'High'}
  ];
  constructor(
    private fb:FormBuilder,
    private todoService:TodoService,
    private store$:Store<fromTodo.State>
  ) { }
  todoForm=this.fb.group({
    title:['',Validators.required],
    description:['',Validators.required],
    dateLimit:['',Validators.required],
    priority:['',Validators.required]
  })
  ngOnInit(): void {
  }
  onRegisterSubmit(){
    const todoForm = this.todoForm.value
    var dateLimit = this.todoForm.value.dateLimit
    const date  = new Date(+dateLimit)
    todoForm.dateLimit =  date
    console.log(typeof(todoForm.dateLimit))
    this.store$.dispatch(TodoActions.addTodo(todoForm))
    this.todoForm.reset()
  }

}
