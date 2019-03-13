import Token from "../helpers/token";

const GetToken = (props) => {

	let url = new URL(window.location.href);
	let jwtToken = url.searchParams.get('jwt-token');

	if (jwtToken != null) {
		Token.set(jwtToken);
		props.history.push('/teacher');
	} else {
		props.history.push('/');
	}

	return null;

};

export default GetToken;