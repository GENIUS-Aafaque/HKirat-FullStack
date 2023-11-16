/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
    console.log("yup");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}

function waitTwoSecond() {
    console.log("yup");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000)
    })
}

function waitThreeSecond() {
    console.log("yup");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 3000)
    })
}

function calculateTimeSeq() {
    let start = new Date().getTime();
    waitOneSecond()
        .then(() => waitTwoSecond())               //.then(waitTwoSecond)               both works the same but
        .then(() => waitThreeSecond())             //.then(waitThreeSecond)             but acc to GPT it shouldn't
        .then(() => {
            let end = new Date().getTime();
            console.log("Seq Completed in : " + ((end - start) / 1000) + " seconds.");
        });
}
calculateTimeSeq();

function calculateTimeAll() {
    let start = new Date().getTime();
    Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()])
        .then(() => {
            let end = new Date().getTime();
            console.log("All Completed in : " + ((end - start) / 1000) + " seconds.");
        });
}
calculateTimeAll()