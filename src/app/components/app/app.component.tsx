import * as React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";

import { DIContext, getDependencies } from "@helpers";

import "./app.styles.css";

const App = (): JSX.Element => {
  const dependencies = React.useContext(DIContext);
  const { translation } = dependencies;
  return (
    <DIContext.Provider value={getDependencies()}>
      <div className="center-wrap">
        <Router>
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/" className="title">{translation.t("TODO")}</NavbarBrand>
            </Navbar>
            <Switch>
              {/* <Route exact path="/" component={HomeComponent} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    </DIContext.Provider>
  );
};

export default App;
