let multiplier = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// map is inbuilt function on array which takes a fn as argument and then perform that fn on every element of array.
//array returns new array thats why its chainable i:e: array.map().filter() performing chain functions
//lets revise and override map fn using prototype
// Array.prototype.map = function () {
//     for (let i = 0; i < this.length;i++)
//     console.log("im map")
// }
let table=5
multiplier.map(function (ele) {
    console.log(table.toString()+" X "+ele+" = " +ele*table) 
})


//filter is something which is used to filter some element based on some condition.
//lets filter out even values

const filteredArray = multiplier.filter(function (ele) {
    return ele%2===0
})
console.log(filteredArray)

let sum = multiplier.reduce(function (total,ele) {
    return ele+total
},100)
console.log(sum)