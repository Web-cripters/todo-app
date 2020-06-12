import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { EffectsModule } from '@ngrx/effects';
import { TodoComponent } from './todo.component';
import { MaterialModule } from '../theme/material.module';
import { Routes, RouterModule } from '@angular/router';
import * as todoReducer from './store/todo.reducer'
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import * as fromTodo from './store/todo.reducer';
import { TodoEffects } from './store/todo.effects';
import { ReactiveFormsModule } from '@angular/forms';

const todoRoutes:Routes=[{path:"",component:TodoComponent}];
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug]

@NgModule({
  declarations: [TodoListComponent, TodoEditComponent, TodoAddComponent, TodoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([TodoEffects]),
    StoreModule.forFeature(todoReducer.todoFeatureKey,todoReducer.reducer,{metaReducers}),
    RouterModule.forChild(todoRoutes),

  ],
  providers:[
    TodoService
  ]
})
export class TodoModule { }
