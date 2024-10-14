// Navigation & working directory commands
import process from 'node:process';
import path from 'node:path';
import { workDir, workDirChange } from './fileManager.js';

export function levelUp() {
    const workDirPathParts = path.parse(workDir);
    const root = workDirPathParts.root;
    if (workDir.workDir === root) return 'root directory';
    const higherLevelDir = workDir.split(path.sep).slice(1,-1).join(path.sep);
    const higherLevelDirPath = path.join(root, higherLevelDir);
    process.chdir(higherLevelDirPath);
    workDirChange(higherLevelDirPath);
}

export function toDirectory() {}

export function workDirList() {}