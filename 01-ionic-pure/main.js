const todos = [{
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
  },
];

// Todo追加がする
function addToDo(todo) {
  const todoList = document.querySelector('#todos');
  const doneList = document.querySelector('#done');
  
  const todoItemWithSliding = document.createElement('ion-item-sliding');
  todoItemWithSliding.id = todo.id;
  todoItemWithSliding.innerHTML = `
    <ion-item onClick="onItemClicked('${todo.id}')">
      <ion-label>
        <h2>${todo.title}</h2>
        <h3>${todo.due.toDateString()}</h3>
      </ion-label>
      <ion-checkbox ${( todo.done ? 'checked' : '' )} color="primary" slot="start"</ion-checkbox>
    </ion-item>
    <ion-item-options side="end">
      <ion-item-option color="danger" expandable onClick="deleteToDo('${todo.id}')">
        削除
      </ion-item-option>
    </ion-item-options>
  `
  
  if (todo.done) {
    // 完了している時は、doneListへ
    doneList.appendChild(todoItemWithSliding);
  } else {
    // 完了していないものは、todoListへ
    todoList.appendChild(todoItemWithSliding);
  }
}

// todo 削除
function deleteToDo(todoId) {
  todos.splice(todos.findIndex(el => el.id === todoId), 1);
  document.querySelector(`#${todoId}`).remove();
}

// ToDo の Done 状態をトグルするイベント、リスナは onClick 属性で登録
function onItemClicked(todoId) {
  const todo = todos.find(el => el.id === todoId);
  todo.done = !todo.done;
  document.querySelector(`#${todoId}`).remove();
  addToDo(todo);
}

// ToDo 追加用のアラート表示
const addButton = document.querySelector('#addButton');
addButton.addEventListener('click', () => {
  showAlert('タスク追加', '', 'やらなきゃいけないことは何？');
});

// アラートを表示する
function showAlert(header, subheader, message) {
  const alert = document.createElement('ion-alert');
  alert.header = header;
  alert.subHeader = subheader;
  alert.message = message;
  alert.buttons = [{
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'OK',
      handler: () => {
        const todo = {};
        todo.title = document.querySelector('#new-todo').value;
        todo.due = new Date(document.querySelector('#new-due').value);
        todo.done = false;
        todo.id = 'todo' + (new Date).getTime().toString();
        todos.push(todo);
        addToDo(todo);
      }
    }
  ];
  alert.inputs = [{
      name: 'todo',
      id: 'new-todo',
      placeholder: 'やらなきゃいけないことは何？'
    },
    {
      name: 'due',
      id: 'new-due',
      type: 'date',
    }
  ];

  document.body.appendChild(alert);
  return alert.present();
}

// todo を全て描画する（初回のみ実行）
function writeAllToDos(todos) {
  for (let todo of todos) {
    addToDo(todo);
  }
}

function main () {
  writeAllToDos(todos);
}

main();
