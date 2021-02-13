import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDo } from './todo.model';
import initialToDos from './todo.data';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  private todos: ToDo [] = initialToDos.map(el => new ToDo(el));
  private todosStore$ = new BehaviorSubject<ToDo[]>(this.todos);
  todos$ = this.todosStore$.asObservable();

  addToDo(todo: ToDo): void {
    this.todos.push(todo);
    this.todosStore$.next(this.todos);
  }

  deleteToDo(todo: ToDo | string): void {
    let id = '';
    if (todo instanceof ToDo) {
      id = todo.id;
    } else {
      id = todo;
    }
    console.log(id)
    this.todos.splice(this.todos.findIndex(el => el.id === id), 1);
    this.todosStore$.next(this.todos);
  }

  updateToDo(todo: ToDo): void {
    const existingTodo = this.todos.find(el => el.id === todo.id);
    for (let key of Object.keys(existingTodo)) {
      existingTodo[key] = todo[key]
    }
    this.todosStore$.next(this.todos);
  }
}
