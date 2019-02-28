import React from 'react'
import {
	Container,
	Header,
	List,
	Segment,
} from 'semantic-ui-react'

import ResponsiveContainer from './Hoc/ResponsiveContainer';


const Layout = () => (
	<ResponsiveContainer>

		<Container text style={{ marginTop: '4em'}}>
			<Header as='h1'>Semantic UI React Fixed Template</Header>
			<p>This is a basic fixed menu template using fixed size containers.</p>
			<p>
				A text container is used for the main container, which is useful for single column layouts.
			</p>
		</Container>

		<Segment inverted vertical style={{ margin: '3em 0em 0em', padding: '3em 0em' }}>
			<Container textAlign='center'>
				<List horizontal inverted divided link size='small'>
					<List.Item>
						Maldena English Society
					</List.Item>
				</List>
			</Container>
		</Segment>
	</ResponsiveContainer>
);

export default Layout;