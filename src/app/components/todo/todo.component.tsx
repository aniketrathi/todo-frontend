import * as React from "react";
import { Jumbotron, Container, Form, Input, Label, Button } from "reactstrap";

import { DIContext } from "@helpers";

import "./todo.styles.css";

const TodoComponent: React.FC = () => {
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
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="title"></Label>
            <Input
              type="text"
              onChange={handleChange}
              placeholder={translation.t("ENTER_TITLE")}
              value={title}
              id="title"
            />
            {submitted && !title && (
              <div className="text-error">{translation.t("TITLE_INVALID")}</div>
            )}
            <br />
            <Button>Submit</Button>
          </Form>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default TodoComponent;
