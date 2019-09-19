import React, { Component } from 'react'
import {
	Container, Image,
	Menu,
	Responsive,
	Visibility,
} from 'semantic-ui-react'

import { withRouter } from 'react-router-dom'
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom'

import logo from "../../img/logo.png";
import '../header.css';

class DesktopContainer extends Component {

	render() {
		const { children } = this.props;

		const homeActive = !!matchPath(
			this.props.location.pathname,
			{
				path: ['/', '/home'],
				exact: true,
				strict: true
			}
		);

		const teacherActive = !!matchPath(
			this.props.location.pathname,
			'/teacher', true, true
		);

        const teachersActive = !!matchPath(
            this.props.location.pathname,
            '/teachers', true, true
        );

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
							<Menu.Item>
								<Link to='/'>
									<Image size='small' src={logo}/>
								</Link>
							</Menu.Item>
							<Menu.Item active={homeActive}>
								<Link to='/'>Home</Link>
							</Menu.Item>
							<Menu.Item active={teacherActive}>
								<Link to='/teacher'>Добавить учителя</Link>
							</Menu.Item>
                            <Menu.Item active={teachersActive}>
                                <Link to='/teachers'>Учителя</Link>
                            </Menu.Item>
							<Menu.Item position='right'>
								<Link to='/logout'>Logout</Link>
							</Menu.Item>
						</Container>
					</Menu>
				</Visibility>
				{children}
			</Responsive>
		)
	}
}

export default withRouter(DesktopContainer);



