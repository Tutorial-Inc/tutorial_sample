import { Injectable } from '@angular/core';
import { ToDo } from './todo.model';
import { Observable, from, of } from 'rxjs';
import { TodoProvider } from './todo-provider';
import todos from './todo.data';

@Injectable({
  providedIn: "root",
})
export class FakeTodoService implements TodoProvider {
  constructor() {}

  addToDo(todo: ToDo): Observable<{}> {
    console.log("addToDo");
    todos.push(todo);
    return of({ todo });
  }

  fetchToDos(): Observable<{ items?: any }> {
    console.log("fetchTodo");
    return of({ items: todos });
  }

  deleteToDo(todo: ToDo): Observable<{}> {
    console.log("deleteToDo", todo);
    const todoIndex = todos.findIndex((el) => el.id === todo.id);
    todos.splice(todoIndex, 1);
    return of({ todo });
  }

  updateToDo(todo: ToDo): Observable<{}> {
    console.log("updateToDo", todo);
    const oldTodo: ToDo = todos.find((el) => el.id === todo.id);
    todos.splice(todos.indexOf(oldTodo), 1);
    todos.push(todo);
    return of({ todo });
  }

  searchToDo(query: string): Observable<{ items?: any }> {
    const contentsFilter = new RegExp(query);
    const filteredToDos = todos.filter(
      (el) => el.title.match(contentsFilter) || el.memo.match(contentsFilter)
    );
    return of({ items: filteredToDos });
  }
}
