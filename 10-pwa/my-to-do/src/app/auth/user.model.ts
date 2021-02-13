export class User {
  email: string;
  id?: string; // 追加

  constructor(email: string, id = null) {
    this.email = email;
    this.id = id; // 追加
  }
}