import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoModalPage } from './todo-modal/todo-modal.page';
import { ToDo } from './todo.model';
import { TodoService } from './todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  currentModal?: HTMLIonModalElement = null;

  constructor(
    private todoService: TodoService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  todos$: Observable<ToDo[]> = this.todoService.todos$.pipe(
    map(todos => todos.slice().sort(this.sortToDo))
  );

  sortToDo(a: ToDo, b: ToDo): number {
    const compare = Number(a.done) - Number(b.done);
    if (compare === 0) {
      return a.due.getTime() - b.due.getTime();
    } else {
      return compare;
    }
  };
  
  onCheckBoxClicked(todo: ToDo): void {
    const newTodo = new ToDo({ ...todo, done: !todo.done });
    this.todoService.updateToDo(newTodo);
  }

  onItemClicked(todo: ToDo): void {
    this.showTodoModal(todo);
  }


  async showTodoModal(todo: ToDo) {
    this.currentModal = await this.modalController.create({
      component: TodoModalPage,
      componentProps: {
        todo: todo,
      }
    });

    this.currentModal.onDidDismiss().then( data  => {
      const todo = data.data;
      if (todo instanceof ToDo) {
        this.todoService.updateToDo(todo);
      }
    })

    return await this.currentModal.present();
  }

  onDeleteClicked(todo: ToDo): void {
    this.todoService.deleteToDo(todo);
  }

  addToDo(todo: ToDo): void {
    this.todoService.addToDo(todo);
  }

  async onAddButtonClicked() {
    this.currentModal = await this.modalController.create({
      component: TodoModalPage,
      componentProps: {
        todo: new ToDo({}),
      }
    });

    this.currentModal.onDidDismiss().then( data  => {
      const todo = data.data;
      if (todo instanceof ToDo) {
        todo.id = 'todo' + (new Date).getTime().toString();
        this.todoService.addToDo(todo);
      }
    })

    return await this.currentModal.present();
  }

}
