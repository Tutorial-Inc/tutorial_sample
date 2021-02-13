export type TodoJSON = {
  id?: string,
  title: string,
  due?: string,
  memo?: string,
  done?: boolean,
  userId?: string
}
export class ToDo {
  id?: string;
  title: string;
  due: Date = new Date();
  memo?: string;
  done: boolean = false;
  userId?: string;

  constructor(todoParams: Partial<ToDo>) {
    Object.assign(this, todoParams);
  }

  get stringDate() {
    return `${this.due.getFullYear()}-${('0' + (this.due.getMonth() + 1)).slice(-2)}-${('0' + this.due.getDate()).slice(-2)}`
  }

  set stringDate(val) {
    this.due = new Date((new Date(val)).setHours(0));
  }

  toJSON(): TodoJSON {
    return {
      id: this.id,
      title: this.title,
      due: this.stringDate,
      memo: this.memo,
      done: this.done,
      userId: this.userId,
    }
  }
}
