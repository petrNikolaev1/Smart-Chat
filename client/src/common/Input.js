import React, {Component} from 'react'

import FormValidator from "@/hocs/FormValidator";
import {usernameInput} from "@/util/formCheckers";

class Input extends Component {
    render() {
        const {value, onChange, placeholder, disabled, className} = this.props;

        const inputValue = value.value || '';

        return (
            <input
                disabled={disabled}
                value={inputValue}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
            />
        )
    }
}

const UsernameInput = FormValidator(Input)(usernameInput);

export {
    UsernameInput,
}