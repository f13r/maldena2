import React from 'react';
import Token from "../helpers/token";
import { Header, Button, Icon } from 'semantic-ui-react';

import TeacherForm from "./TeacherForm";

const Teacher = () => {

	return (
		<div>
		{
			!Token.get() ? (
				<div>
					<Header as = 'h1'> Login with Facebook and join Maldena English Society </Header>
					<a href='//localhost:8000/api/login'>
						<Button size='huge' fluid color='facebook'>
							<Icon name='facebook' /> Facebook
						</Button>
					</a>
				</div>) : (
				<div>
					<Header as = 'h1'> Fill the form and start to be a part of Maldena English Society</Header>
					<TeacherForm/>
				</div>)
		}
		</div>
	);
};

export default Teacher;