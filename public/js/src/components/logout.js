import Token from "../helpers/token";
import axios from "axios";

const Logout = (props) => {

    const logoutPromise = axios.get("/api/logout");

    logoutPromise. finally(res => {
        Token.remove();
        props.history.push('/');
    });

    return null;
};

export default Logout;
