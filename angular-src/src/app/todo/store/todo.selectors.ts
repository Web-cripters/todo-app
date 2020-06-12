import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTodo from "./todo.reducer";

export const selectTodoFeatureState = createFeatureSelector<fromTodo.State>(
  fromTodo.todoFeatureKey
)
export const selectTodos = createSelector(
  selectTodoFeatureState,
  fromTodo.adapter.getSelectors().selectAll
)
export const selectTodoLoading = createSelector(
  selectTodoFeatureState,
  (state:fromTodo.State) => state.loading
)
export const selectTodoLoaded = createSelector(
  selectTodoFeatureState,
  (state:fromTodo.State) => state.loaded
)
export const selectTodoError = createSelector(
  selectTodoFeatureState,
  (state:fromTodo.State) => state.error
)
export const selectCurrentTodoId = createSelector(
  selectTodoFeatureState,
  (state:fromTodo.State) => state.selectedTodoId
)
export const selectCurrentTodo = createSelector(
  selectTodoFeatureState,
  selectCurrentTodoId,
  (state:fromTodo.State) => state.entities[state.selectedTodoId]
)
