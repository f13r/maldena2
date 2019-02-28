import React, { Component } from 'react'
import {
	Container, Image,
	Menu,
	Responsive,
	Visibility,
} from 'semantic-ui-react'

import logo from "../../img/logo.png";
import '../header.css';

export default class DesktopContainer extends Component {

	render() {
		const { children } = this.props;

		return (
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}
				>
					<Menu
						inverted
						borderless
					>
						<Container>
							<Menu.Item as='a'>
								<Image size='small' src={logo}/>
							</Menu.Item>
							<Menu.Item active as='a'>Home</Menu.Item>
							<Menu.Item as='a'>Teachers</Menu.Item>
							<Menu.Item as='a' position='right'>Telegram</Menu.Item>
						</Container>
					</Menu>
				</Visibility>
				{children}
			</Responsive>
		)
	}
}


