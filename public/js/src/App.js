import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from './layouts/Layout';
import Home from "./components/Home";
import TeacherHoc from "./components/AddTeacher/TeacherHoc";
import TeacherListHoc from "./components/TeacherList/TeacherListHoc";
import GetToken from "./components/GetToken";
import Logout from "./components/logout";

import axios from 'axios';
import token from './helpers/token';

axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + token.get(),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

class App extends Component {

	  render() {
		return (
			<Router>
				  <Layout>
					  <Route path='/home' component={Home}/>
					  <Route path='/teacher' component={TeacherHoc}/>
                      <Route path='/teachers' component={TeacherListHoc}/>
					  <Route path='/getToken' component={GetToken}/>
					  <Route path='/logout' component={Logout}/>
					  <Route path='/' exact component={Home}/>
				  </Layout>
			</Router>
		);
  }
}

export default App;
