//lets talk about a condition where we dont want to expose our variable outside a particular function
//lets take example of counter which should increase count everytime its called and shouldnt expose count outside of the function

count = 0;
function counter1() {
    count+=1
    return count
}
//here we are exposing our count variable to the outsider code(outside of function)
//we dont want this
console.log(counter1())

//lets declare our count variable inside of the function so that it is not exposed to outsider code
function counter2() {
    let count=0
    count+=1
    return count
}

console.log(counter2())
console.log(counter2())

//but we get into a prob here evrytime when we are calling counter function its going to reinitialize the value of count

//here we get little  closer to our goal...
//now we need a way to just initialize count onces when counter is loaded first time and then we need a way to call inc function from outside
let counter= (function() {
    let count=0
    let inc=function (){return count+=1}
    return inc
})()

console.log(counter())
console.log(counter())
console.log(counter())
//here comes the closure to our rescue...though here this is iffe function which is another form of closure...
//iffe=>imediatialy invoked fn expression
//we know when we declare a object in js it get attached to the global or window object
//but iffe dont get attached to global

//little bit more details for closure

const thanks=function() {
    var way = "thanks"
    return {
        inhindi: function () {
            way = "dhanyawad"
            return way
        },
        inspanish: function () {
            way = "gracias"
            return way
        }}
}
const thanksInHindi = thanks()
// here we can see scope of var(way) was until when thanks was in memory...but in thanksInHindi.inhindi() we are accessing var (way)
//even after thanks is excuted
console.log(thanksInHindi.inhindi())


console.log(global)