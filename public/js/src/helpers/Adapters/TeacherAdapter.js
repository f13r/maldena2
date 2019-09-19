export function TeacherFormAdapter(teacher) {

    teacher.showVenue = teacher.venue !== '';
    teacher.showHome = teacher.home !== '';
    teacher.showSkype = teacher.skype !== '';

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