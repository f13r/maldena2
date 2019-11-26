import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import { fetchUser } from "../actions";
import token from "../helpers/token";
import { setAuthHeaderAndErrorHandler } from "../helpers/user";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { dispatch, user, history, location, path } = props;

  if (!token.exist()) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: location,
            return_url: path
          }
        }}
      />
    );
  }

  if (!_.isEmpty(user)) {
    return <Component {...props} />;
  }

  setAuthHeaderAndErrorHandler(history);
  dispatch(fetchUser());

  return null;
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
