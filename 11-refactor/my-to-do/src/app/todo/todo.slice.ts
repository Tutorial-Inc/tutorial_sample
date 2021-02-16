import { createFeatureSelector } from '@ngrx/store';
import { createSlice } from '@reduxjs/toolkit';
import { ToDo } from './todo.model';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    foundTodos: [],
    fetchLoading: false,
    addToDoLoading: false,
    updateToDoLoading: false,
    deleteToDoLoading: false,
    searchToDoLoading: false,
  },
  reducers: {
    fetchToDo: (state, action) => {
      state.fetchLoading = true;
    },
    fetchToDoSuccess: (state, action) => {
      state.fetchLoading = false;
      state.todos = action.payload;
    },
    fetchToDoError: (state, action) => {
      state.fetchLoading = false;
    },
    addToDo: (state, action) => {
      state.addToDoLoading = true;
    },
    addToDoSuccess: (state, action) => {
      state.todos.push(action.payload.todo);
      state.addToDoLoading = false;
    },
    addToDoError: (state, action) => {
      state.addToDoLoading = false;
    },
    deleteToDo: (state, action) => {
      state.deleteToDoLoading = true;
    },
    deleteToDoSuccess: (state, action) => {
      const todo = action.payload.todo;
      const todoIndex = state.todos.findIndex(el => el.id === todo.id)
      state.todos.splice(todoIndex, 1);
      state.deleteToDoLoading = false;
    },
    deleteToDoError: (state, action) => {
      state.deleteToDoLoading = false;
    },
    updateToDo: (state, action) => {
      state.updateToDoLoading = true;
    },
    updateToDoSuccess: (state, action) => {
      const todo = action.payload.todo;
      const oldTodo = state.todos.find(el => el.id === todo.id);
      state.todos.splice(state.todos.indexOf(oldTodo), 1);
      state.todos.push(new ToDo({...oldTodo, ...todo}));
      state.updateToDoLoading = false;
    },
    updateToDoError: (state, action) => {
      state.updateToDoLoading = false;
    },
    searchToDos: (state, action) => {
      state.searchToDoLoading = true;
    },
    searchToDosSuccess: (state, action) => {
      state.searchToDoLoading = false;
      state.todos = action.payload;
    },
  }
});

const {
  reducer,
  actions: {
    addToDo,
    addToDoSuccess,
    addToDoError,
    fetchToDo,
    fetchToDoSuccess,
    fetchToDoError,
    deleteToDo,
    deleteToDoSuccess,
    deleteToDoError,
    updateToDo,
    updateToDoSuccess,
    updateToDoError,
    searchToDos,
    searchToDosSuccess,
  },
  name
} = todoSlice;

export default reducer;
export {
  name,
  addToDo,
  addToDoSuccess,
  addToDoError,
  fetchToDo,
  fetchToDoSuccess,
  fetchToDoError,
  deleteToDo,
  deleteToDoSuccess,
  deleteToDoError,
  updateToDo,
  updateToDoSuccess,
  updateToDoError,
  searchToDos,
  searchToDosSuccess,
};

export const selectFeature = createFeatureSelector<ReturnType<typeof reducer>>(
  name
);