import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Todo, AddTodoResponse } from '../store/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http:HttpClient
  ) { }
  baseUrl="http://localhost:3000"
  addTODO(todo):Observable<AddTodoResponse>{
    console.log(todo)
    return this.http.post<AddTodoResponse>(`${this.baseUrl}/addTodo`,todo)
  }
  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.baseUrl}/getAllTodos`)
  }
  getTodo(todoId:string):Observable<Todo>{
    console.log(todoId)
    const params = new HttpParams().set('todo_id',todoId)
    return this.http.get<Todo>(`${this.baseUrl}/getTodo`,{params})
  }
  updateTodo(todo):Observable<Todo>{
    console.log(todo)
    const params = new HttpParams().set('todo_id',todo._id)
    return this.http.patch<Todo>(`${this.baseUrl}/updateTodo`,todo,{params})
  }
  deleteTodo(todoId):Observable<any>{
    console.log(todoId)
    const params = new HttpParams().set('todo_id',todoId)
    return this.http.delete(`${this.baseUrl}/deleteTodo`,{params})
  }
}
