const person = {
    name: "ashish",
    getName: function () { console.log(this.name) },

    goodBye: function () {
        setTimeout(() => {
            console.log("goodbye "+this.name)
        }, 2000);
    },

    greet:()=>console.log("hi "+this.name)
}

let friend = {
    name:"pankaj"
}

//when this is used in normal functions it inherit the value of this from the object on which its called
//suppose we are calling getName on person so the this here is the context of person .i.e the object on which its called
person.getName()
person.goodBye()

//greet is a arrow function which inherit this from its parent
//so for person this is the global context and we dont have any name variable in global context
person.greet()

friend.getName = person.getName
//now we are calling getName on friend so it will get the this of the caller .i.e friend
friend.getName()

//now we are calling getName on global object because getName is defined in global context so it will return undefined
const getName = person.getName
getName()

