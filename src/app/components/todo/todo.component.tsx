import * as React from "react";
import { Jumbotron, Container, Form, Input, Label, Button } from "reactstrap";

import { DIContext } from "@helpers";

import "./todo.styles.css";

const TodoComponent = (): JSX.Element => {
  const [title, setTitle] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const dependencies = React.useContext(DIContext);
  const { translation, todoService } = dependencies;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);

    if (title) {
      todoService.addTodo(title);
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
    </div>
  );
};

export default TodoComponent;
