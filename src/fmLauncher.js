export function fmCommandLauncher(code) {
    const command = code.trim().toLowerCase().slice(0,1);
    let exitCode = '';
    switch(command) {
        case 'up':
            exitCode = levelUp();
        case 'cd':
            exitCode = toDirectory(code);
        case 'ls':
            exitCode = workDirList();
        case 'ca':
            exitCode = printFile(code);
        case 'ad':
            exitCode = addEmptyFile(code);
        case 'rn':
            exitCode = renameFile(code);
        case 'cp':
            exitCode = copyFile(code);
        case 'mv':
            exitCode = moveFile(code);
        case 'rm':
            exitCode = removeFile(code);
        case 'os':
            exitCode = osInfo(code);
        case 'ha':
            exitCode = calcHash(code);
        case 'co':
            exitCode = compressFile(code);
        case 'de':
            exitCode = decompressFile(code);
        case 'exit':
            exitCode = 'exit';
    }

    return exitCode;
}