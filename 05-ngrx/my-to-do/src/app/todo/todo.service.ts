import { Injectable } from '@angular/core';
import { ToDo } from './todo.model';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import * as fromTodo from './todo.reducer';
import * as todoActions from './todo.actions';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private readonly store: Store<typeof fromTodo>
  ) { }

  todos$ = this.store.select(
    createSelector(
      createFeatureSelector<fromTodo.State>(fromTodo.todoFeatureKey),
      (state) => state.todos
    )
  )

  addToDo(todo: ToDo): void {
    this.store.dispatch(todoActions.addToDo({ todo }))
  }

  deleteToDo(todo: ToDo): void {
    this.store.dispatch(todoActions.deleteToDo({ todo }))
  }

  updateToDo(todo: ToDo): void {
    this.store.dispatch(todoActions.updateToDo({ todo }))
  }
}
