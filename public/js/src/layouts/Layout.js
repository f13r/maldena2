import React from 'react'
import {
	Container,
	List,
	Segment,
} from 'semantic-ui-react'


import ResponsiveContainer from './Hoc/ResponsiveContainer';

const Layout = (props) => {

	return (
		<ResponsiveContainer {...props}>
			<Container text style={{margin: '3em 0 3em 0'}}>
				{props.children}
			</Container>
			<Segment inverted vertical style={{padding: '3em'}}>
				<Container textAlign='center'>
					<List horizontal inverted divided link size='small'>
						<List.Item>
							Maldena English Society
						</List.Item>
					</List>
				</Container>
			</Segment>
		</ResponsiveContainer>
	)
};


export default Layout;