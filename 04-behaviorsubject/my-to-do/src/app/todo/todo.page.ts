import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToDo } from './todo.model';
import { TodoService } from './todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todoList$.subscribe();
    this.doneList$.subscribe();
  }

  todoList$: Observable<ToDo []> = this.todoService.todos$.pipe(
    map(todos => todos.filter(todo => !todo.done))
  );

  doneList$: Observable<ToDo []> = this.todoService.todos$.pipe(
    map(todos => todos.filter(todo => todo.done))
  );

  onItemClicked(todo: ToDo): void {
    todo.done = !todo.done;
    this.todoService.updateToDo(todo);
  }

  onDeleteClicked(todo: ToDo): void {
    this.todoService.deleteToDo(todo);
  }

  addToDo(todo: ToDo): void {
    this.todoService.addToDo(todo);
  }

  async onAddButtonClicked(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'タスク追加',
      subHeader: '',
      message: 'やらなきゃいけないことは何？',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'OK',
        handler: (data) => {
          const todoParams = {
            id: 'todo' + (new Date).getTime().toString(),
            title: data.todo,
            due: new Date(data.due)
          }
          const todo = new ToDo(todoParams);
          this.addToDo(todo);
        }
      }],
      inputs: [{
        name: 'todo',
        id: 'new-todo',
        placeholder: 'やらなきゃいけないことは何？'
      },
      {
        name: 'due',
        id: 'new-due',
        type: 'date',
      }]
    });

    await alert.present();
  }

}
