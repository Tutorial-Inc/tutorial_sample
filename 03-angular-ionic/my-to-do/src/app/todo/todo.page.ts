import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToDo } from './todo.model';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  constructor(
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  todos: ToDo[] = [
    {
      id: 'todo1',
      title: '部屋の掃除',
      due: new Date(2021, 9, 31),
      done: false
    },
    {
      id: 'todo2',
      title: 'ゴミ捨て',
      due: new Date(2021, 9, 31),
      done: false
    },
    {
      id: 'todo3',
      title: '風呂の掃除',
      due: new Date(2021, 9, 31),
      done: false
    },
    {
      id: 'todo4',
      title: '屋根の掃除',
      due: new Date(2021, 9, 31),
      done: false
    },
    {
      id: 'todo5',
      title: '窓の掃除',
      due: new Date(2021, 9, 31),
      done: false
    },
    {
      id: 'todo6',
      title: '犬小屋の掃除',
      due: new Date(2021, 9, 31),
      done: false
    },
    {
      id: 'todo7',
      title: '朝飯を食う',
      due: new Date(2021, 9, 31),
      done: true
    },
    {
      id: 'todo8',
      title: '昼飯を食う',
      due: new Date(2021, 9, 31),
      done: true
    },
    {
      id: 'todo9',
      title: '晩飯を食う',
      due: new Date(2021, 9, 31),
      done: true
    }
  ];

  get todoList(): ToDo[] {
    return this.todos.filter(todo => !todo.done);
  }

  get doneList(): ToDo[] {
    return this.todos.filter(todo => todo.done);
  }

  onItemClicked(todo: ToDo): void {
    todo.done = !todo.done;
  }

  onDeleteClicked(todo: ToDo): void {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  addToDo(todo: ToDo): void {
    this.todos.push(todo);
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
          const todo = new ToDo();
          todo.due = new Date(data.due);
          todo.title = data.todo;
          todo.id = 'todo' + (new Date).getTime().toString();
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
