import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoModel, TodoStatus } from './model/todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent, TodoFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todoList: Array<TodoModel> = [];

  currentTodo: TodoModel = {
    todotask: '',
    todostatus:TodoStatus.OPEN
  };
  
  constructor(private todoService: TodoService) {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodo().subscribe(
      (todos) => {
        console.log('Fetched todos:', todos);
        this.todoList = todos;
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  onEdit(todo: TodoModel) {
    this.currentTodo=todo;
  }

  onDelete(todo: TodoModel) {
    console.log(todo);
    if (todo._id) {
      this.todoService.deleteTodo(todo._id).subscribe(
        () => {
          this.todoList = this.todoList.filter((item) => item._id !== todo._id);
        },
        (error) => {
          console.error('Error deleting todo:', error);
        }
      );
    } else {
      console.error('Todo item has no _id:', todo);
    }
  }

  onSubmit(todo: TodoModel) {
    if (todo._id) {
      this.todoService.editTodo(todo).subscribe(
        (updatedTodo) => {
          const index = this.todoList.findIndex((item) => item._id === updatedTodo._id);
          if (index !== -1) {
            this.todoList[index] = updatedTodo;
          }
          this.resetCurrentTodo();
        },
        (error) => {
          console.error('Error updating todo:', error);
        }
      );
    } else {
      this.todoService.createTodo(todo).subscribe(
        (newTodo) => {
          this.todoList.push(newTodo);
          this.resetCurrentTodo();
          this.getTodos();
        },
        (error) => {
          console.error('Error creating todo:', error);
        }
      );
    }
  }
  resetCurrentTodo() {
    this.currentTodo = {  todotask: '' , todostatus:TodoStatus.OPEN};
  }
}
