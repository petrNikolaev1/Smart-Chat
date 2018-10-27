import React from 'react';
import { connect } from 'react-redux';

import ru from '@/constants/strings/ru';
import en from '@/constants/strings/en'


// Object for languages strings
export const languages = {
    ru,
    en,
};

export default function translate(key) {

    return (Component) => {
        const stateToProps = store => ({
            currentLanguage: store.stringsReducer.language,
            store: store
        });

        const TranslationComponent = (props) => {
            let strings = {};
            if (typeof key === 'object') {
                for (let i = 0; i < key.length; i++) {
                    strings = Object.assign(strings, languages[props.currentLanguage.formalLabel][key[i]]);
                }
            } else {
                strings = languages[props.currentLanguage.formalLabel][key];
            }
            const merged = {
                ...props.strings, // Do not override strings that are already sent in props
                ...strings, // Get strings from key
            };
            if (strings) {
                return (
                    <Component
                        {...props}
                        strings={merged}
                        currentLanguage={props.currentLanguage}
                    />
                );
            }
            // if no strings return component without strings
            return (
                <Component
                    {...props}
                    currentLanguage={props.currentLanguage}
                />
            );
        };

        return connect(stateToProps)(TranslationComponent);
    };
}