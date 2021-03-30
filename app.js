// imports exported object from generate-site, obj destr creates var out of properties instead of using dot notation
const { writeFile, copyFile } = require("./utils/generate-site");
const inquirer = require("inquirer");
// require used in destination files(app.js) we want to receive exported fx
const generatePage = require("./src/page-template");

const promptUser = () => {
  return inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What's your name? (Required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (Required)",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your GitHub username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        "Would you like to enter some information about yourself for an 'About' section?",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      //   when property passes object of all answers given so far as object, T/F
      when: ({ confirmAbout }) => confirmAbout,
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
        validate: (projectNameInput) => {
          if (projectNameInput) {
            return true;
          } else {
            console.log("You need to enter a project name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
        validate: (descriptionInput) => {
          if (descriptionInput) {
            return true;
          } else {
            console.log("You need to enter a project description!");
            return false;
          }
        },
      },
      {
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
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("You need to enter a project GitHub link!");
            return false;
          }
        },
      },
      {
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

// promise chain: series of fxs that return promises allowing to attach .then()

promptUser()
//   promptProject() captures returning data from promptUser()
// recursively call promptProject() for as many projects as user wants to add
  .then(promptProject)
  // each project pushed into projects array in portfolioData
  //   final set of data returned to next .then()
  .then((portfolioData) => {
    //   generatePage() returns finished HTML template code into pageHTML
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    //   returns a promise to the next .then()
      return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    //   upon successful file creation, take writeFileResponse obj from 
    // writeFile()'s resolve() and log it
      console.log(writeFileResponse);
    //   promise returned by copyFile() lets us know if CSS copied correctly
      return copyFile();
  })
  .then(copyFileResponse => {
      console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
