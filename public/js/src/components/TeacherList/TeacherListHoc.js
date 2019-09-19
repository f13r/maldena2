import React, { Component } from 'react';
import _ from 'lodash';
import axios from "axios";
import FlipMove from 'react-flip-move';
import TeacherView from "./TeacherView";
import MenuHoc from "./Menu/MenuHoc";

let originalTeachers = [];

class TeacherListHoc extends Component {

    teachers = [];

    sortItems = [
        {
            title: 'Цена',
            name: 'lessonPrice'
        },
        {
            title: 'Опыт',
            name: 'experience'
        },
    ];

    radioItems = [
        {
            title: 'Skype',
            name: 'skype'
        }
    ];

    constructor(props) {
        super(props);


        this.sortTeachers = this.sortTeachers.bind(this);
        this.filterTeachers = this.filterTeachers.bind(this);

        this.state = {
            loaded: false,
            sortFields: {
                created_at: 'desc'
            },
            radioFields: []
        }

    }

    componentDidMount() {
        axios.get('/api/teachers').then((res) => {
            originalTeachers = this.teachers = res.data;
            this.setState({
                loaded: true
            })
        });
    }

    toggleDirection(field) {

        let direction = this.state.sortFields[field] || this.state.radioFields[field];

        if (typeof direction === 'undefined' || direction === '') {
            return 'desc';
        }

        if (direction === 'asc') {
            return 'desc';
        }

        if (direction === 'desc') {
            return 'asc';
        }
    }

    sortTeachers(field) {
        return function () {

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
        return function () {
            this.setState(currentState => {

                let radioFields = Array.from(currentState.radioFields);

                if (radioFields.includes(field)) {
                    radioFields = radioFields.filter(radioField => radioField !== field);
                } else {
                    radioFields.push(field);
                }

                return {
                    radioFields
                }

            });
        }.bind(this);
    }

    getTeacherView() {

        let processedTeachers = Array.from(this.teachers);

        // sort by sort fields
        processedTeachers = _.orderBy(processedTeachers, Object.keys(this.state.sortFields), Object.values(this.state.sortFields));

        // sort by radio fields
        if (this.state.radioFields.length) {
            this.state.radioFields.forEach(radioField => {
                processedTeachers = processedTeachers.filter(teacher => {
                        return teacher[radioField];
                    })
            });
        }

        return processedTeachers.map(teacher => {
            return <div key={teacher.id}><TeacherView teacher={teacher}/></div>
        });
    }

    render() {
        const { loaded } = this.state;

        return (
            <div>

                { loaded &&
                <div>
                    <MenuHoc
                        sortTeachers={this.sortTeachers}
                        filterTeachers={this.filterTeachers}
                        sortItems={this.sortItems}
                        radioItems={this.radioItems}
                        radioFields={this.state.radioFields}
                        sortFields={this.state.sortFields}
                    />
                    <br/>
                    <FlipMove>
                        { this.getTeacherView() }
                    </FlipMove>
                </div>
                }

                { !loaded && <div> Teacher list </div> }
            </div>
        )
    }
}

export default TeacherListHoc;