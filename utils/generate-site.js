const fs = require("fs");

const writefile = fileContent => {
    // create new promise object using "new"
    return new Promise((resolve, reject) => {
        fs.writeFile("./dist/index.html", fileContent, err => {
            // if there's an error, reject Promise and send error to Promise's .catch()
            if (err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute resolve() too
                return;
            }
            // if everything went well, resolve Promise and send successful data to .then()
            resolve({
                ok: true,
                message: "File created!"
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile("./src/style.css", "./dist/style.css", err => {
            if (err) {
              reject(err);
              return;
            }
            resolve({
                ok: true,
                message: "Style sheet copied successfully!"
            });
        });
    });
};

// export object with 2 fxs as methods
    // method name, value of method replaced by shorthand property name
    // writeFile: writeFile,
    // copyFile: copyFile
module.exports = { writeFile, copyFile };