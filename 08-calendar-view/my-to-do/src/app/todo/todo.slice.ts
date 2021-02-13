import { createFeatureSelector } from '@ngrx/store';
import { createSlice } from '@reduxjs/toolkit';
import todos from './todo.data';
import { ToDo } from './todo.model';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: todos
  },
  reducers: {
    addToDo: (state, action) => {
      state.todos.push(action.payload.todo);
    },
    deleteToDo: (state, action) => {
      const todo = action.payload.todo;
      const todoIndex = state.todos.findIndex(el => el.id === todo.id)
      state.todos.splice(todoIndex, 1);
    },
    updateToDo: (state, action) => {
      const todo = action.payload.todo;
      const oldTodo = state.todos.find(el => el.id === todo.id);
      state.todos.splice(state.todos.indexOf(oldTodo), 1);
      state.todos.push(new ToDo({...oldTodo, ...todo}));
    }
  }
});

const {
  reducer,
  actions: {
    addToDo,
    deleteToDo,
    updateToDo
  },
  name
} = todoSlice;

export default reducer;
export {
  name,
  addToDo,
  deleteToDo,
  updateToDo,
};

export const selectFeature = createFeatureSelector<ReturnType<typeof reducer>>(
  name
);