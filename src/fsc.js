// Files commands
import fs from 'node:fs/promises';
import path from 'node:path';
import { workDir } from './fileManager.js'

export function printFile(code) {}

export function addEmptyFile(code) {
  const fileName = code.split(' ')[1];
  const create = async () => {
    const newFilePath = path.join(workDir, fileName);
    try {
        await fs.writeFile(newFilePath, '');
    } catch (err) {
        throw new Error ("FS operation failed");
    }
  };

  create();
  return 'operation successful';
}

export function renameFile(code) {}

export function copyFile(code) {}

export function moveFile(code) {}

export function removeFile(code) {}
