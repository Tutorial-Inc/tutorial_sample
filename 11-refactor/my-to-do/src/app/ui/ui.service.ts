import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import  * as todoSlice from '../todo/todo.slice';
import  * as authSlice from '../auth/auth.slice';
import { merge } from 'rxjs';
import todos from '../todo/todo.data';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor(
    private readonly store: Store<{}>, 
  ) { }


  fetchLoading$ = this.store.select(
    createSelector(todoSlice.selectFeature, (state) => state.fetchLoading)
  )

  addToDoLoading$ = this.store.select(
    createSelector(todoSlice.selectFeature, (state) => state.addToDoLoading)
  )

  updateToDoLoading$ = this.store.select(
    createSelector(todoSlice.selectFeature, (state) => state.updateToDoLoading)
  )

  deleteToDoLoading$ = this.store.select(
    createSelector(todoSlice.selectFeature, (state) => state.deleteToDoLoading)
  )

  searchToDoLoading$ = this.store.select(
    createSelector(todoSlice.selectFeature, (state) => state.searchToDoLoading)
  )

  authLoading$ = this.store.select(
    createSelector(authSlice.selectFeature, (state) => state.loading)
  )

  loading$ = merge(
    this.fetchLoading$,
    this.addToDoLoading$,
    this.updateToDoLoading$,
    this.deleteToDoLoading$,
    this.authLoading$,
    this.searchToDoLoading$,
  )

}
