import React from 'react';
import {
	Container,
	Menu,
	Image
} from 'semantic-ui-react';

import logo from '../img/logo.png';

const MainMenu = () => (
	<Menu fixed='top' borderless inverted>
		<Container>
			<Menu.Item as='a'>
				<Image size='small' src={logo}/>
			</Menu.Item>
			<Menu.Item active as='a'>Home</Menu.Item>
			<Menu.Item as='a'>Teachers</Menu.Item>
			<Menu.Item as='a' position='right'>Telegram</Menu.Item>
		</Container>
	</Menu>
);

export default MainMenu;
