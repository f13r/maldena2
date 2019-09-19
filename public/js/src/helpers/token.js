
const tokenName = 'jwt-token';

const Token =  {

	get: function() {
        return localStorage.getItem(tokenName) || this.fetchToken();
	},

	set: function(jwtToken) {
		return localStorage.setItem(tokenName, jwtToken);
	},

	remove: function() {
		return localStorage.removeItem(tokenName);
	},

    fetchToken: function() {
        return new URL(window.location.href).searchParams.get(tokenName);
    }

};

export default Token;