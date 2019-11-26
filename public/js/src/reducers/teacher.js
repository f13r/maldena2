export default (state = {}, action) => {
  switch (action.type) {
    case "TEACHER_CHANGE":
      const { teacher } = action;
      return {
        ...state,
        ...teacher
      };
    default:
      return state;
  }
};
