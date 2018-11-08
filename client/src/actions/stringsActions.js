import constants from '@/constants'

export const changeLang = language => (dispatch, getState) => {
    if (!language || (language instanceof Array && language.length === 0)) return;
    const {stringsReducer} = getState();
    if (stringsReducer.language === language) return;
    dispatch({
        type: constants.CHANGE_LANG,
        language
    });
};