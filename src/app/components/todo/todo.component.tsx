import * as React from "react";
import { Jumbotron, Container, Form, Input, Label, Button } from "reactstrap";

import { DIContext, ComponentViewState, ComponentState } from "@helpers";

import "./todo.styles.css";
import { TodoItem, Todos } from "@models";

const TodoComponent = (): JSX.Element => {
  const [title, setTitle] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  // const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [todos, setTodos] = React.useState<Todos>({ todos: [] });

  const dependencies = React.useContext(DIContext);
  const { translation, todoService } = dependencies;

  const [state, setComponentState] = React.useState<ComponentState>({
    componentState: ComponentViewState.DEFAULT,
  });

  const { componentState, error } = state;

  const isLoaded = componentState === ComponentViewState.LOADED;
  const isLoading = componentState === ComponentViewState.LOADING;
  const isError = componentState === ComponentViewState.ERROR;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setComponentState({ componentState: ComponentViewState.LOADING });
    setSubmitted(true);
    if (title) {
      const response = await todoService.addTodo(title);
      if (response.hasData() && response.data) {
        setComponentState({ componentState: ComponentViewState.LOADED });
        const newTodos = [...todos.todos, response.data];
        // setTodos(newTodos);
        setTodos({ todos: newTodos });
      } else {
        const msg = response.error || translation.t("NO_INTERNET");
        setComponentState({
          componentState: ComponentViewState.ERROR,
          error: msg,
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <Form onSubmit={handleSubmit} inline>
            <Label htmlFor="title"></Label>
            <div className="mx-auto">
              <Input
                type="text"
                onChange={handleChange}
                placeholder={translation.t("ENTER_TITLE")}
                value={title}
                id="title"
              />
              <Button>
                <i className="fas fa-paper-plane"></i>
              </Button>
            </div>
          </Form>
          {submitted && !title && (
            <div className="text-error">{translation.t("TITLE_INVALID")}</div>
          )}
        </Container>
      </Jumbotron>
      {isError && <div> {error} </div>}
    </div>
  );
};

export default TodoComponent;
