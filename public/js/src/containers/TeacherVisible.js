import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";
import _ from "lodash";

import NewTeacherForm from "../components/AddTeacher/NewTeacherForm";
import TeacherView from "../components/TeacherList/TeacherView";

import { fetchOptions, fetchTeacher, teacherChange } from "../actions";
import {
  TeacherFormUserToTeacherAdapter,
  TeacherFormOptionsAdapter,
  TeacherFormSubmitAdapter,
  TeacherFormViewAdapter,
  TeacherViewAdapter
} from "../helpers/Adapters/TeacherAdapter";

class TeacherVisible extends Component {
  constructor(props) {
    super(props);
    this.onTeacherChange = this.onTeacherChange.bind(this);
    this.submitTeacher = this.submitTeacher.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);
  }

  componentDidMount() {
    const { dispatch, user, teacher } = this.props;
    dispatch(fetchOptions());
    dispatch(fetchTeacher());
  }

  submitTeacher(model) {
    console.log("submit", model);
    axios.post("api/teachers", TeacherFormSubmitAdapter(model));
  }

  updateTeacher(model) {
    console.log("update", model);
    axios.put(
      "api/teachers/" + this.props.teacher.id,
      TeacherFormSubmitAdapter(model)
    );
  }

  onTeacherChange(teacher) {
    this.props.dispatch(teacherChange(teacher));
  }

  render() {
    const { teacher, options } = this.props;

    if (!_.isEmpty(teacher) && !_.isEmpty(options)) {
      return (
        <NewTeacherForm
          teacher={TeacherFormViewAdapter(teacher)}
          saveTeacher={!teacher.id ? this.submitTeacher : this.updateTeacher}
          options={TeacherFormOptionsAdapter(options)}
          onTeacherChange={this.onTeacherChange}
          teacherView={
            <TeacherView teacher={TeacherViewAdapter(teacher, options)} />
          }
        />
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    teacher: state.teacher,
    options: state.options
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   'userLogin': user => dispatch(userLogin(user))
// });

export default connect(mapStateToProps)(TeacherVisible);
