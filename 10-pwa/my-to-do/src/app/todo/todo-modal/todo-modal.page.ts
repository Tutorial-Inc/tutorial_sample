import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToDo } from '../todo.model';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.page.html',
  styleUrls: ['./todo-modal.page.scss'],
})
export class TodoModalPage implements OnInit {

  @Input() todo: ToDo;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) { }

  today = new Date();

  todoForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    due: [this.todayFormat(), Validators.required],
    memo: [''],
  });

  readonly errorMessages = {
    title: [
      { type: 'required', message: 'タイトルを入力してください。' },
      { type: 'minlength', message: 'タイトルは、３文字以上で入力してください。' }
    ],
    due: [
      { type: 'required', message: '期限を入力してください。' }
    ]
  };

  ngOnInit() {
    this.todoForm.get('title').setValue(this.todo.title);
    this.todoForm.get('due').setValue(this.todo.stringDate);
    this.todoForm.get('memo').setValue(this.todo.memo);
  }

  onSubmitClicked() {
    const todo = new ToDo({});
    todo.id = this.todo.id;
    todo.title = this.todoForm.get('title').value;
    todo.stringDate = this.todoForm.get('due').value;
    todo.memo = this.todoForm.get('memo').value;
    this.modalController.dismiss(todo);
  }

  todayFormat() {
    const dateStr = this.today.toISOString().split('T')[0];
    return dateStr;
  }

  dismiss() {
    this.modalController.dismiss()
  }

}
