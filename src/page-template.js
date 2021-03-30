// create the about section
const generateAbout = (aboutText) => {
  // if about section doesn't exist, return <section>
  if (!aboutText) {
    return "";
  }
  // template literal `` embeds JS expressions into string
  return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
      <p>${aboutText}</p>
    </section>
    `;
};

// create projects section
const generateProjects = projectsArr => {
  return `
        <section class="my-3" id="portfolio">
            <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
            <div class="flex-row justify-space-between">
            ${projectsArr
              // .filter() executes fx on each element to see if should be in new array created
              .filter(({ feature }) => feature)
              // .map() iterates through projectsArr, destructure each project's object data
              .map(({ name, description, languages, link }) => {
                return `
                    <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
                    <h3 class="portfolio-item-title text-light">${name}</h3>
                    <h5 class="portfolio-languages">
                        Built With:
                        ${languages.map(language => language).join(", ")}
                    </h5>
                    <p>${description}</p>
                    <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                </div>
            `;
              })
              .join("")}

        ${projectsArr
          .filter(({ feature }) => !feature)
          .map(({ name, description, languages, link }) => {
              console.log(languages);
            return `
                <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                    <h3 class="portfolio-item-title text-light">${name}</h3>
                    <h5 class="portfolio-languages">
                        Built With:
                        ${languages.join(", ")}
                    </h5>
                    <p>${description}</p>
                    <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                </div>
            `;
          })
          .join("")}
            </div>
        </section>
    `;
};

// export funxtion to generate entire page
// module.exports can only be used ONCE in a file! if multiple functions or data, set to obj or arr
// string interpolation: subbing text for a variable built into string
// used in src file that has fx we want to make available
module.exports = (templateData) => {
  // console.log(templateData);
  // destructure data from templateDAta based on section property key names
  // create 3 variables based on data in templateData
  // rest operator, takes the rest of data that hasn't been destructured, stores in another obj
  const { projects, about, ...header } = templateData;

  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta  http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Portfolio Demo</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
          <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="style.css">
      </head>
  
      <body>
      <header>
          <div class="container flex-row justify-space-between align-center py-3">
              <h1 class="page-title text-secondary bg-dark py-2 px-3">${
                header.name
              }</h1>
                  <nav class="flex-row">
                      <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${
                        header.github
                      }">GitHub</a>
                  </nav>
          </div>
      </header>
      <main class="container my-5">
        ${generateAbout(about)}
        ${generateProjects(projects)}
      </main>
        <footer class="container text-center py-3">
            <h3 class="text-dark">&copy;${new Date().getFullYear()} by ${
    header.name
  } </h3>
        </footer>
        </body>
        </html>
      `;
};
