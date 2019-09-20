import React, { Component } from "react";
import { Form, Image, Grid, Icon, Divider, Loader } from "semantic-ui-react";
import { withRouter } from 'react-router-dom'
import MaskedInput from "react-text-mask";
import Token from "../../helpers/token";
import axios from 'axios';

class TeacherForm extends Component {

    defaultValidation = {
        errorName: false,
        errorPhone: false,
        errorEmail: false,
        errorEducation: false,
        errorLessonPrice: false,
        errorVenue: false,
        errorHome: false,
        errorSkype: false,
        errorDescription: false,
        errorForm: false
    };

    state = {
        teacher: {
            name: '',
            email: '',
            experience: '',
            lessonPrice: '',
            lessonDuration: '',
            description: '',
            agreement: '',
            photo: '',
            showVenue: '',
            venue: '',
            showHome: '',
            home: '',
            phone: '',
            showSkype: '',
            skype: ''
        },
        loaded: false,
        options: {
            teacherExperiences: [
                {key: '1', text: 'less than 1 year', value: '1'},
                {key: '2', text: 'from 1 to 5 years', value: '2'},
                {key: '3', text: 'from 5 to 10 years', value: '3'},
                {key: '4', text: 'more than 10 years', value: '4'}
            ],
            lessonDurations: [
                {key: '1', text: '30 min', value: '1'},
                {key: '2', text: '45 min', value: '2'},
                {key: '3', text: '1 hour', value: '3'},
                {key: '4', text: '1 and half hours', value: '4'}
            ]
        },
        validationResult: {
            errorName: false,
            errorPhone: false,
            errorEmail: false,
            errorEducation: false,
            errorLessonPrice: false,
            errorVenue: false,
            errorHome: false,
            errorSkype: false,
            errorDescription: false,
            errorForm: false
        }
    };

    prepareTeacherDataForView(teacher, options) {
        teacher['showVenue'] = teacher.venue !== null && teacher.venue !== '';
        teacher['showHome'] = teacher.home !== null && teacher.home !== '';
        teacher['showSkype'] = teacher.skype !== null && teacher.skype !== '';
        teacher['viewLevels'] = this.getViewLevels(teacher, options.levels);

        return teacher;
    };

    getViewLevels(teacher, optionsLevels) {
        console.log(teacher, optionsLevels, 'hoo');

        return optionsLevels.map(level => {
            if (teacher.levels.includes(level.id)) {
                return level.value;
            }
        }).filter(Boolean);
    }


    componentDidMount() {
        const teacherPromise = axios.get('/api/teacher');
        const optionsPromise = axios.get('/api/options');

        Promise.all([teacherPromise, optionsPromise]).then((res) => {

            let options = [];
            const optionNames = Object.keys(res[1].data);

            optionNames.forEach(optionName => {
                options[optionName] = this.adjustToSelect(res[1].data[optionName]);
            });

            const teacher = this.prepareTeacherDataForView(res[0].data, res[1].data);

            this.setState({
                ...this.state,
                teacher,
                options,
                loaded: true
            });

        }).catch(rej => {
                Token.remove();
                this.props.history.push('/teacher');
            }
        );
    }


    adjustToSelect = options => {
        return options.map(option => {
            return {
                key: option.id,
                text: option.value,
                value: option.id
            }
        });
    };

    formIsValid = () => {

        const {
            name, email, education, description,
            venue, home, showVenue, showHome,
            showSkype, lessonPrice, phone, skype
        } = this.state.teacher;

        let validationResult = {};

        if (name === '') {
            validationResult['errorName'] = true;
        }

        if (email === '') {
            validationResult['errorEmail'] = true;
        }

        if (education === '') {
            validationResult['errorEducation'] = true;
        }

        if (description === '') {
            validationResult['errorDescription'] = true;
        }

        if (showVenue === true && venue === '') {
            validationResult['errorVenue'] = true;
        }

        if (showHome === true && home === '') {
            validationResult['errorHome'] = true;
        }

        if (showSkype === true && skype === '') {
            validationResult['errorSkype'] = true;
        }

        if (lessonPrice === '' || Number.isInteger(lessonPrice)) {
            validationResult['errorLessonPrice'] = true;
        }

        if (phone === '') {
            validationResult['errorPhone'] = true;
        }

        if (Object.keys(validationResult).length !== 0) {

            this.setState({
                validationResult: {
                    ...this.state.validationResult,
                    ...validationResult
                }
            });

            return false;
        }

        return true;
    };

    handleSubmit = () => {
        if (this.formIsValid()) {

            const teacher = {...this.state.teacher};

            teacher.venue = teacher.showVenue ? teacher.venue : '';
            teacher.home = teacher.showHome ? teacher.home : '';
            teacher.skype = teacher.showSkype ? teacher.skype : '';

            axios.post('api/teacher', teacher);
        }

    };

    resetValidation = () => {
        this.setState({
            validationResult: {
                ...this.defaultValidation
            }
        });
    };

    handlePhoneChange = evt => {
        const phoneWithMask = evt.target.value;
        const phone = phoneWithMask.replace(/\D/g, '');

        this.setState({
            ...this.state,
            teacher: {
                ...this.state.teacher,
                phone
            }
        }, this.resetValidation);
    };

    handleChange = (e, {name, value}) => {

        this.setState({
            ...this.state,
            teacher: {
                ...this.state.teacher,
                [name]: value
            }
        }, this.resetValidation);
    };

    handleLevelsCheckBoxChange = (e, {name, value, checked}) => {

        let checkBoxOptions = this.state.teacher[name];

        if (checked) {
            checkBoxOptions.push(value);
        } else {
            checkBoxOptions = checkBoxOptions.filter(item => item !== value);
        }

        this.setState({
                ...this.state,
                teacher: {
                    ...this.state.teacher,
                    [name]: checkBoxOptions,
                    viewLevels: this.getViewLevels(this.state.teacher, checkBoxOptions)
                }
            },
            this.resetValidation
        );
    };

