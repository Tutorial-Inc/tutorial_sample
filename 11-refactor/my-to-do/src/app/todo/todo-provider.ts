import { Observable } from "rxjs";
import { ToDo } from "./todo.model";
import { CreateTodoMutation, DeleteTodoMutation, ListTodosQuery, SearchTodosQuery, UpdateTodoMutation } from "../API.service";

export interface TodoProvider {
  addToDo(todo: ToDo): Observable<CreateTodoMutation | {}>;
  fetchToDos(): Observable<ListTodosQuery | { items?: any }>;
  deleteToDo(todo: ToDo): Observable<DeleteTodoMutation | {}>;
  updateToDo(todo: ToDo): Observable<UpdateTodoMutation | {}>;
  searchToDo(query: string): Observable<SearchTodosQuery | { items?: any }>;
}
