import path from 'path';

const fileManager = () => {
    const arr = process.argv.slice(2);
    const userName = arr[0].split('=')[1];
    console.log(`Welcome to the File Manager, ${userName}!`);
    // console.log(`Welcome to the File Manager, ${userName}!`);
    const workPath = path.resolve('fileManager.js');
    const workDir = path.dirname(workPath);
    console.log(`You are currently in ${workDir}\\`);
}

fileManager();

// npm run start -- --username=your_username
// Welcome to the File Manager, Username!
// You are currently in path_to_working_directory