// Navigation & working directory commands
import process from 'node:process';
import parse from 'node:parse';
import { workDir } from './fileManager';

export function levelUp() {
    const root = parse.root(workDir);
    if (workDir === root) return 'root directory';    
}

export function toDirectory() {}

export function workDirList() {}