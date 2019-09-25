import React from 'react';
import axios from "axios";
import { Header, Button, Icon, Divider } from 'semantic-ui-react';

import {
  TeacherFormOptionsAdapter,
  TeacherFormSubmitAdapter,
  TeacherFormViewAdapter,
  TeacherViewAdapter
} from '../../helpers/Adapters/TeacherAdapter';
import NewTeacherForm from "./NewTeacherForm";
import TeacherView from '../TeacherList/TeacherView'
import Token from "../../helpers/token";

const defaultOptions = {};

class TeacherHoc extends React.Component {

    state = {
      teacher: {},
      options: {},
      loaded: false
    };

    options = {};

    constructor() {
      super();
      this.onTeacherChange = this.onTeacherChange.bind(this);
      this.submitTeacher = this.submitTeacher.bind(this);
    }

    componentDidMount() {

        const teacherPromise = axios.get('/api/teacher');
        const optionsPromise = axios.get('/api/options');

        Promise.all([teacherPromise, optionsPromise]).then((res) => {
            this.options = res[1].data;
            const teacher = TeacherFormViewAdapter(res[0].data);

            this.setState({
                ...this.state,
                teacher,
                loaded: true
            });
        }).catch(rej => {
                Token.remove();
                this.props.history.push('/teacher');
            }
        );
  }

  submitTeacher(...args) {
    console.log('args', args);
    // axios.post('api/teacher', TeacherFormSubmitAdapter(model));
  }

  onTeacherChange(teacher) {
    this.setState({ teacher });
  }

	render() {
    console.log(TeacherFormOptionsAdapter(this.options), 'options');
	    return (
        <React.Fragment>
        {
          !Token.get() ? (
            <div>
              <Header as = 'h2'> Login with Facebook and join Maldena English Society </Header>
                        <br/>
              <a href='//localhost:8000/api/login'>
                <Button size='huge' fluid color='facebook'>
                  <Icon name='facebook' /> Facebook
                </Button>
              </a>
            </div>) :
               this.state.loaded && (
                <React.Fragment>
                 <Header as = 'h2'>Заполни форму чтобы cтать частью Maldena English Society</Header>
                  <br/>
                  <NewTeacherForm
                    teacher={this.state.teacher}
                    submitTeacher={this.submitTeacher}
                    options={TeacherFormOptionsAdapter(this.options)}
                    onTeacherChange={this.onTeacherChange}
                    />
                  <br/>
                <Divider section></Divider>
                  <TeacherView
                    teacher={TeacherViewAdapter(this.state.teacher, this.options)}
                    />
                </React.Fragment>
            )
        }
        </React.Fragment>
        );
	};
};

export default TeacherHoc;
