// arrow function don't bind this with themselves. for them value of this is same as the values of this at the time they are defined
// they are syntacticall sugar

//single para we dont even need to write return if we have only one statement inside the function
const arrowFfn = name => `hi ${name}`

console.log(arrowFfn("ashish"))

//multiple para 
const greet = (way, name) => `${way} ${name}`

console.log(greet("namaste","ashish"))

//but if want to return an object we need to wrap it in ()

const getUser = () => ({ name: "AShish", surname: "kumar" })
console.log(getUser())

//if we are multile line we need to wrap the function in {} and write return to return a value

const evenOdd = (num) => {
    if (num % 2 === 0)
        return "Even"
    return "Odd"
}

console.log(evenOdd(5))