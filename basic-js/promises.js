// when we talk about asynch js we talk about callbacks
// but calling callbacks inside callbacks will create a messy code which will be very hard to manage and understand
// so we use promises to avoid callback hell
// basically promises is a function itself which takes two function as parameters.
// one is resolve and other is reject. so resolve is called when promise is fullfilled and reject is called when promise is not fulfilled

//basic example


// const myPromise = new Promise(function (resolve,reject) {
//     if(1===0)
//         resolve("promise fullfilled")
//     else
//         reject("promise rejected")
// }
// )
// myPromise.then(function (message) {
//     console.log(message)
// }).catch(function(err){
//     console.log(err)
// })


//more realistic example
let users = ["a", "b", "c", "d"]

function findUser(name) {
    let userFound = users.find(user => user === name)
    if (userFound)
        return new Promise(function (resolve, reject) { resolve(userFound) })
    else
    return new Promise(function (resolve, reject) { reject("user not found") })
}

findUser("a").then(function (user) {
    console.log("user found "+user)
}).catch(function (err) {
    console.log(err)
})