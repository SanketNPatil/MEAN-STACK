import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoModel, TodoStatus } from '../model/todo.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  @Input() todo: TodoModel = {
    todotask: '',
    todostatus:TodoStatus.OPEN
  };
  TodoStatus = TodoStatus;
  @Output() onSubmitFn = new EventEmitter<TodoModel>();

  submitForm() {
    console.log(this.todo);
    
    this.onSubmitFn.emit(this.todo);
    this.todo = { todotask: '' , todostatus:TodoStatus.OPEN};
  }
}
