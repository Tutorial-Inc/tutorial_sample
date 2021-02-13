import { Injectable } from '@angular/core';
import { ToDo } from './todo.model';
import { createSelector, Store } from '@ngrx/store';
import fromTodo, * as todoSlice from './todo.slice';
// import * as fromTodo from './todo.reducer';
// import * as todoActions from './todo.actions';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private readonly store: Store<typeof fromTodo>
  ) { }

  todos$ = this.store.select(
    createSelector(
      todoSlice.selectFeature, (state) => state.todos
    )
  )

  addToDo(todo: ToDo): void {
    this.store.dispatch(todoSlice.addToDo({ todo }))
  }

  deleteToDo(todo: ToDo): void {
    this.store.dispatch(todoSlice.deleteToDo({ todo }))
  }

  updateToDo(todo: ToDo): void {
    this.store.dispatch(todoSlice.updateToDo({ todo }))
  }
}
