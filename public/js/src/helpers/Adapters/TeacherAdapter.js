export function TeacherFormViewAdapter(teacher) {

    teacher.showVenue = teacher.venue !== '';
    teacher.showHome = teacher.home !== '';
    teacher.showSkype = teacher.skype !== '';

    return teacher;
}

export function TeacherFormSubmitAdapter(teacher) {

    teacher.venue = teacher.showVenue ? teacher.venue : '';
    teacher.home = teacher.showHome ? teacher.home : '';
    teacher.skype = teacher.showSkype ? teacher.skype : '';

    return teacher;
}

export function AdjustToSelect(options) {
    return options.map(option => {
        return {
            key: option.id,
            text: option.value,
            value: option.id
        }
    });
}