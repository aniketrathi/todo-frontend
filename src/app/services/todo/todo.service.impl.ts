import { APIServiceImpl, ServiceResponse } from "../api";

import { TodoItem } from "@models";
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
}
