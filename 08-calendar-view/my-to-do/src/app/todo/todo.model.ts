export class ToDo {
  id?: string;
  title: string;
  due: Date = new Date();
  memo?: string;
  done: boolean = false;

  constructor(todoParams: Partial<ToDo>) {
    Object.assign(this, todoParams);
  }

  get stringDate() {
    return `${this.due.getFullYear()}-${('0' + (this.due.getMonth() + 1)).slice(-2)}-${('0' + this.due.getDate()).slice(-2)}`
  }

  set stringDate(val) {
    this.due = new Date((new Date(val)).setHours(0));
  }
}
