  import React from 'react';
  import './App.css';
  import { BrowserRouter as Router } from 'react-router-dom';
  import {
    Route,
    Switch,
  } from "react-router-dom";

  import Register from "./containers/RegisterPage/Register";
  import Now from "./containers/LoginPage/Login";
  import NewApp from "./containers/NewApp/NewApp";
  import Page from "./components/Page";
  import TeacherNavbarNew from "./containers/TeacherNew/TeacherNavbarNew";
  class App extends React.Component {
    render() { 
      return (
            <Router>
              <Switch>
              <Route   path="/newapp" component={NewApp} />
              <Route   path="/Register" component={Register} />
              <Route   path="/Login" component={Now} />
              <Route   path="/Page" component={Page} />
              <Route   path="/teachernew" component={TeacherNavbarNew} />
              </Switch>
            </Router>
      );
    }
  }

  export default App;
