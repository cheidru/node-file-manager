// Files commands
import fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

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

export function copyFile(code) {
  const readFile = code.split(' ')[1];
  const writeFile = code.split(' ')[2];

  async function copyIt() {
    await pipeline(
      createReadStream(readFile, { encoding: 'utf-8' }),
      createWriteStream(writeFile, { encoding: 'utf-8' })
    )
  }
  
  copyIt().catch(console.error);
}

export function moveFile(code) {
  const readFile = path.resolve(code.split(' ')[1]);
  const fileName = path.parse(readFile).base;
  const writeFile = path.join(path.resolve(code.split(' ')[2]), fileName);

  async function cloneIt() {
    const rStream = createReadStream(readFile, { encoding: 'utf8', flag: 'r' })
    await pipeline(
      rStream,
      createWriteStream(writeFile, { encoding: 'utf8', flag: 'ax+' })
    )
    rStream.close();
    fs.rm(readFile);
  }
  
  cloneIt().catch(console.error);
}

export function deleteFile(code) {
  const fileToDelete = path.resolve(code.split(' ')[1]);
  const remove = async () => {
    try {
        await fs.rm(fileToDelete);
    } catch (err) {
        throw new Error("operation failed");
    }
};

  remove();
}
