export const requiredField = value => {
    if (value) return undefined;
    return "Заполните поле";
};

export const maxLength = (maxLength) => {
    return function(value) {
        if(value && value.length > maxLength) return `Максимальная длина ${maxLength} символов`;
        return undefined;
    };
};