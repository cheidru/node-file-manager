// import path from 'node:path';
import os from 'node:os';
import fmLauncher from './fmLauncher.js';
import readline from 'node:readline/promises';
import process from 'node:process';

const fileManager = () => {
    const arr = process.argv.slice(2);
    if(arr.length == 0) return console.log("add user name in format 'npm run start -- UserName'");
    const userName = arr[0];

    console.log(`Welcome to the File Manager, ${userName}!`);

    process.chdir(os.homedir());
    console.log(`You are currently in ${process.cwd()}\\`);

    // https://www.geeksforgeeks.org/node-js-readline-module/
    const userCommand = readline.createInterface({ input: process.stdin, output: process.stdout });
    userCommand.setPrompt('Enter your command here: ');
    userCommand.prompt();
    userCommand.on('line', (command) => {
        if (command == '.exit') fmExit();
        fmLauncher(command);
        console.log(`You are currently in ${process.cwd()}\\`);
        userCommand.prompt();
    })

    userCommand.on('SIGINT', () => fmExit())

    function fmExit() {
        console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
        userCommand.close;
        process.exit();
    }
}

fileManager();

// export function setWorkDir(path) {
//      workDir = path;   
// }

// npm run start -- --username=your_username
// Welcome to the File Manager, Username!
// You are currently in path_to_working_directory