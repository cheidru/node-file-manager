import { levelUp, toDirectory } from './nwdc.js';
import { workDirList } from './lsc.js';
import { printFile, addEmptyFile, renameFile, copyFile, moveFile, removeFile } from './fsc.js';
// import { osInfo } from './osic.js';
// import { calcHash } from './hashc.js';
// import { compressFile, decompressFile } from './hashc.js';

export default function fmLauncher(code) {
    const command = code.trim().toLowerCase().split(' ')[0];
    let exitCode = '';
    switch(command) {
        case 'up':
            exitCode = levelUp();
            break;
        case 'cd':
            exitCode = toDirectory(code);
            break;
        case 'ls':
            exitCode = workDirList();
            break;
        case 'cat':
            exitCode = printFile(code);
            break;
        case 'add':
            exitCode = addEmptyFile(code);
            break;
        case 'rn':
            exitCode = renameFile(code);
            break;
        case 'cp':
            exitCode = copyFile(code);
            break;
        case 'mv':
            exitCode = moveFile(code);
            break;
        case 'rm':
            exitCode = removeFile(code);
            break;
        case 'os':
            exitCode = osInfo(code);
            break;
        case 'hash':
            exitCode = calcHash(code);
            break;
        case 'compress':
            exitCode = compressFile(code);
            break;
        case 'decompress':
            exitCode = decompressFile(code);
            break;
        default:
            console.log('Wrong command');
            exitCode = 'input fail';
    }
    return exitCode;
}