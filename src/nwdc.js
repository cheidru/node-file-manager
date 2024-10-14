// Navigation & working directory commands
import process from 'node:process';
import path from 'node:path';

export function levelUp() {
    const workDir = process.cwd();
    const workDirPathParts = path.parse(workDir);
    const root = workDirPathParts.root;
    if (workDir === root) return 'root directory';
    const higherLevelDir = workDir.split(path.sep).slice(1,-1).join(path.sep);
    const higherLevelDirPath = path.join(root, higherLevelDir);
    process.chdir(higherLevelDirPath);
}

export function toDirectory(code) {
    const workDir = process.cwd();
    let folderName = path.normalize(code.split(' ')[1]);
    try {
        process.chdir(folderName);
    } catch (err) {
        throw new Error ("change directory operation failed");
    }
}

export function workDirList() {}