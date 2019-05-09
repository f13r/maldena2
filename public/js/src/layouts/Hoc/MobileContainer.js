import React, { Component } from 'react'
import {
	Menu,
	Responsive,
	Sidebar,
	Image,
	Icon
} from 'semantic-ui-react';

import { Link } from 'react-router-dom'

import { withRouter } from 'react-router-dom'

import logo from '../../img/logo.png';
import '../header.css';

class MobileContainer extends Component {

	state = {
		sidebarOpened: false
	};

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
                        <Menu.Item position='right'>
                            <Link to='/logout'>Logout</Link>
                        </Menu.Item>

                    <Link to='/logout'>Logout</Link>
				</Sidebar>

				<Sidebar.Pusher dimmed={sidebarOpened}>
					<Menu
						inverted
						borderless
					>
						<Menu.Item as='a'>
							<Image size='small' src={logo}/>
						</Menu.Item>
						<Menu.Item position='right' onClick={this.handleToggle}>
							<Icon name='sidebar' />
						</Menu.Item>
					</Menu>
					{children}
				</Sidebar.Pusher>
			</Responsive>
		)
	}
}

export default withRouter(MobileContainer);
