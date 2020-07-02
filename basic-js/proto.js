const n = 10
console.log(n.toString())

//error console.log(10.toString())

//this is because we have a wrapper around each variable in js ,not the value of that variable
// thats because we can't deepcopy all methods and properties for every single variable
// suppose if we have array of 100 items and if we want some methods and properties attached to each item
//we have to assign them individually which will be very costly in term of performance as well as space
// so providing a wrapper around each item say(number or string) we will once define ,method for each prototype and that will be applicable to all items of that type
// !!!!!!!!! danger !!! but what if someone override a method from prototype (say Number) that overided method will be called isntead of orginal method
Number.prototype.toString = function () { return "100" }
let num = 101
console.log(n.toString())
console.log(num.toString())
