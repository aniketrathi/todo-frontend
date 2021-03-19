import { TodoItem } from "@models";
import { ServiceResponse } from "../api";
export interface TodoService {
  addTodo: (title: string) => Promise<ServiceResponse<TodoItem>>;
}
