// reducers.js

import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, 
  GET_EVENTS, GET_EVENT_VIEW, BACK_EVENT_VIEW, BACK_EVENT_ADD, ADD_EVENT, ADD_EVENT_VIEW, GET_EVENTS_HIGHLIGHTED
} from '../actions/actions'

function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

export function events(state = { events: [], eventView:{}, 
                          eventsHighlighted:[],isAddEvent:false }, action){
  switch (action.type){
      case GET_EVENTS:{
        return Object.assign({},state,{ events: action.events })
      }
      case GET_EVENTS_HIGHLIGHTED:{
        return Object.assign({},state,{ eventsHighlighted: action.eventsHighlighted })
      }
      case GET_EVENT_VIEW:{
        return Object.assign({},state,{ eventView: action.event })                                                                                                                                       
      }
      case BACK_EVENT_VIEW:{
        return Object.assign({},state,{ eventView: {} })
      }
      case BACK_EVENT_ADD:{
        return Object.assign({},state,{ isAddEvent: false })
      }
      case ADD_EVENT_VIEW:{
        return Object.assign({},state,{ isAddEvent: true })
      }
      case ADD_EVENT:{
        return Object.assign({},state,{ isAddEvent: false })
      }
      default:{
        return state
      }
  }
}

//COMBINE
const eventsApp = combineReducers({
  auth,
  events
})

export default eventsApp