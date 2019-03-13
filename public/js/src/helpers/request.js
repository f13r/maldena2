import token from './token';

const request = (props = {}) => {

	const init = {
		method: props.method || 'GET',
		headers: {
			'Authorization': 'Bearer ' + token.get(),
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

	return fetch(props.url, init)
		.then(response => {
			if (response)
				return response.json();
		}).catch(res => console.log(res, 'res'));
};

export default request;
