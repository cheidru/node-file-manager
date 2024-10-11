import path from 'node:path';
import os from 'node:os';
import { fmCommandLauncher } from 'fmLauncher';
import readline from 'node:readline/promises';
import process from 'node:process';

const fileManager = () => {
    const arr = process.argv.slice(2);
    const userName = arr[0].split('=')[1];
    console.log(`Welcome to the File Manager, ${userName}!`);

    let fileManagerExit = false;

    const workDir = os.homedir();
    process.chdir(workDir);

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
        fmCommandLauncher(commandCode);
     } while(!fileManagerExit)

    // const workPath = path.resolve('fileManager.js');
    // const workDir = path.dirname(workPath);

}

fileManager();

// npm run start -- --username=your_username
// Welcome to the File Manager, Username!
// You are currently in path_to_working_directory