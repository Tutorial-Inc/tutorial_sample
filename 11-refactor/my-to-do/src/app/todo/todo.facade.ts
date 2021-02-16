import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { ToDo } from './todo.model';
import fromTodo, * as todoSlice from './todo.slice';

@Injectable({
  providedIn: 'root'
})
export class TodoFacade {
  constructor(
    private readonly store: Store<typeof fromTodo>, 
  ) { }

  todos$ = this.store.select(
    createSelector(
      todoSlice.selectFeature, (state) => state.todos
    )
  )

  fetchToDos(): void {
    this.store.dispatch(todoSlice.fetchToDo({}));
  }

  addToDo(todo: ToDo): void {
    this.store.dispatch(todoSlice.addToDo({ todo }))
  }

  deleteToDo(todo: ToDo): void {
    this.store.dispatch(todoSlice.deleteToDo({ todo }))
  }

  updateToDo(todo: ToDo): void {
    this.store.dispatch(todoSlice.updateToDo({ todo }))
  }

  searchToDo(query: string): void {
    this.store.dispatch(todoSlice.searchToDos(query))
  }
}
