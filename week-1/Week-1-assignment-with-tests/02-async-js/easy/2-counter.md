## Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

let counter = 1;
function func() {
console.clear();
console.log(counter);
counter += 1;
setTimeout(func, 1000);
}
setTimeout(func, 1000);

(Hint: setTimeout)
