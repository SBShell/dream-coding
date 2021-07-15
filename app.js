const fs = require("fs");
const path = require("path");

const args = process.argv[2]; // assign a target folder.

const targetPath = path.join(__dirname, args);

const ext = {
  video: ["mp4", "mov", "avi", "mkv"],
  captured: ["png", "aae"],
  duplicated: "jpg",
  text: ["doc", "txt", "xlsx"],
  zip: ["zip"],
  photo: "bmp",
};

// make folder name with a ext keys
const folderName = Object.keys(ext); // ['video', 'captured', 'duplicated']

// Before making actual folder, Check the existence of the folder.
folderName.forEach((dir) => {
  // console.log(!fs.existsSync(path.join(targetPath, dir)));
  if (!fs.existsSync(path.join(targetPath, dir))) {
    fs.mkdirSync(path.join(targetPath, dir));
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
      // newPath = path.join(targetPath, dir, file);
      fs.promises.rename(oldPath, newPath).catch(console.error);
    }
  });
}

// file.forEach()

// Read directory & final execution
// console.log(targetPath);
// fs.readdir(targetPath, (err, dir) => {
//   folderName.forEach((folder) => {
//     makeDir(folder);
//   });
// });

// folderName.forEach((dir) => {
//   console.log(allFiles);
//   makeDir(dir);
//   moveFiles(allFiles, dir);
// });

// ;

// Imporovement required
// 1. 경로 입력 오류 처리 - 경로를 잘 못 입력했을 때
// 2. 처음 시작할 때 경로 입력 받기
// 3. 확장자에서 . 빼고 이름만 놓고 코드를 처리하는 순간에 .을 붙여서 검사하기
// 4. 이미 만들어져있는 폴더가 있는지 검사하기
