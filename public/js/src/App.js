import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";

import Layout from "./layouts/Layout";
import Home from "./components/Home";
import TeacherVisible from "./containers/TeacherVisible";
import TeacherListHoc from "./components/TeacherList/TeacherListHoc";
import Logout from "./components/logout";
import Login from "./components/login";
import PrivateRoute from "./containers/PrivateRoute";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

// setAuthHeaderAndErrorHandler();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login/:token?/:return_url?" component={Login} />
              <Route path="/logout" exact component={Logout} />
              <PrivateRoute path="/teacher" component={TeacherVisible} />
              <Route path="/teachers" component={TeacherListHoc} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
