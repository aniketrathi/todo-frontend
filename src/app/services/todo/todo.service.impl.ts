import { APIServiceImpl, ServiceResponse } from "../api";

import { TodoItem, Todos } from "@models";
import { TodoService } from "./todo.service";

export default class TodoServiceImpl
  extends APIServiceImpl
  implements TodoService {
  static readonly RESOURCE = "/todos";

  async addTodo(title: string): Promise<ServiceResponse<TodoItem>> {
    try {
      const response = await this.post(TodoServiceImpl.RESOURCE, { title });
      const todos = new TodoItem(response.data);
      return new ServiceResponse<TodoItem>(todos);
    } catch (e) {
      return new ServiceResponse<TodoItem>(
        undefined,
        APIServiceImpl.parseError(e)
      );
    }
  }

  async getTodos(): Promise<ServiceResponse<Todos>> {
    try {
      const response = await this.get(TodoServiceImpl.RESOURCE);
      const todos = new Todos(response.data);
      return new ServiceResponse<Todos>(todos);
    } catch (e) {
      return new ServiceResponse<Todos>(
        undefined,
        APIServiceImpl.parseError(e)
      );
    }
  }

  async deleteTodo(
    id: string,
    title: string
  ): Promise<ServiceResponse<TodoItem>> {
    try {
      const response = await this.delete(`${TodoServiceImpl.RESOURCE}/${id}`, {
        title,
      });
      const todo = new TodoItem(response.data);
      return new ServiceResponse<TodoItem>(todo);
    } catch (e) {
      return new ServiceResponse<TodoItem>(
        undefined,
        APIServiceImpl.parseError(e)
      );
    }
  }

  async updateTodo(
    id: string,
    title: string
  ): Promise<ServiceResponse<TodoItem>> {
    try {
      const response = await this.put(`${TodoServiceImpl.RESOURCE}/${id}`, {
        title,
      });
      const todo = new TodoItem(response.data);
      return new ServiceResponse<TodoItem>(todo);
    } catch (e) {
      return new ServiceResponse<TodoItem>(
        undefined,
        APIServiceImpl.parseError(e)
      );
    }
  }  
}
