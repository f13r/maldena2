import React, { Component } from "react";
import { Form, Image, Grid, Icon, Divider, Loader } from "semantic-ui-react";
import MaskedInput from "react-text-mask";
import axios from 'axios';

class TeacherForm extends Component {

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
            skype: ''
        },
        loaded: false,
        options: {
            teacherExperiences:  [
                { key: '1', text: 'less than 1 year', value: '1' },
                { key: '2', text: 'from 1 to 5 years', value: '2' },
                { key: '3', text: 'from 5 to 10 years', value: '3' },
                { key: '4', text: 'more than 10 years', value: '4' }
            ],
            lessonDurations: [
                { key: '1', text: '30 min', value: '1' },
                { key: '2', text: '45 min', value: '2' },
                { key: '3', text: '1 hour', value: '3' },
                { key: '4', text: '1 and half hours', value: '4' }
            ]
        }
	};

    prepareTeacherDataForView(teacher) {
        teacher['showVenue'] = teacher.venue !== null && teacher.venue !== '';
        teacher['showHome'] = teacher.home !== null && teacher.home !== '';
        teacher['showSkype'] = teacher.skype !== null && teacher.skype !== '';

        return teacher;
    };


	componentDidMount() {
	    const teacherPromise = axios.get('/api/teacher').then(
	        res => {

	            const teacher = this.prepareTeacherDataForView(res.data);

	            console.log(teacher, 'teacher');

                this.setState({
                    ...this.state,
                    teacher
                });
            }
        );
        const optionsPromise = axios.get('/api/options').then(
            res => {

                let options = [];
                const optionNames = Object.keys(res.data);

                optionNames.forEach(optionName => {
                    options[optionName] = this.adjustToSelect(res.data[optionName]);
                });

                this.setState({
                    ...this.state,
                    options
                });
            }
        );

        Promise.all([teacherPromise, optionsPromise]).then(() => {
           this.setState({
              ...this.state,
              loaded: true
           });
        });
	}


	adjustToSelect = options => {
       return options.map(option => {
            return   {
               key: option.id,
               text: option.value,
               value : option.id
           }
       });
    };

	handleSubmit = () => {
	    const teacher = {...this.state.teacher};
	    teacher.venue = teacher.showVenue ? teacher.venue : '';
        teacher.home = teacher.showHome ? teacher.home : '';
        teacher.skype = teacher.showSkype ? teacher.skype : '';

	    axios.post('api/teacher', teacher);
	};

	handlePhoneChange = evt => {

	    const phoneWithMask = evt.target. value;
        const phone = phoneWithMask.replace(/\D/g,'');

        this.setState( {
            ...this.state,
            teacher: {
                ...this.state.teacher,
                phone
            }
        });
    };

	handleChange = (e, { name, value }) => {
	    console.log(name, value);
	    this.setState( {
           ...this.state,
           teacher: {
               ...this.state.teacher,
               [name]: value
           }
        });
	};

	handleLevelsCheckBoxChange = (e, { name, value, checked }) => {

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
                    [name]: checkBoxOptions
                }
            }
        );
    };

	handleDisable = field => () => {
        this.setState({
                ...this.state,
                teacher: {
                    ...this.state.teacher,
                    [field]: !this.state.teacher[field]
                }
            }
	    );
    };

	getLevels = () => {
        const { levels } = this.state.options;
        const { levels: teacherLevels = [] } = this.state.teacher;

	    return  levels.map(level => {
	           let checked = teacherLevels.includes(level.value);
               return <Form.Checkbox name='levels' checked={checked} key={level.key} value={level.value} label={level.text}
                               onChange={this.handleLevelsCheckBoxChange}/>
            }
        );
    };


	render() {
        if (this.state.loaded) {

            const { photo, name, email, education, description, experience,
                venue, home, lessonPrice, phone, lessonDuration, showHome, showVenue, skype, showSkype } = this.state.teacher;
            const { options } = this.state;

            return (
                <Form onSubmit={this.handleSubmit}>
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
                                                value={name}
                                                label='Full name'
                                                placeholder='Your full name'
                                                onChange={this.handleChange}>
                                        <Icon name='user' />
                                        <input />
                                    </Form.Input>
                                    <Form.Input
                                        fluid
                                        name='phone'
                                        iconPosition='left'
                                        label='Phone'
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
                                        iconPosition='left'
                                        type='email'
                                        label='E-mail'
                                        name='email'
                                        placeholder='Your contact E-mail'
                                        onChange={this.handleChange}>
                                        <Icon name='at' />
                                        <input />
                                    </Form.Input>
                                    <Form.Select fluid  label='Experience' value={experience} name='experience' options={options.teacherExperiences} placeholder={options.teacherExperiences[0].text} onChange={this.handleChange}/><br/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.TextArea
                                        label='Education'
                                        value={education}
                                        name='education'
                                        placeholder='Tell us where did you study...'
                                        onChange={this.handleChange}
                                    >
                                    </Form.TextArea>
                                </Form.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider horizontal>Lessons description</Divider>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Form.Select
                                    fluid
                                    label='Lesson duration'
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
                                    label='Price, UAH'
                                    iconPosition='left'
                                    value={lessonPrice}
                                    name='lessonPrice'
                                    placeholder='Price per lesson...'
                                    onChange={this.handleChange}>
                                    <Icon name='money' />
                                    <input />
                                </Form.Input>

                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Checkbox label='I can go to student home' defaultChecked={showVenue} name='showVenue' onClick={this.handleDisable('showVenue')} />
                                <Form.TextArea label='Venue away' value={venue || ''}  disabled={!showVenue}  name='venue' placeholder='What district do you prefer to teach away' onChange={this.handleChange}/>
                                <Form.Checkbox label='I can teach at my home' defaultChecked={showHome} name='showHome' onClick={this.handleDisable('showHome')}/>
                                <Form.TextArea label='Home' value={home || ''} disabled={!showHome} name='home' placeholder="Put your home address if it's possible " onChange={this.handleChange}/>
                                <Form.Checkbox label='I can teach through skype' name='skype' defaultChecked={showSkype}  onClick={this.handleDisable('showSkype')}/>
                                <Form.Input
                                    fluid
                                    disabled={!showSkype}
                                    value={skype || ''}
                                    iconPosition='left'
                                    type='skype'
                                    label='Skype'
                                    name='skype'
                                    placeholder='Skype адрес'
                                    onChange={this.handleChange}>
                                    <Icon name='skype' />
                                    <input />
                                </Form.Input>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider horizontal>Teaching levels</Divider>
                        <Grid.Row>
                            <Grid.Column>
                                { this.getLevels() }
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.TextArea label='About' value={description} name='description' placeholder='Tell us more about you...' onChange={this.handleChange}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Form.Button>Submit</Form.Button>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Form>
            );
        } else {
            return <Loader />;
        }
	}
}

export default TeacherForm;
