import constants from '@/constants'
import {selectedOptionToLang, langToSelectedOption} from "@/util/lang.js";

const initialState = {
    language: langToSelectedOption('ru')
};

export function stringsReducer(state = initialState, action) {
    switch (action.type) {
        case constants.CHANGE_LANG:
            return {
                ...state,
                language: action.language
            };
        default:
            return state;
    }
}