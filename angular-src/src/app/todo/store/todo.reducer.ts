import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from './todo.model';
import * as TodoActions from './todo.actions';
export const todoFeatureKey = 'todos';
import * as fromRoot from '../../app-state/app-state';

export interface State extends EntityState<Todo> {
  // additional entities state properties
  selectedTodoId:string|null,
  loading:boolean,
  loaded:boolean,
  error:string
}
export interface TodoState extends fromRoot.AppState{
  todos:State
}
export function selectTodoId(todo:Todo):string{
  return todo._id;
}
export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId:selectTodoId
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  ids:[],
  entities:{},
  selectedTodoId:null,
  loaded:false,
  loading:false,
  error:""
});


export const reducer = createReducer(
  initialState,
  on(TodoActions.addTodoSuccess,
    (state, action) => adapter.addOne(action.payload.todo, state)
  ),
  on(TodoActions.upsertTodo,
    (state, action) => adapter.upsertOne(action.todo, state)
  ),
  on(TodoActions.addTodos,
    (state, action) => adapter.addMany(action.todos, state)
  ),
  on(TodoActions.upsertTodos,
    (state, action) => adapter.upsertMany(action.todos, state)
  ),
  on(TodoActions.updateTodoSuccess,
    (state, action) => adapter.updateOne(action.todo, state)
  ),
  on(TodoActions.updateTodos,
    (state, action) => adapter.updateMany(action.todos, state)
  ),
  on(TodoActions.deleteTodoSuccess,
    (state, action) => {
      console.log(action)
      return adapter.removeOne(action.todoId, state)
    }
  ),
  on(TodoActions.deleteTodos,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TodoActions.loadTodosSuccess,
    (state, action) => {
      console.log(action)
      return  adapter.setAll(action.todos, state)
    }
  ),
  on(TodoActions.loadTodoSuccess,
    (state,action)=>{
      console.log(action.payload)
      return adapter.addOne(action.payload.todo,
        {
          ...state,
          selectedTodoId:action.payload.todo._id
        })
    }),
  on(TodoActions.clearTodos,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
