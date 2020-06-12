import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Todo, AddTodoResponse } from './todo.model';
export const loadTodos = createAction(
  '[Todo/API] Load Todos',
)
export const loadTodosSuccess = createAction(
  '[Todo/API] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo/API] Load Todos',
  props<{ err: any }>()
);
export const loadTodo = createAction(
  '[Todo/API] Load Todo',
  props<{todoId:string}>()
)
export const loadTodoSuccess = createAction(
  '[Todo/API] Load Todo Success',
  props<{payload:{todo:Todo}}>()
)
export const loadTodoFailure = createAction(
  '[Todo/API] Load Todo Failure',
  props<{err:any}>()
)
export const addTodo = createAction(
  '[Todo/API] Add Todo',
  props<{ todo: Todo }>()
);
export const addTodoSuccess = createAction(
  '[Todo] Create Todo Success',
  props<{payload:AddTodoResponse}>()
)
export const addTodoFailure = createAction(
  '[Todo] Create Todo Failrue',
  props<{error:any}>()
)
export const upsertTodo = createAction(
  '[Todo/API] Upsert Todo',
  props<{ todo: Todo }>()
);

export const addTodos = createAction(
  '[Todo/API] Add Todos',
  props<{ todos: Todo[] }>()
);

export const upsertTodos = createAction(
  '[Todo/API] Upsert Todos',
  props<{ todos: Todo[] }>()
);

export const updateTodo = createAction(
  '[Todo/API] Upsert Todo',
  props<{ todo: Todo }>()
);
export const updateTodoSuccess = createAction(
  '[Todo/API] Update Todo Success',
  props<{ todo: Update<Todo> }>()
);
export const updateTodoFailure = createAction(
  '[Todo/API] Update Todo Failure',
  props<{err:any}>()
)

export const updateTodos = createAction(
  '[Todo/API] Update Todos',
  props<{ todos: Update<Todo>[] }>()
);

export const deleteTodo = createAction(
  '[Todo/API] Delete Todo',
  props<{ todoId: string }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo/API] Delete Todo Success',
  props<{ todoId: string }>()
);
export const deleteTodoFailure = createAction(
  '[Todo/API] Delete Todo Failure',
  props<{ err: any }>()
);

export const deleteTodos = createAction(
  '[Todo/API] Delete Todos',
  props<{ ids: string[] }>()
);

export const clearTodos = createAction(
  '[Todo/API] Clear Todos'
);
