import React, {Component} from 'react'
import Select from 'react-select';

import '@/assets/styles/Select.scss'

export default class SelectComponent extends Component {

    state = {
        isMenuOpen: false,
    };

    onOpen = () => {
        const {onOpen} = this.props;
        this.setState({
            isMenuOpen: true
        });
        if (onOpen) onOpen()
    };

    onClose = () => {
        this.setState({
            isMenuOpen: false
        })
    };


    render() {
        const {
            noOptionsMessage, options, placeholder, isDisabled,
            isSearchable, onChange, selectedOption, formClassName
        } = this.props;

        const selectImgClass = `${formClassName}-container ${this.state.isMenuOpen ? 'open' : 'close'}`;

        return (
            <Select
                value={selectedOption}
                onChange={onChange}

                isSearchable={isSearchable}
                autoSize={false}
                onMenuOpen={this.onOpen}
                onMenuClose={this.onClose}

                noOptionsMessage={() => noOptionsMessage}

                placeholder={placeholder}

                classNamePrefix={formClassName}
                className={selectImgClass}

                options={options}
                isDisabled={isDisabled}
            />
        )
    }
}
