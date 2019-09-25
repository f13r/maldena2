export function TeacherFormViewAdapter(teacher) {
    teacher.showVenue = !!teacher.venue;
    teacher.showHome = !!teacher.home;
    teacher.showSkype = !!teacher.skype;

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
    teacher.venue = teacher.showVenue
        ? teacher.venue
        : '';
    teacher.home = teacher.showHome
        ? teacher.home
        : '';
    teacher.skype = teacher.showSkype
        ? teacher.skype
        : '';

    return teacher;
}

export function TeacherViewAdapter(teacher, options) {
    teacher.viewLevels = options.levels.map(level => {
        if (teacher.levels.includes(level.id)) {
            return level.value;
        }
    }).filter(Boolean);

    teacher.viewExperience = getValueFromOptions(teacher.experience, options.teacherExperiences);
    teacher.viewLessonDuration = getValueFromOptions(teacher.lessonDuration, options.lessonDurations);

    return teacher;
}

export function AdjustToSelect(options) {
    return options.map(option => {
        return {key: option.id, text: option.value, value: option.id};
    });
}

function getValueFromOptions(value, options) {

    let result = options.find(option => {
        return option.id === value;
    });

    return typeof result.value !== 'undefined' && result.value || '';
}
