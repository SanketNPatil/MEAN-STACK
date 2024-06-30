import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoModel } from './model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  URL = 'http://localhost:3000';
  getTodo() {
    return this.http.get<TodoModel[]>(`${this.URL}/todo`);
  }

  createTodo(todo: TodoModel) {
    return this.http.post<TodoModel>(`${this.URL}/todo`, todo);
  }

  editTodo(todo: TodoModel) {
    console.log('Edit todo service', todo);
    return this.http.put<TodoModel>(`${this.URL}/todo/${todo._id}`, todo);
  }

  deleteTodo(id: any) {
    return this.http.delete<void>(`${this.URL}/todo/${id}`);
  }
}
