import { reducer as formReducer } from "redux-form";
import userReducer from "./user";
import optionsReducer from "./options";
import teacherReducer from "./teacher";

export default (state = {}, action) => ({
  user: userReducer(state.user, action),
  options: optionsReducer(state.options, action),
  teacher: teacherReducer(state.teacher, action),
  form: formReducer(state.form, action)
});
