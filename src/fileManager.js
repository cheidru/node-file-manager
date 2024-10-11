import path from 'node:path';
import os from 'node:os';
import { fmCommandLauncher } from 'fmLauncher';
import readline from 'node:readline/promises';
import process from 'node:process';

export let workDir;

const fileManager = () => {
    const arr = process.argv.slice(2);
    const userName = arr[0].split('=')[1];
    console.log(`Welcome to the File Manager, ${userName}!`);

    let fileManagerExit = false;
    setWorkDir(os.homedir());
    process.chdir(workDir);
    root = '';

    const prompt = async(promptMSG) => {
        const inputInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
        
        const userInput = await inputInterface.question(promptMSG);
        inputInterface.close(); // close prompt
        return userInput;
    }

    do {
        console.log(`You are currently in ${workDir}\\`);
        const commandCode = prompt('Enter your command here: ');
        const result = fmCommandLauncher(commandCode);

        if(result === "input fail") {
            console.log('Invalid input');
        } else if (result === "operation fail") {
            console.log('Operation failed');
        } else if (result === "exit") {
            fileManagerExit = true;
        }
        process.on('SIGINT', function() {
            fileManagerExit = true;
        });

     } while(!fileManagerExit)

     console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
     process.exit();
}

fileManager();

export function setWorkDir(path) {
     workDir = path;   
}
// npm run start -- --username=your_username
// Welcome to the File Manager, Username!
// You are currently in path_to_working_directory