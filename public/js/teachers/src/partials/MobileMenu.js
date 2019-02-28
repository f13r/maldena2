import React from 'react';

import {
	Image,
	Icon,
	Menu
} from 'semantic-ui-react'

import logo from "../img/logo.png";

const MobileMenu = ( { handleToggle } ) => (
	<Menu
		inverted
		borderless
	>
		<Menu.Item as='a'>
			<Image size='small' src={logo}/>
		</Menu.Item>
		<Menu.Item position='right' onClick={handleToggle}>
			<Icon name='sidebar' />
		</Menu.Item>
	</Menu>
);

export default MobileMenu;