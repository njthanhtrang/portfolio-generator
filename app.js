const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What's your name? (Required)",
      validate: nameInput => {
          if (nameInput) {
              return true;
          } else {
              console.log("Please enter your name!");
              return false;
          }
      }
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (Required)",
      validate: usernameInput => {
        if (usernameInput) {
            return true;
        } else {
            console.log("Please enter your GitHub username!");
            return false;
        }
    },
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
    },
  ]);
};

const promptProject = (portfolioData) => {
  console.log(`
    =================
    Add a New Project
    =================
    `);

  // if there's no "projects" array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project? (Required)",
        validate: projectNameInput => {
            if (projectNameInput) {
                return true;
            } else {
                console.log("Please enter your project name!");
                return false;
            }
      },
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
        validate: projectDescriptionInput => {
            if (projectDescriptionInput) {
                return true;
            } else {
                console.log("Please enter your project description!");
                return false;
            }
      },
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "Javascript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter the GitHub link to your project. (Required)",
        validate: githubLinkInput => {
            if (githubLinkInput) {
                return true;
            } else {
                console.log("Please enter your GitHub link!");
                return false;
            }
      },
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      // if they wish to add more projects
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    console.log(portfolioData);
  });

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
