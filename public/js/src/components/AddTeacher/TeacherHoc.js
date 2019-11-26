import React from "react";
import axios from "axios";
import _ from "lodash";
import { Header, Button, Icon, Divider, Form } from "semantic-ui-react";
import { withRouter } from "react-router";

import TeacherView from "../TeacherList/TeacherView";

import {
  TeacherFormUserToTeacherAdapter,
  TeacherFormOptionsAdapter,
  TeacherFormSubmitAdapter,
  TeacherFormViewAdapter,
  TeacherViewAdapter
} from "../../helpers/Adapters/TeacherAdapter";
import NewTeacherForm from "./NewTeacherForm";
import Token from "../../helpers/token";

class TeacherHoc extends React.Component {
  state = {
    teacher: {
      id: null,
      email: "",
      photo: "",
      name: "",
      levels: [],
      showVenue: false,
      showSkype: false,
      showHome: false
    },
    user: {
      is_admin: 0,
      teacher_id: null
    },
    options: {},
    loaded: false
  };

  options = {};

  constructor(props) {
    super(props);
    this.onTeacherChange = this.onTeacherChange.bind(this);
    this.submitTeacher = this.submitTeacher.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);
  }

  componentDidMount() {
    console.log(this.props, "props");
    if (Token.exist()) {
      const optionsPromise = axios.get("/api/options");
      const userPromise = axios.get("/api/me");

      Promise.all([userPromise, optionsPromise])
        .then((res, reject) => {
          const user = res[0].data;
          if (_.isEmpty(user)) {
            throw Error;
          }

          this.options = res[1].data;
          let teacher = {};

          const teacherPromise = new Promise((resolve, reject) => {
            if (!user.teacher_id) {
              resolve(TeacherFormUserToTeacherAdapter(user));
            } else {
              const teacherPromise = axios
                .get("/api/teachers/" + user.teacher_id)
                .then(res => {
                  resolve(TeacherFormViewAdapter(res.data, this.options));
                });
            }
          })
            .then(teacher => {
              this.setState({
                ...this.state,
                teacher: {
                  ...this.state.teacher,
                  ...teacher
                },
                user,
                loaded: true
              });
            })
            .catch(rej => {
              // console.log(rej, 1)
              //   Token.remove();
              //   this.props.history.push('/login');
            });
        })
        .catch(rej => {
          // console.log(rej, 2)
          //   Token.remove();
          //   this.props.history.push('/login');
        });
    }
  }

  submitTeacher(model) {
    axios.post("api/teachers", TeacherFormSubmitAdapter(model));
  }

  updateTeacher(model) {
    axios.put(
      "api/teachers/" + this.state.teacher.id,
      TeacherFormSubmitAdapter(model)
    );
  }

  onTeacherChange(teacher) {
    this.setState({ teacher });
  }

  render() {
    return (
      <React.Fragment>
        {!Token.get() ? (
          <div>
            <Header as="h2">
              {" "}
              Login with Facebook and join Maldena English Society{" "}
            </Header>
            <br />
            <a href="//localhost:8000/api/login">
              <Button size="huge" fluid color="facebook">
                <Icon name="facebook" /> Facebook
              </Button>
            </a>
          </div>
        ) : (
          this.state.loaded && (
            <React.Fragment>
              <Divider horizontal section>
                <Header as="h2">
                  Заполни форму чтобы cтать частью Maldena English Society
                </Header>
              </Divider>
              <br />
            </React.Fragment>
          )
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(TeacherHoc);
