import React, { Component } from "react";
import { Form, Image, Grid, Icon, Divider } from "semantic-ui-react";
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
            venue: '',
            home: '',
            phone: ''
        },
        disabled: {
		    venueChecked: true,
            homeChecked: true
        }
	};

	experienceOptions = [
		{ key: '1', text: 'less than 1 year', value: '1' },
		{ key: '2', text: 'from 1 to 5 years', value: '2' },
		{ key: '3', text: 'from 5 to 10 years', value: '3' },
		{ key: '4', text: 'more than 10 years', value: '4' }
	];

	lessonDurationOptions = [
		{ key: '1', text: '30 min', value: '1' },
		{ key: '2', text: '45 min', value: '2' },
		{ key: '3', text: '1 hour', value: '3' },
		{ key: '4', text: '1 and half hours', value: '4' }
	];

	componentDidMount() {
	    axios.get('/api/teacher').then(
	        res => {
                this.setState({
                    ...this.state,
                    teacher: {
                        ...this.state.teacher,
                        ...res.data
                    }
                });
            }
        );
	}

	handleSubmit = () => {
	    axios.post('api/teacher', {
                ...this.state.teacher
        });
	};

	handleChange = (e, { name, value }) => {
	    this.setState({
           ...this.state,
           teacher: {
               ...this.state.teacher,
               [name]: value
           }
        });

	};

	handleDisable = field => evt => {
        this.setState({
                ...this.state,
                disabled: {
                    ...this.state.disabled,
                    [field]: !this.state.disabled[field]
                }
            }
	    );
    };

	render() {

	    const { photo, name, email, description, venue, home, price, phone } = this.state.teacher;
	    const { venueChecked, homeChecked } = this.state.disabled;

		return (
			<Form onSubmit={this.handleSubmit}>
				<Grid container doubling stackable>
					<Grid.Row>
						<Grid.Column width={5}>
                            <Image centered src={photo}/>
						</Grid.Column>
						<Grid.Column width={11}>
							<Form.Group widths='equal'>
								<Form.Input fluid iconPosition='left' name='name' value={name} label='Full name' placeholder='Your full name' onChange={this.handleChange}>
									<Icon name='user' />
									<input />
								</Form.Input>
								<Form.Input
									fluid
									iconPosition='left'
									label='Phone'
									name='phone'
                                    value={phone}
									placeholder='Your phone number'
									onChange={this.handleChange}
									children={
										<React.Fragment>
											<Icon name='at'/>
											<MaskedInput
												mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
												placeholder="(063) 469-35-90"
											/>
										</React.Fragment>
									}
								>
								</Form.Input>
							</Form.Group>
							<Form.Group widths='equal'>
								<Form.Input fluid value={email} iconPosition='left' type='email' label='E-mail' name='email' placeholder='Your contact E-mail' onChange={this.handleChange}>
									<Icon name='at' />
									<input />
								</Form.Input>
								<Form.Select fluid  label='Experience' name='experience' options={this.experienceOptions} placeholder={this.experienceOptions[0].text} onChange={this.handleChange}/><br/>
							</Form.Group>
							<Form.Group widths='equal'>
								<Form.TextArea
									label='Education'
									value={description}
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
							<Form.Select fluid  label='Lesson duration' name='lessonDuration' options={this.lessonDurationOptions} placeholder={this.lessonDurationOptions[0].text} onChange={this.handleChange}/>
						</Grid.Column>
						<Grid.Column width={8}>
							<Form.Input fluid label='Price, UAH' value={price} name='price' placeholder='Price per lesson...' onChange={this.handleChange}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Form.Checkbox label='I can go to student home' onClick={this.handleDisable('venue')} />
							<Form.TextArea label='Venue away' value={venue}  disabled={venueChecked} name='where' placeholder='What district do you prefer to teach away' onChange={this.handleChange}/>
							<Form.Checkbox label='I can teach at my home' onClick={this.handleDisable('home')}/>
							<Form.TextArea label='Home' value={home} disabled={homeChecked} name='home' placeholder="Put your home address if it's possible " onChange={this.handleChange}/>
							<Form.Checkbox label='I can teach through skype' name='skype' onChange={this.handleChange}/>
						</Grid.Column>
					</Grid.Row>
					<Divider horizontal>Teaching levels</Divider>
					<Grid.Row>
						<Grid.Column width={8}>
							<Form.Checkbox label='Младшие классы 1-4'/>
							<Form.Checkbox label='5 - 6 классы'/>
							<Form.Checkbox label='7 - 9 классы'/>
							<Form.Checkbox label='10 - 11 классы'/>
							<Form.Checkbox label='Подготовка к ЗНО (ВНО)'/>
							<Form.Checkbox label='Репетитор для начинающих'/>
							<Form.Checkbox label='Грамматика'/>
						</Grid.Column>
						<Grid.Column width={8}>
							<Form.Checkbox label='Разговорный язык'/>
							<Form.Checkbox label='Уровень А1-А2 (Beginner, Elementary)'/>
							<Form.Checkbox label='Уровень B1-B2 (Intermediate)'/>
							<Form.Checkbox label='Уровень C1-C2'/>
							<Form.Checkbox label='TOEFL, IELTS'/>
							<Form.Checkbox label='Деловой и бизнес язык'/>
							<Form.Checkbox label='Для поступления за границу'/>
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
	}
};

export default TeacherForm;
