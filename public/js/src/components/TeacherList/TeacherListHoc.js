import React, {Component} from "react";
import _ from "lodash";
import axios from "axios";
import FlipMove from 'react-flip-move';

import {TeacherViewAdapter} from "../../helpers/Adapters/TeacherAdapter";
import MenuHoc from "./Menu/MenuHoc";
import TeacherView from "./TeacherView";

class TeacherListHoc extends Component {
  teachers = [];

  sortItems = [
    {
      title: "Цена",
      name: "lessonPrice"
    },
    {
      title: "Опыт",
      name: "experience"
    }
  ];

  radioItems = [
    {
      title: "Skype",
      name: "skype"
    }
  ];

  isAdmin = false;

  constructor(props) {
    super(props);

    this.sortTeachers = this.sortTeachers.bind(this);
    this.filterTeachers = this.filterTeachers.bind(this);

    this.state = {
      loaded: false,
      sortFields: {
        created_at: "desc"
      },
      radioFields: []
    };
  }

  componentDidMount() {
    const teachersPromise = axios.get("/api/teachers");
    const optionsPromise = axios.get("/api/options");
    const userPromise = axios.get("/api/user");

    Promise.all([teachersPromise, optionsPromise, userPromise])
      .then(res => {
        const options = res[1].data;
        this.teachers = res[0].data.map(teacher => {
          return TeacherViewAdapter(teacher, options);
        });
        const user = typeof res[2] !== undefined && typeof res[2].data !== undefined && res[2].data;
        if (user) {
          console.log('here')
          this.isAdmin = true;
        }
        this.setState({
          loaded: true
        });

      })
      .catch(rej => {
        console.error('something wrong!', rej);
      });

  }

  toggleDirection(field) {
    let direction =
      this.state.sortFields[field] || this.state.radioFields[field];

    if (typeof direction === "undefined" || direction === "") {
      return "desc";
    }

    if (direction === "asc") {
      return "desc";
    }

    if (direction === "desc") {
      return "asc";
    }
  }

  sortTeachers(field) {
    return function() {
      const direction = this.toggleDirection(field);

      this.setState({
        sortFields: {
          ...this.state.sortFields,
          [field]: direction
        }
      });
    }.bind(this);
  }

  filterTeachers(field) {
    return function() {
      this.setState(currentState => {
        let radioFields = Array.from(currentState.radioFields);

        if (radioFields.includes(field)) {
          radioFields = radioFields.filter(radioField => radioField !== field);
        } else {
          radioFields.push(field);
        }

        return {
          radioFields
        };
      });
    }.bind(this);
  }

  getTeacherView() {
    let processedTeachers = Array.from(this.teachers);

    // sort by sort fields
    processedTeachers = _.orderBy(
      processedTeachers,
      Object.keys(this.state.sortFields),
      Object.values(this.state.sortFields)
    );

    // sort by radio fields
    if (this.state.radioFields.length) {
      this.state.radioFields.forEach(radioField => {
        processedTeachers = processedTeachers.filter(teacher => {
          return teacher[radioField];
        });
      });
    }

    return processedTeachers.map(teacher => {
      console.log(this.isAdmin, 'is admin')
      return (
        <div key={teacher.id}>
          <TeacherView isAdmin={this.isAdmin} teacher={teacher} />
        </div>
      );
    });
  }

  render() {
    const {loaded} = this.state;

    return (
      <div>
        {loaded && (
          <div>
            <MenuHoc
              sortTeachers={this.sortTeachers}
              filterTeachers={this.filterTeachers}
              sortItems={this.sortItems}
              radioItems={this.radioItems}
              radioFields={this.state.radioFields}
              sortFields={this.state.sortFields}
            />
            <br />
            <FlipMove>{this.getTeacherView()}</FlipMove>
          </div>
        )}

        {!loaded && <div> Teacher list </div>}
      </div>
    );
  }
}

export default TeacherListHoc;
