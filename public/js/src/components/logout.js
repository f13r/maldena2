import { connect } from "react-redux";
import { removeUser } from "../helpers/user";

const Logout = props => {
  const { history, dispatch } = props;

  removeUser(dispatch);
  history.push("/");

  return null;
};

export default connect()(Logout);
