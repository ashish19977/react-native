function greetingInNativeLang(name = "ashish") {
    console.log(this.way+" "+name)
}


//we can explicitly bind this to a object by using call apply bind
let greet = greetingInNativeLang.bind({ way: "Hello" })
greet()

greetingInNativeLang.call({ way: "hola" }, "Ashish from call")
greetingInNativeLang.apply({ way: "namaste" },["Ashish from apply"])