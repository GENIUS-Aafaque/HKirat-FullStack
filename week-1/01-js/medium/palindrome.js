/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function transformString(str) {
  let tstr = "";
  for (let i = 0; i < str.length; i++) {
    if (
      str[i] !== " " &&
      str[i] !== "," &&
      str[i] !== "?" &&
      str[i] !== "!" &&
      str[i] !== "."
    ) {
      tstr += str[i];
    }
  }
  return tstr;
}

function isPalindrome(str) {
  let f = true;
  str = transformString(str).toLowerCase();
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] == str[str.length - i - 1]) {
      f = true;
    } else {
      f = false;
      break;
    }
  }
  return f;
}

module.exports = isPalindrome;
