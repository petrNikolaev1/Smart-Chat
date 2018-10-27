import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import ChatWrap from '@/containers/ChatWrap'
import Settings from '@/containers/Settings'
import '@/assets/styles/index.scss'

export default () =>
    (<Switch>
        <Route exact path='/' component={ChatWrap}/>
        <Route path='/settings/' component={Settings}/>
    </Switch>)

