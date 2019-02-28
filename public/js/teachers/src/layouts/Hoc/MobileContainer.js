import React, { Component } from 'react'
import {
	Menu,
	Responsive,
	Sidebar
} from 'semantic-ui-react';

import MobileMenu from '../../partials/MobileMenu';

import '../header.css';

export default class MobileContainer extends Component {

	state = {};

	handleSidebarHide = () => this.setState({ sidebarOpened: false });

	handleToggle = () => this.setState({ sidebarOpened: true });

	render() {
		const { children } = this.props;
		const { sidebarOpened } = this.state;

		return (
			<Responsive
				as={Sidebar.Pushable}
				maxWidth={Responsive.onlyMobile.maxWidth}
			>
				<Sidebar
					direction='right'
					as={Menu}
					animation='push'
					inverted
					onHide={this.handleSidebarHide}
					vertical
					visible={sidebarOpened}
				>
						<Menu.Item active as='a'>Home</Menu.Item>
						<Menu.Item as='a'>Teachers</Menu.Item>
						<Menu.Item as='a' position='right'>Telegram</Menu.Item>
				</Sidebar>

				<Sidebar.Pusher dimmed={sidebarOpened}>
					<MobileMenu handleToggle={this.handleToggle}/>
					{children}
				</Sidebar.Pusher>
			</Responsive>
		)
	}
}

