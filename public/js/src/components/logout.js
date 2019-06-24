import Token from "../helpers/token";

const Logout = (props) => {

	Token.remove();
	props.history.push('/');

	return null;
};

export default Logout;