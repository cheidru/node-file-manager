import process from 'node:process';
import fs from 'node:fs/promises';
// import fs from 'node:fs';

export function workDirList() {
  const workDir = process.cwd();
  let nameLength = 0;
  const listDir = async () => {
    try {
      const dirMembers = await fs.readdir(workDir, { withFileTypes: true });
      const res = [];
      for (let member of dirMembers) {
        let memName = member.name;
        // if(member.name.length/2 > 0) memName = member.name + ' ';
        if(member.name.length > 30) memName = member.name.slice(0, 30) + '...';
        res.push({
            name: memName,
            type: member.isDirectory()? 'directory' : 'file'
          }
        )
      }
      res.sort((a, b) => {
        longestName(a, b);
        if(a.type === b.type) return a.name - b.name;
        return a.type === 'directory' ? -1 : 1;
        })
      printDir(res);
    } catch(err) {
      throw new Error ("listing operation failed");
    }
  }

  function longestName(a, b) {
    const aLen = a.name.length;
    const bLen = b.name.length;
    if(aLen > nameLength || bLen > nameLength) {
      nameLength = aLen > bLen ? aLen : bLen;
    }
  }

  function printDir(list) {
    const tableHead = `
      ┌─────────┬─${'─'.repeat(nameLength)}─┬───────────┐
      │ (index) │${' '.repeat((nameLength - 4) / 2)}  Name ${' '.repeat((nameLength - 4) / 2)}│   Type    │
      ├─────────┼─${'─'.repeat(nameLength)}─┼───────────┤
      `
    const tableBottom = `└─────────┴─${'─'.repeat(nameLength)}─┴───────────┘`
    let tableContent = '';

    for(let i = 0; i < list.length; i++) {
      tableContent += `│${' '.repeat((9 - Math.ceil(i/10)) / 2)}`
      + `${i}${' '.repeat((9 - Math.ceil(i/10)) / 2)}│`
      + `${' '.repeat(Math.floor((nameLength - list[i].name.length) / 2) + 1)}${list[i].name}`
      + `${' '.repeat(Math.floor((nameLength - list[i].name.length) / 2) + 1)}`
      + `${nameLength/2 === 0 ? ' '.repeat(1): ''}│`
      + `${list[i].type === 'directory' ? "'directory'" : "   'file'  "}│
      `;
    }
    const table = tableHead + tableContent + tableBottom;
    console.log(table);
  }

  listDir();
}