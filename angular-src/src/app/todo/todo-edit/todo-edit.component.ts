import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import * as fromTodo from '../store/todo.reducer'
import * as TodoActions from '../store/todo.actions'
import * as TodoSelectors from '../store/todo.selectors'
import { Observable } from 'rxjs';
import { Todo } from '../store/todo.model';
import { FormBuilder, Validators } from '@angular/forms';
interface Priority {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {
  priorities: Priority[] = [
    {value: 'low-0', viewValue: 'Low'},
    {value: 'medium-1', viewValue: 'Medium'},
    {value: 'high-2', viewValue: 'High'}
  ];
  todoEditForm=this.fb.group({
    _id:null,
    title:['',Validators.required],
    description:['',Validators.required],
    dateLimit:['',Validators.required],
    priority:['',Validators.required]
  })
  constructor(
    private fb:FormBuilder,
    private store$:Store<fromTodo.State>
  ) { }

  ngOnInit(): void {
    const todo$:Observable<Todo> = this.store$.select(
      TodoSelectors.selectCurrentTodo
    )
    todo$.subscribe(currentTodo =>{
      if(currentTodo){
        this.todoEditForm.patchValue({
          title:currentTodo.title,
          description:currentTodo.description,
          dateLimit:currentTodo.dateLimit,
          priority:currentTodo.priority,
          _id:currentTodo._id
        })
      }
    })
  }
  onUpdateSubmit(){
    console.log(this.todoEditForm.value)
    this.store$.dispatch(TodoActions.updateTodo({todo:this.todoEditForm.value}))
  }
}
