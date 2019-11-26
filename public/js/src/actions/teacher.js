import axios from "axios";

export const teacherChange = action => ({
  type: "TEACHER_CHANGE",
  teacher: {
    id: action.id,
    name: action.name,
    email: action.email,
    phone: action.phone,
    photo: action.photo,
    description: action.description,
    education: action.education,
    experience: action.experience,
    home: action.home,
    venue: action.venue,
    skype: action.skype,
    lessonPrice: action.lessonPrice,
    lessonDuration: action.lessonDuration,
    levels: action.levels
  }
});

export const fetchTeacher = teacherId => {
  return (dispatch, getState) => {
    const { user } = getState();

    if (!user.teacher_id) {
      dispatch(
        teacherChange({
          name: user.name,
          email: user.email,
          photo: user.photo
        })
      );
    } else {
      axios.get("/api/teachers/" + user.teacher_id).then((res, rej) => {
        dispatch(teacherChange(res.data));
      });
    }
  };
};
