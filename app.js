const fs = require("fs");
const path = require("path");

const args = process.argv[2]; // assign a target folder.

const targetPath = path.join(__dirname, args); // path of "app.js" & target folder

const ext = {
  video: ["mp4", "mov", "avi", "mkv"],
  captured: ["png", "aae"],
  duplicated: "jpg",
  text: ["doc", "txt", "xlsx"],
  zip: ["zip"],
  photo: "bmp",
};

// make folder name with a ext keys
const folderName = Object.keys(ext); // ['video', 'captured', 'duplicated'... etc]


folderName.forEach((dir) => {
  const checkingFd = path.join(targetPath, dir);
  if (!fs.existsSync(checkingFd)) { //Check the existence of the folder.
    fs.mkdirSync(checkingFd); // create actual folders
  }
});

fs.promises.readdir(targetPath).then((files) => {
  const newFiles = files.filter((file) => path.extname(file) !== "");
  folderName.forEach((dir) => {
    moveFiles(newFiles, dir);
  });
});

// move the files to each folder
function moveFiles(files, dir) {
  files.forEach((file) => {
    let oldPath = path.join(targetPath, file);
    let newPath = path.join(targetPath, dir, file);
    if (
      ext[dir].includes(path.extname(file).slice(1)) &&
      !file.includes("_E")
    ) {
      fs.promises.rename(oldPath, newPath).catch(console.error);
    }
  });
}

