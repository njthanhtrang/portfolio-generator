const inquirer = require("inquirer");
inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What's your name?"
        }
    ])
    .then(answers => console.log(answers));
    


// require used in destination files(app.js) we want to receive exported fx
// const fs = require("fs");
// const generatePage = require("./src/page-template");

// const pageHTML = generatePage(name, github);

// fs.writeFile("./index.html", pageHTML, err => {
//     // stops execution of code if error exists
//     if (err) throw new Error(err);

//     console.log("Portfolio complete! Check out index.html to see the output!");
// });


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
