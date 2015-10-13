'use strict'
// Tab Nav Reducer.
// This expands the router to work on multiple tabs.
// The router works just as before except this layer
// sits on top and dispatches messages to the correct tab's router.

import Immutable from 'immutable'
import routerReducer, { createRouterState } from './router'
import {FOLDER_TAB, CHAT_TAB, PEOPLE_TAB, DEVICES_TAB, MORE_TAB} from '../constants/tabs'
import * as actionTypes from '../constants/tabbed-router-action-types'

const emptyRouterState = createRouterState([], [])

// Uncomment this to start at a specific page to help speed up
// const emptyRouterState = createRouterState(['login2', 'register', 'regExistingDevice', 'codePage'], [])

// TODO(mm) add type annotations
const initialState = Immutable.fromJS({
  // a map from tab name to router obj
  tabs: {
    [FOLDER_TAB]: emptyRouterState,
    [CHAT_TAB]: emptyRouterState,
    [PEOPLE_TAB]: emptyRouterState,
    [DEVICES_TAB]: emptyRouterState,
    [MORE_TAB]: emptyRouterState
  },
  activeTab: MORE_TAB
})

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SWITCH_TAB:
      return state.set('activeTab', action.tabName)
    default:
      return state.updateIn(['tabs', state.get('activeTab')], (routerState) => routerReducer(routerState, action))
  }
}
