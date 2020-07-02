import {SIGN_IN_SUCCESSFUL,SIGN_IN_FAIL,IMPORT_CONTACTS,UPDATE_CONTACTS} from './actions'

export const signInSuccessful = (payload) => {
    return ({
        type: SIGN_IN_SUCCESSFUL.type,
        payload:payload
    })
}

export const signInFail = (payload) => {
    return ({
        type: SIGN_IN_FAIL.type,
        payload:payload
    })
}
export const getDeviceContacts = (payload) => {
    return ({
        type: IMPORT_CONTACTS.type,
        payload: payload
    })
}

export const updateContacts = (payload) => {
    return ({
        type: UPDATE_CONTACTS.type,
        payload: payload
    })
}