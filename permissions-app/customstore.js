class Store{
    state={}
    createStore(reducer) {
        this.reducer = reducer
    }
    getState() {
        return this.state
    }
    dispatch(action) {
        this.state.contacts = this.reducer(this.state.contacts, action)
    }
}

contacts=[]
const userReducer = (state=contacts, action) => {
    switch (action.type) {
        case "adduser":
            return (
               [...state,action.payload])
    }
    return state
}
const contactReducer = (state=[], action) => {
    switch (action.type) {
        case "adduser":
            return ([
                ...state,
                action.payload
            ])
    }
    return state
}

let store = new Store()
store.createStore(userReducer)
// store.createStore(contactReducer)
// store.createStore(userReducer)
// store.dispatch({ name: "Ashish" })
// console.log(store.getState())

//now suppose we have a scenerio we want to add use as well as delete a user
// we have now way to tell reducer when to add user and when to delete user
// here come the action object which take two properties one is actiontype and other is paylaod basically

store.dispatch({ type: "adduser", payload: { name: "Ashish" } })
store.dispatch({ type: "adduser", payload: { name: "Ashish2" } })
console.log(store.getState())