import axios from "axios";
import _ from "lodash";

const optionsFetch = action => ({
  type: "OPTIONS_FETCH",
  ...action
});

export const fetchOptions = () => {
  return (dispatch, getState) => {
    const { options } = getState();
    if (_.isEmpty(options)) {
      axios.get("/api/options").then((res, rej) => {
        dispatch(optionsFetch(res.data));
      });
    }
  };
};
