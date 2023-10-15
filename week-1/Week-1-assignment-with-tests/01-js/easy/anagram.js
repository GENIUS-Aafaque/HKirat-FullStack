/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  param1 = sort(str1.toLowerCase());
  param2 = sort(str2.toLowerCase());
  if (param1 == param2) {
    return true;
  } else {
    return false;
  }
}

function sort(str) {
  arr = str.split("");
  arr.sort();
  return arr.join("");
}
isAnagram("abc", "bac");
// module.exports = isAnagram;
