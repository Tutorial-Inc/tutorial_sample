import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from './todo.actions';
import { ToDo } from './todo.model';
import initialToDos from './todo.data';

export interface State {
  todos: ToDo [];
};

export const initialState: State = {
  todos: initialToDos
};

const todoReducer = createReducer(
  initialState,
  on(ToDoActions.addToDo, (state, { todo }) => {
    return { ...state, todos: state.todos.concat(todo) };
  }),
  on(ToDoActions.deleteToDo, (state, { todo }) => {
    return { ...state, todos: state.todos.filter(el => el.id !== todo.id) };
  }),
  on(ToDoActions.updateToDo, (state, { todo }) => {
    let todos = state.todos.slice();
    todos.splice(todos.findIndex(el => el.id === todo.id), 1, todo);
    return { ...state, todos: todos }
  })
)

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}

export const todoFeatureKey = 'todo';
