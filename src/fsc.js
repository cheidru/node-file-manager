// Files commands
import fs from 'node:fs/promises';
import path from 'node:path';

export function printFile(code) {
  const workDir = process.cwd();
  const fileName = code.split(' ')[1];
  const read = async () => {
    const filePath = path.join(workDir, fileName);
    console.log(filePath);
    try {
        const res = await fs.readFile(filePath, { encoding: 'utf8' });
        console.log(res);
    } catch (err) {
        throw new Error("FS operation failed");
    }
};
  read();
}

export function addEmptyFile(code) {
  const workDir = process.cwd();
  const fileName = code.split(' ')[1];
  const create = async () => {
    const newFilePath = path.join(workDir, fileName);
    try {
        await fs.writeFile(newFilePath, '');
    } catch (err) {
        throw new Error ("file add operation failed");
    }
  };
  create();
  return 'operation successful';
}

export function renameFile(code) {
  const oldName = code.split(' ')[1];
  const newName = code.split(' ')[2];
  const rename = async () => {
    try {
        try {
            await fs.access(oldName, fs.constants.F_OK);
        } catch {
            throw new Error("Source file does not exist");
        }

        try {
            await fs.access(newName, fs.constants.F_OK);
            throw new Error("New file already exists");
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }

        await fs.rename(oldName, newName);
    } catch (err) {
        console.error('Error:', err.message);
        throw new Error("operation failed");
    }
};
  rename();
}

export function copyFile(code) {}

export function moveFile(code) {}

export function removeFile(code) {}
