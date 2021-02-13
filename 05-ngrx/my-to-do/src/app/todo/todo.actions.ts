import { createAction, props } from '@ngrx/store';
import { ToDo } from './todo.model';

export const addToDo = createAction(
  '[Todo page] Add ToDo',
  props<{ todo: ToDo }>()
);

export const deleteToDo = createAction(
  '[Todo page] Delete ToDo',
  props<{ todo: ToDo }>()
);

export const updateToDo = createAction(
  '[Todo page] Update ToDo',
  props<{ todo: ToDo }>()
);
