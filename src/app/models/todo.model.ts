export class TodoItem {
  id: string;
  title: string;
  constructor(todo: { id: string; title: string }) {
    this.id = todo.id;
    this.title = todo.title;
  }
}
