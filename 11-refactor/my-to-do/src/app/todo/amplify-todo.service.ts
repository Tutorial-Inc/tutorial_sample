import { Injectable } from '@angular/core';
import { ToDo } from './todo.model';
import { APIService, CreateTodoInput, CreateTodoMutation, DeleteTodoInput, DeleteTodoMutation, ListTodosQuery, SearchTodosQuery, UpdateTodoInput, UpdateTodoMutation } from '../API.service';
import { Observable, from } from 'rxjs';
import { AuthFacade } from '../auth/auth.facade';
import { mergeMap, take } from 'rxjs/operators';
import { TodoProvider } from './todo-provider';

@Injectable({
  providedIn: 'root'
})
export class AmplifyTodoService implements TodoProvider {

  constructor(
    private api: APIService,
    private authService: AuthFacade,
  ) { }

  addToDo(todo: ToDo): Observable<CreateTodoMutation> {
    console.log('addToDo');
    return this.authService.currentAuthenticatedSession$.pipe(
      take(1),
      mergeMap(session => {
        console.log('session');
        console.log(session);
        return this.api.CreateTodo(<CreateTodoInput>{ ...todo.toJSON(), userId: session.id })
      })
    )
  }

  fetchToDos(): Observable<ListTodosQuery> {
    console.log('fetchTodo');
    return from(this.api.ListTodos());
  }

  deleteToDo(todo: ToDo): Observable<DeleteTodoMutation> {
    console.log('deleteToDo', todo);
    return from(this.api.DeleteTodo(<DeleteTodoInput>{ id: todo.id }));
  }

  updateToDo(todo: ToDo): Observable<UpdateTodoMutation> {
    console.log('updateToDo', todo);
    return from(this.api.UpdateTodo(<UpdateTodoInput>todo.toJSON()));
  }

  searchToDo(query: string): Observable<SearchTodosQuery> {
    console.log('search todo', query);
    return from(this.api.SearchTodos(
      {
        or: [
          {
            title: { match: query },
          },
          {
            memo: { match: query },
          }
        ]
      }
    ))
  }
}
