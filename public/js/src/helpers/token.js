const tokenName = "jwt-token";

const Token = {
  get: function() {
    return localStorage.getItem(tokenName);
  },

  set: function(jwtToken) {
    return localStorage.setItem(tokenName, jwtToken);
  },

  remove: function() {
    return localStorage.removeItem(tokenName);
  },

  exist: function() {
    return !!localStorage.getItem(tokenName);
  },
};

export default Token;
