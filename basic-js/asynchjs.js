// for (var i = 1; i <= 10; i++){
//     setTimeout(() => {
//         i=i+1
//         console.log(i)
//     }, 2000);
// }

// this is basic most asked interveiw question for js
//here how it worked
//lets understand the asynch behaviour of js
// //we have four things  : - 
// 1. execution stack
// 2.js engine apis
// 3. event loop
// 4. function queue
// now when above code is executed.for each value of i a settime fn is pushed into stack.
// when stack check function for execution it find that they are asynch setTimeout apis.so it sent them to a space called js engine apis
// now from js engine apis.brower will keep track of every function and it will send the function whose timeout has expired into function queue
// now function queue and execution stack has something inbetween them which is event loop it checks if stack is empty or not
// if stack is empty it pick up a function from function queue and push into stack.

// now in our case when each function was handled by js engine apis their timeout expired and they are pushed into queue toghether
// so now by that time the reach into stack for execution value of i has become 11 so the get value of i as 11 and print it on screen


// as we js is single threaded synchronise lang
// so that is a problem because once a process start and it take too long to complete. it will halt the other processes too
// to make asynch work properly we need callbacks

function loadingAsite(cb) {
    console.log("loading stared")
    setTimeout(() => {
        console.log("data is fetched from db... calling callback function to perform operation on fetched data")
        cb()
    }, 2000);
    console.log("doing other tasks when data is being fetched")
}

loadingAsite(function (){console.log("im callback !!! performing operation on data fetched from db")})