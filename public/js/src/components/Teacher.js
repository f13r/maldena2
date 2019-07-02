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
					<Header as = 'h2'> Login with Facebook and join Maldena English Society </Header>
                    <br/>
					<a href='//localhost:8000/api/login'>
						<Button size='huge' fluid color='facebook'>
							<Icon name='facebook' /> Facebook
						</Button>
					</a>
				</div>) : (
				<div>
					<Header as = 'h2'>Заполни форму чтобы cтать частью Maldena English Society </Header>
                    <br/>
					<TeacherForm/>
				</div>)
		}
		</div>
	);
};

export default Teacher;