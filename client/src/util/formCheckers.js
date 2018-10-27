export const usernameInput = {
    preValidate: value => /^(\S{0,50})$/.test(value),
    postValidate: value => /^(\S{1,50})$/.test(value),
};