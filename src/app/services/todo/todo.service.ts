import { TodoItem, Todos } from "@models";
import { ServiceResponse } from "../api";
export interface TodoService {
  addTodo: (title: string) => Promise<ServiceResponse<TodoItem>>;
  getTodos: () => Promise<ServiceResponse<Todos>>;
  deleteTodo: (id: string, title: string) => Promise<ServiceResponse<TodoItem>>;
}
