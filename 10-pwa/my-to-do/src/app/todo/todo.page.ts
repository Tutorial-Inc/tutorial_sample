import { Component, OnInit } from '@angular/core';
import { ModalController, Animation, AnimationController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TodoModalPage } from './todo-modal/todo-modal.page';
import { TodoFacade } from './todo.facade';
import { ToDo } from './todo.model';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  currentModal?: HTMLIonModalElement = null;
  query: string = '';

  constructor(
    private todoService: TodoFacade,
    private modalController: ModalController,
    private animationController: AnimationController,
  ) { }

  ngOnInit() {
    this.todoService.fetchToDos();
  }

  onDrag($event, todo) {
    console.log($event);
    console.log(todo);
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

  onCheckBoxClicked($event, todo: ToDo): void {
    const newTodo = new ToDo({ ...todo, done: !todo.done });
    const hostElement = $event.target.closest('ion-item-sliding');
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

    this.currentModal.onDidDismiss().then(data => {
      const todo = data.data;
      if (todo instanceof ToDo) {
        this.todoService.updateToDo(todo);
      }
    })

    return await this.currentModal.present();
  }

  onDelete($event, todo: ToDo): void {
    this.animateDisappear($event.target);
    this.todoService.deleteToDo(todo);
  }

  animateDisappear(element) {
    const hostElement = element.closest('ion-item-sliding');
    this.animationController.create()
      .addElement(hostElement)
      .duration(200)
      .easing('ease-out')
      .fromTo('height', '48px', '0').play()
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

    this.currentModal.onDidDismiss().then(data => {
      const todo = data.data;
      if (todo instanceof ToDo) {
        todo.id = 'todo' + (new Date).getTime().toString();
        this.todoService.addToDo(todo);
      }
    })

    return await this.currentModal.present();
  }

  onSearchChanged(): void {
    const query = this.query;
    this.todoService.searchToDo(query);    
  }

  onSearchCanceled($event): void {
    console.log($event);
    this.todoService.fetchToDos();
  }

}
