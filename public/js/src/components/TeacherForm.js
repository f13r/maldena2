import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import request from "../helpers/request";


class TeacherForm extends Component {

	state = {
		'name': '',
		'lastName': '',
		'gender': '',
		'experience': '',
		'price': '',
		'lessonDuration': '',
		'description': '',
		'agreement': ''
	};

	genderOptions = [
		{ key: 'f', text: 'Female', value: '0' },
		{ key: 'm', text: 'Male', value: '1' }
	];

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
		request({
			url: '/api/teacher',
		}).then(res => this.setState({...res} ));
	}

	handleSubmit = () => {
	};

	handleChange = (e, { name, value }) => {

		console.log(name, value);
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group widths='equal'>
					<Form.Input fluid  name='name' value={this.state.name} label='Name' onChange={this.handleChange}/>
					<Form.Input fluid  name='lastName' label='Last name' onChange={this.handleChange}/>
					<Form.Select fluid  label='Gender' name='gender' options={this.genderOptions} placeholder={this.genderOptions[0].text} onChange={this.handleChange}/>
				</Form.Group>
				<Form.Group widths='3'>
					<Form.Select fluid  label='Experience' name='experience' options={this.experienceOptions} placeholder={this.experienceOptions[0].text} onChange={this.handleChange}/>
					<Form.Select fluid  label='Lesson duration' name='lessonDuration' options={this.lessonDurationOptions} placeholder={this.lessonDurationOptions[0].text} onChange={this.handleChange}/>
					<Form.Input fluid label='Price, UAH' name='price' placeholder='Price per lesson...' onChange={this.handleChange}/>
				</Form.Group>
				<Form.TextArea label='About' value={this.state.description} name='description' placeholder='Tell us more about you...' onChange={this.handleChange}/>
				<Form.Checkbox label='I agree to the Terms and Conditions' name='agreement' onChange={this.handleChange}/>
				<Form.Button>Submit</Form.Button>
			</Form>
		);
	}
};

export default TeacherForm;
