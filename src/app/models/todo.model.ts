export class TodoItem {
  id: number;
  title: string;
  constructor(todo: { id: number; title: string }) {
    this.id = todo.id;
    this.title = todo.title;
  }
}
