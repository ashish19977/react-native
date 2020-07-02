import { combineReducers } from 'redux'
import { SIGN_IN_FAIL,SIGN_IN_SUCCESSFUL,IMPORT_CONTACTS,UPDATE_CONTACTS } from './actions'

const userInitState = {
    loggedIn: false,
    user:{}
}
const userReducer = (state = userInitState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESSFUL.type:
            console.log(action)
            return {
                ...state,
                loggedIn: true,
                user:action.payload.user
            }
        case SIGN_IN_FAIL.type:
                return {
                    ...state,
                    loggedIn: false,
                    user:{}
                }
        default:
            return state   
    }
}
const contactsInitState = {
    contacts: [],
    loading:true
}
const contactReducer = (state = contactsInitState, action) => {
    switch (action.type) {
        case IMPORT_CONTACTS.type:
                return {
                    ...state,
                    contacts: action.payload.contacts,
                    loading:false,
            }
        case UPDATE_CONTACTS.type:
            return {
                ...state,
                contacts:action.payload.contacts,
            }
        default:
            return state   
    }
}
const rootReducer = combineReducers({ userReducer, contactReducer })

export default rootReducer