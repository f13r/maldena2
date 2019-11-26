export default (state = {}, action) => {
  switch (action.type) {
    case "OPTIONS_FETCH":
      return {
        ...state,
        ...{
          lessonDurations: action.lessonDurations,
          levels: action.levels,
          teacherExperiences: action.teacherExperiences
        }
      };
    default:
      return state;
  }
};
