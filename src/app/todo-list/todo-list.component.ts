import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoModel } from '../model/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  @Input() todos: Array<TodoModel>=[];

  @Output() onEditFn = new EventEmitter<TodoModel>();
  @Output() onDeleteFn = new EventEmitter<TodoModel>();

  onEdit(todo: TodoModel){
  this.onEditFn.emit(todo);
  }

  onDelete(todo: TodoModel){
    console.log(todo._id);
    this.onDeleteFn.emit(todo)
  }
}
