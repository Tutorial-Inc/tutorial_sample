import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromTodo from './todo.slice';
import { AmplifyTodoService } from './amplify-todo.service';
import { ToDo } from './todo.model';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: AmplifyTodoService
  ) { }

  postTodo$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromTodo.addToDo),
      map(action => <ToDo>action.payload.todo),
      mergeMap((todo: ToDo) => {
        return this.todoService.addToDo(todo).pipe(
          map((event) => {
            console.log(event);
            return fromTodo.addToDoSuccess({ todo })
          }),
          catchError((event) => {
            return of(fromTodo.addToDoError({}))
          })
        )
      })
    )
  );

  fetchTodo$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromTodo.fetchToDo),
      switchMap(() => {
        return this.todoService.fetchToDos().pipe(
          map((todos) => {
            const todoList = todos.items.map(todoItem => {
              return new ToDo({ ...todoItem, ...{ due: null, stringDate: todoItem.due } })
            })
            return fromTodo.fetchToDoSuccess(todoList);
          })
        )
      })
    )
  );

  updateTodo$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromTodo.updateToDo),
      map(action => <ToDo>action.payload.todo),
      mergeMap((todo) => {
        console.log('update', todo)
        return this.todoService.updateToDo(todo).pipe(
          map(event => {
            console.log('updateToDoSuccess', event);
            return fromTodo.updateToDoSuccess({ todo });
          }),
          catchError(err => {
            console.log('updateToDOError', err);
            return of(fromTodo.updateToDoError({}));
          })
        )
      })
    )
  );

  deleteTodo$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromTodo.deleteToDo),
      map(action => <ToDo>action.payload.todo),
      mergeMap((todo) => {
        console.log('deleteTodo', todo)
        return this.todoService.deleteToDo(todo).pipe(
          map(event => {
            console.log('deleteToDoSuccess', event);
            return fromTodo.deleteToDoSuccess({ todo });
          }),
          catchError(err => {
            console.log('deleteToDoError', err);
            return of(fromTodo.deleteToDoError({}));
          })
        )
      })
    )
  );

  searchTodos$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromTodo.searchToDos),
      switchMap(action => {
        return this.todoService.searchToDo(action.payload).pipe(
          map((todos) => {
            const todoList = todos.items.map(todoItem => {
              return new ToDo({ ...todoItem, ...{ due: null, stringDate: todoItem.due } })
            })
            return fromTodo.searchToDosSuccess(todoList);
          })
        )
      })
    )
  );
}