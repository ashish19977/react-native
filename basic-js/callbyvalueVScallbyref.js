let name = "ashish"
console.log(name)
let duplicate = name
duplicate="ravi"
console.log(name)

//here we are using string which is a primitive type so its a callbyvalue...we are storing name in duplicate
//but when we change duplicate only duplicate is changed not the name so its callbyval

let person = {
    name: "ashish",
    age: 21,
    address: {
        city: "dadri",
        pin:127310
    }
}

let person1 = person
person1.name = "ravi"
person1.address.city = "bhiwani"
//even nested objects are also shallow copied
console.log(person)

//here we are using object which is a non-primitive type so its a callbyref...we are storing person in person1
//but when we change person1 both get changed bcz they are storing same ref...so its callbyref
//arrays are also call by ref below is example

let cars = ['tata', 'mahindra', 'maruti']
let indianCars = cars
indianCars[2] = "jeep"
console.log(cars)

//how to declare a object
// let obj = new Object()
// let obj={}
//let obj=person //shallow copy all the properties
//using assign we can copy multiple objects into one object
//overlapping properties will be combined into one in resultant property with their value set to value of last property
let person2 = Object.assign({}, person)
console.log(person2)

//how to deep copy then ??? either we can use a other library or we can define our own function
function deepCopy(obj) {
    let keys = Object.keys(obj)
    let newObj={}
    for(key in keys){
        if (typeof (obj[keys[key]]) === 'object') {
            newObj[keys[key]]=deepCopy(obj[keys[key]])
        }
        else
            newObj[keys[key]]=obj[keys[key]]
    }
    return newObj
}
//as we are deep copying the person object we getting allits values and when they are changed in deepCopiedPerson 
// they are not get reflected in original object that is person
let deepCopiedPerson = deepCopy(person)
deepCopiedPerson.address.city = "jhojhu"
console.log(deepCopiedPerson)
console.log(person)