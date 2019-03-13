
const tokenName = 'jwt-token';

const Token =  {

	get: () => {
		return localStorage.getItem(tokenName);
	},

	set: jwtToken => {
		return localStorage.setItem(tokenName, jwtToken);
	},

	remove: () => {
		return localStorage.removeItem(tokenName);
	}

};

export default Token;