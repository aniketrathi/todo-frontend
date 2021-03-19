import * as React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

import { DIContext, getDependencies } from "@helpers";

import "./app.styles.css";
import TodoComponent from "../todo/todo.component";

const App = (): JSX.Element => {
  const dependencies = React.useContext(DIContext);
  const { translation } = dependencies;
  return (
    <DIContext.Provider value={getDependencies()}>
      <div className="center-wrap">
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/" className="title">
              {translation.t("TODO")}
            </NavbarBrand>
          </Navbar>
          {<TodoComponent />}
        </div>
      </div>
    </DIContext.Provider>
  );
};

export default App;