    handleDisable = field => () => {

        this.setState({
                ...this.state,
                teacher: {
                    ...this.state.teacher,
                    [field]: !this.state.teacher[field]
                }
            },
            this.resetValidation
        );
    };

    getLevels = () => {
        const {levels} = this.state.options;
        const {levels: teacherLevels = []} = this.state.teacher;

        return levels.map(level => {
                let checked = teacherLevels.includes(level.value);
                return <Form.Checkbox name='levels' checked={checked} key={level.key} value={level.value} label={level.text}
                                      onChange={this.handleLevelsCheckBoxChange}/>
            }
        );
    };


    render() {
        if (this.state.loaded) {

            const {
                photo, name, email, education, description, experience,
                venue, home, lessonPrice, phone, lessonDuration, showHome, showVenue, skype, showSkype
            } = this.state.teacher;
            const {options} = this.state;

            const {
                errorName,
                errorPhone,
                errorEmail,
                errorEducation,
                errorLessonPrice,
                errorVenue,
                errorHome,
                errorSkype,
                errorDescription,
                errorForm
            } = this.state.validationResult;

            return (
            <React.Fragment> 
                <Form onSubmit={this.handleSubmit} error={errorForm}>
                    <Grid container doubling stackable>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Image centered src={photo}/>
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid
                                                iconPosition='left'
                                                name='name'
                                                error={errorName}
                                                value={name}
                                                label='Имя'
                                                placeholder='Имя и Фамилия'
                                                onChange={this.handleChange}>
                                        <Icon name='user'/>
                                        <input/>
                                    </Form.Input>
                                    <Form.Input
                                        fluid
                                        name='phone'
                                        error={errorPhone}
                                        iconPosition='left'
                                        label='Телефон'
                                        children={
                                            <React.Fragment>
                                                <MaskedInput
                                                    mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                                    placeholder="(063) 469-35-90"
                                                    value={phone}
                                                    onChange={this.handlePhoneChange}
                                                />
                                                <Icon name='phone'/>
                                            </React.Fragment>
                                        }
                                    >
                                    </Form.Input>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        value={email}
                                        error={errorEmail}
                                        iconPosition='left'
                                        type='email'
                                        label='E-mail'
                                        name='email'
                                        placeholder='E-mail'
                                        onChange={this.handleChange}>
                                        <Icon name='at'/>
                                        <input/>
                                    </Form.Input>
                                    <Form.Select
                                        fluid
                                        label='Опыт работы'
                                        value={experience}
                                        name='experience'
                                        options={options.teacherExperiences}
                                        placeholder={options.teacherExperiences[0].text}
                                        onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.TextArea
                                        label='Образование'
                                        value={education}
                                        error={errorEducation}
                                        name='education'
                                        placeholder='Расскажите о своем образовании'
                                        onChange={this.handleChange}
                                    >
                                    </Form.TextArea>
                                </Form.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider horizontal>Об уроках</Divider>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Form.Select
                                    fluid
                                    label='Длина урока'
                                    value={lessonDuration}
                                    name='lessonDuration'
                                    options={options.lessonDurations}
                                    placeholder={options.lessonDurations[0].text}
                                    onChange={this.handleChange}>
                                </Form.Select>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Form.Input
                                    fluid
                                    label='Цена, грн'
                                    iconPosition='left'
                                    value={lessonPrice}
                                    error={errorLessonPrice}
                                    name='lessonPrice'
                                    placeholder='Цена одного урока'
                                    onChange={this.handleChange}>
                                    <Icon name='money'/>
                                    <input/>
                                </Form.Input>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Checkbox
                                    label='Я могу проводить уроки у студента дома'
                                    defaultChecked={showVenue}
                                    name='showVenue'
                                    onClick={this.handleDisable('showVenue')}
                                />
                                <Form.TextArea label='Районы' error={errorVenue} value={venue || ''}
                                               disabled={!showVenue} name='venue'
                                               placeholder='Районы города где вы можете проводить уроки'
                                               onChange={this.handleChange}/>
                                <Form.Checkbox label='Я могу проводить уроки у себя дома' defaultChecked={showHome} name='showHome'
                                               onClick={this.handleDisable('showHome')}/>
                                <Form.TextArea label='Домашний адрес' error={errorHome} value={home || ''} disabled={!showHome}
                                               name='home' placeholder="Район, где находится ваш дом"
                                               onChange={this.handleChange}/>
                                <Form.Checkbox label='Я могу проводить уроки по Skype' name='skype' defaultChecked={showSkype}
                                               onClick={this.handleDisable('showSkype')}/>
                                <Form.Input
                                    fluid
                                    disabled={!showSkype}
                                    value={skype || ''}
                                    error={errorSkype}
                                    iconPosition='left'
                                    type='skype'
                                    label='Skype'
                                    name='skype'
                                    placeholder='Skype адрес'
                                    onChange={this.handleChange}>
                                    <Icon name='skype'/>
                                    <input/>
                                </Form.Input>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider horizontal>Уровни преподования</Divider>
                        <Grid.Row>
                            <Grid.Column>
                                {this.getLevels()}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.TextArea error={errorDescription} label='О себе' value={description}
                                               name='description' placeholder='Напишите о себе, чтобы заинтерисовать возможных студентов'
                                               onChange={this.handleChange}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Form.Button>Сохранить</Form.Button>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Form>
            </React.Fragment>
            );
        } else {
            return <Loader/>;
        }
    }
}

export default withRouter(TeacherForm);
