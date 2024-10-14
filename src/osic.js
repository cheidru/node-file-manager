// Operating system info commands
import os from 'node:os';

export function osInfo(code) {
    const command = code.split('--')[1];
    switch(command) {
        case 'EOL':
            getEOL();
            break;
        case 'cpus':
            getCPUS();
            break;
        case 'homedir':
            getHomeDir();
            break;
        case 'username':
            getUserName();
            break;  
        case 'architecture':
            getArch();
            break;
        default:
    }
}

function getEOL() {
    console.log('default system End-Of-Line is ', JSON.stringify(os.EOL)); 
}

function getCPUS() {
    const cores = os.cpus().length;
    console.log('amount of CPUS :', cores);
    for(let i = 0; i < cores; i++) {
        console.log(
            `CPU #${i} info is 
            model: ${os.cpus()[i].model}
            clock rate: ${os.cpus()[i].speed}`);
    }
    
}

function getHomeDir() {
    console.log('home directory is ', os.userInfo().homedir);
}

function getUserName() {
    console.log('system user name is ', os.userInfo().username);
}

function getArch() {
    console.log('CPU architecture is ', os.arch());
}