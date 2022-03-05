import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";



// styles
import Container from "./styles/Container";

// pages
import Home from "./pages/Home";

const AppRouter = () => (
  <Router>   
    <Container>
      <Switch>
        <Route path="/:searchterm?" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Container>
  </Router>
);

export default AppRouter;
