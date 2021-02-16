import { Component, Inject, LOCALE_ID, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { TodoService } from '../todo/todo.service';
import { map, tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ToDo } from '../todo/todo.model';
import { TodoModalPage } from '../todo/todo-modal/todo-modal.page';
import { CalendarMode } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarPage implements OnInit {
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };
  viewTitle: string;

  @ViewChild(CalendarComponent) calView: CalendarComponent;

  eventSource$ = this.todoService.todos$.pipe(
    map(todos => todos.map(todo => {
      return { title: todo.title, allDay: true, startTime: todo.due, endTime: todo.due, id: todo.id, memo: todo.memo, done: todo.done }
    }))
  );

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private modalController: ModalController,
    private todoService: TodoService
  ) { }

  currentModal?: HTMLIonModalElement = null;


  next() {
    this.calView.slideNext();
  }

  back() {
    this.calView.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  backToCurrent() {
    this.calView.currentDate = new Date();
  }

  eventSelected(event) {
    const todo = new ToDo({});
    todo.id = event.id;
    todo.title = event.title;
    todo.due = new Date(event.startTime);
    todo.memo = event.memo;
    todo.done = event.done;
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

  onCurrentDateChanged($event) {
  }
  reloadSource(startTime, endTime) {}
  onEventSelected($event) {}

  ngOnInit() {
  }

}
