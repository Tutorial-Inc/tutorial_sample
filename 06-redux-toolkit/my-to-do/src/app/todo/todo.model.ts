export class ToDo {
  id?: string;
  title: string;
  due: Date;
  done: boolean = false;

  constructor(todoParams: Partial<ToDo>) {
    Object.assign(this, todoParams);
  }
}
