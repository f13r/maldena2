export default (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        ...{
          id: action.id,
          email: action.email,
          is_admin: action.is_admin,
          name: action.name,
          photo: action.photo,
          teacher_id: action.teacher_id
        }
      };

    case "USER_LOGOUT":
      console.log("USER_LOGOUT");
      return {};

    default:
      return state;
  }
};
