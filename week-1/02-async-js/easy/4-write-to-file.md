## Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

function checkError(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Written.");
}

data = "World!";

fs.writeFile("a.txt", data, "utf8", checkError);
