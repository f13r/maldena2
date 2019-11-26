export function TeacherFormViewAdapter(teacher) {
  teacher.showVenue = !!teacher.venue;
  teacher.showHome = !!teacher.home;
  teacher.showSkype = !!teacher.skype;
  teacher.levels = teacher.levels || [];

  return teacher;
}

export function TeacherFormOptionsAdapter(options) {
  const formOptions = {};
  const optionNames = Object.keys(options);

  optionNames.forEach(optionName => {
    formOptions[optionName] = AdjustToSelect(options[optionName]);
  });

  return formOptions;
}

export function TeacherFormSubmitAdapter(teacher) {
  teacher.venue = teacher.showVenue ? teacher.venue : null;
  teacher.home = teacher.showHome ? teacher.home : null;
  teacher.skype = teacher.showSkype ? teacher.skype : null;

  delete teacher.photo;

  return teacher;
}

export function TeacherViewAdapter(teacher, options) {
  teacher.viewLevels = [];

  teacher.viewLevels = options.levels
    .map(level => {
      if (teacher.levels.includes(level.id)) {
        return level.value;
      }
      return null;
    })
    .filter(Boolean);

  teacher.viewExperience = getValueFromOptions(
    teacher.experience,
    options.teacherExperiences
  );
  teacher.viewLessonDuration = getValueFromOptions(
    teacher.lessonDuration,
    options.lessonDurations
  );

  return teacher;
}

export function AdjustToSelect(options) {
  return options.map(option => {
    return { key: option.id, text: option.value, value: option.id };
  });
}

function getValueFromOptions(value, options) {
  let result = options.find(option => {
    return option.id === value;
  });

  return (
    (typeof result !== "undefined" &&
      typeof result.value !== "undefined" &&
      result.value) ||
    ""
  );
}
