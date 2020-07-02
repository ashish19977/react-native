let users=['a','b','c']
function findUser(name) {
    if (typeof (name) === 'number')
        throw new Error('username cant be a number')
    let userFound = users.find(user => user === name)
    if (userFound)
        return new Promise(function (resolve, reject) {
            resolve(userFound)
        })
    return new Promise(function (resolve, reject) {
        reject()
    })

}

async function searchUser(name) {
    try {
        let user = await findUser(name)
        console.log(user)
    } catch (err) {
        console.log(err)
    }
}
searchUser("asd")