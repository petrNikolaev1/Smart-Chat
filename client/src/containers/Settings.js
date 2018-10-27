import React, {Component} from 'react'
import {Reply} from '@material-ui/icons';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";

import '@/assets/styles/Settings.scss'
import Select from '@/common/Select'
import {langsOptions} from "@/util/lang";
import {changeLang} from "@/actions/stringsActions";
import translate from "@/hocs/translate";

@connect(
    store => ({}), {changeLang}
)
@translate('Settings')
export default class ChatWrap extends Component {
    render() {
        const {currentLanguage, changeLang, strings} = this.props;
        return (
            <div className='settings'>
                <div className='settings-header'>
                    <div className='settings-header-title'>
                        {strings.SETTINGS}
                    </div>
                    <Link to="/" className='settings-header-btn'>
                        <Reply/>{strings.BACK}
                    </Link>
                </div>
                <div className='settings-body'>
                    <div className='settings-body-form'>
                        <div className='settings-body-form-label'>
                            {strings.SELECT_LANG_LABEL}
                        </div>
                        <div className='settings-body-form-value'>
                            <Select
                                onChange={changeLang}
                                selectedOption={currentLanguage}
                                options={langsOptions}
                                isSerchable={true}
                                noOptionsMessage={strings.SELECT_LANG_NO_OPTIONS}
                                formClassName='default-select'
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
