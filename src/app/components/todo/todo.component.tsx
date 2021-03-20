import * as React from "react";
import { useAsyncEffect } from "use-async-effect";
import {
  Jumbotron,
  Container,
  Form,
  Input,
  Label,
  Button,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";

import { DIContext, ComponentViewState, ComponentState } from "@helpers";

import "./todo.styles.css";
import { TodoItem, Todos } from "@models";

const TodoComponent = (): JSX.Element => {
  const [title, setTitle] = React.useState<string>("");
  const [todos, setTodos] = React.useState<Todos>({ todos: [] });
  const [errorMessage, setErrorMessage] = React.useState("");

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
    if (title) {
      const response = await todoService.addTodo(title);
      if (response.hasData() && response.data) {
        setComponentState({ componentState: ComponentViewState.LOADED });
        const newTodos = [...todos.todos, response.data];
        setTodos({ todos: newTodos });
        setErrorMessage("");
      } else {
        const msg = response.error || translation.t("NO_INTERNET");
        setComponentState({
          componentState: ComponentViewState.ERROR,
          error: msg,
        });
      }
      setTitle("");
    } else {
      setErrorMessage(translation.t("TITLE_INVALID"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const getAllTodos = async (): Promise<void> => {
    setComponentState({ componentState: ComponentViewState.LOADING });
    const response = await todoService.getTodos();
    if (response.hasData() && response.data) {
      setComponentState({ componentState: ComponentViewState.LOADED });
      console.log(response.data);
      setTodos(response.data);
    } else {
      const msg = response.error || translation.t("NO_INTERNET");
      setComponentState({
        componentState: ComponentViewState.ERROR,
        error: msg,
      });
    }
  };

  useAsyncEffect(async (): Promise<void> => {
    await getAllTodos();
  }, []);

  const handleDelete = async (id: string, title: string): Promise<void> => {
    setComponentState({ componentState: ComponentViewState.LOADING });
    const response = await todoService.deleteTodo(id, title);
    if (response.hasData() && response.data) {
      setComponentState({ componentState: ComponentViewState.LOADED });
      setTodos({ todos: todos.todos.filter((todo) => todo.id !== id) });
    } else {
      const msg = response.error || translation.t("NO_INTERNET");
      setComponentState({
        componentState: ComponentViewState.ERROR,
        error: msg,
      });
    }
  };

  const todosList = todos.todos.map(
    (el: TodoItem): JSX.Element => {
      return (
        <div key={el.id}>
          <Card body inverse color="info" className="mx-auto">
            <CardBody>
              <CardTitle tag="h5">{el.title}</CardTitle>
              <Button className="btn btn-warning">
                <i className="fas fa-edit"></i>
              </Button>
              <Button
                className="btn btn-danger"
                onClick={() => handleDelete(el.id, el.title)}
              >
                <i className="fas fa-trash-alt"></i>
              </Button>
            </CardBody>
          </Card>
        </div>
      );
    }
  );

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
          {errorMessage && <div className="text-error">{errorMessage}</div>}
        </Container>
      </Jumbotron>
      {todosList}
      {isError && <div> {error} </div>}
    </div>
  );
};

export default TodoComponent;
