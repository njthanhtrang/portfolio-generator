// require used in destination files we want to receive exported fx
const fs = require("fs");
const generatePage = require("./src/page-template");

// .slice() returns everything from first index as 2nd arg
const profileDataArgs = process.argv.slice(2, process.argv.length);
// assignment destructuring assigns elements of array to variable names in single exp
const [name, github] = profileDataArgs;


fs.writeFile("./index.html", generatePage(name, github), err => {
    // stops execution of code if error exists
    if (err) throw new Error(err);

    console.log("Portfolio complete! Check out index.html to see the output!");
});

// // no parentheses around profileDataArr parameter
// const printProfileData = (profileDataArr) => {
//   for (let i = 0; i < profileDataArr.length; i++) {
//     console.log(profileDataArr[i]);
//   }
//   console.log("================");

//   //   is the same as....
//   // forEach executes function on each element of array using value
//   //  of element at that iteration as argument
//   profileDataArr.forEach((profileItem) => console.log(profileItem));
// };

// printProfileData(profileDataArgs);
